const fs = require('fs');
const path = require('path');

async function run() {
  const publicDataApiKey = process.env.PUBLIC_DATA_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!publicDataApiKey || !geminiApiKey) {
    console.error("Missing required environment variables: PUBLIC_DATA_API_KEY or GEMINI_API_KEY");
    process.exit(1);
  }

  const localInfoPath = path.join(process.cwd(), 'public/data/local-info.json');
  let localInfo;

  try {
    localInfo = JSON.parse(fs.readFileSync(localInfoPath, 'utf-8'));
  } catch (err) {
    console.error("Failed to read or parse local-info.json:", err);
    process.exit(1);
  }

  try {
    // [1단계] 공공데이터포털 API에서 데이터 가져오기
    const url = 'https://api.odcloud.kr/api/gov24/v3/serviceList?page=1&perPage=20&returnType=JSON';
    const response = await fetch(url, {
      headers: {
        'Authorization': `Infuser ${publicDataApiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch public data: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    const items = json.data || [];

    if (items.length === 0) {
      console.log("No data returned from public data API.");
      return;
    }

    // 키워드 검사 헬퍼 함수
    function containsKeyword(item, keyword) {
      const fields = [
        item['서비스명'],
        item['서비스목적요약'],
        item['지원대상'],
        item['소관기관명'],
        item.serviceNm,
        item.servicePurpose,
        item.serviceTarget,
        item.serviceOrg
      ];
      return fields.some(field => typeof field === 'string' && field.includes(keyword));
    }

    // 필터링 적용
    let filtered = items.filter(item => containsKeyword(item, "성남"));
    if (filtered.length === 0) {
      filtered = items.filter(item => containsKeyword(item, "경기"));
    }
    if (filtered.length === 0) {
      filtered = items;
    }

    // [2단계] 기존 데이터와 비교
    const existingNames = new Set([
      ...localInfo.events.map(e => e.name),
      ...localInfo.benefits.map(b => b.name)
    ]);

    function getItemName(item) {
      return item['서비스명'] || item.serviceNm || '';
    }

    const newItems = filtered.filter(item => {
      const name = getItemName(item);
      return name && !existingNames.has(name);
    });

    if (newItems.length === 0) {
      console.log("새로운 데이터가 없습니다");
      return;
    }

    const targetItem = newItems[0];

    // [3단계] Gemini AI로 새 항목 1개만 가공
    const todayKST = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split('T')[0];

    const prompt = `아래 공공데이터 1건을 분석해서 JSON 객체로 변환해줘. 형식: 
{id: 숫자, name: 서비스명, category: '행사' 또는 '혜택', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', location: 장소 또는 기관명, target: 지원대상, summary: 한줄요약, link: 상세URL} 
category는 내용을 보고 행사/축제면 '행사', 지원금/서비스면 '혜택'으로 판단해. 
startDate가 없으면 오늘 날짜(${todayKST}), endDate가 없으면 '상시'로 넣어. 
반드시 JSON 객체만 출력해. 다른 텍스트 없이.

공공데이터 내용:
${JSON.stringify(targetItem, null, 2)}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!geminiResponse.ok) {
      throw new Error(`Failed to generate content via Gemini: ${geminiResponse.status} ${geminiResponse.statusText}`);
    }

    const geminiJson = await geminiResponse.json();
    const responseText = geminiJson.candidates[0].content.parts[0].text;

    // 마크다운 코드 블록 제거 및 JSON 파싱
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(jsonText);

    // [4단계] 기존 데이터에 추가
    const category = parsed.category === '행사' ? '행사' : '혜택';
    const newItem = {
      id: category === '행사' 
        ? `event-${localInfo.events.length + 1}` 
        : `benefit-${localInfo.benefits.length + 1}`,
      name: parsed.name || getItemName(targetItem),
      category: category,
      startDate: parsed.startDate || todayKST,
      endDate: parsed.endDate || '상시',
      location: parsed.location || targetItem['소관기관명'] || targetItem.serviceOrg || '정보 없음',
      target: parsed.target || targetItem['지원대상'] || targetItem.serviceTarget || '정보 없음',
      summary: parsed.summary || targetItem['서비스목적요약'] || targetItem.servicePurpose || '',
      originalLink: parsed.link || '#'
    };

    if (category === '행사') {
      localInfo.events.push(newItem);
    } else {
      localInfo.benefits.push(newItem);
    }

    localInfo.lastUpdated = todayKST;

    fs.writeFileSync(localInfoPath, JSON.stringify(localInfo, null, 2), 'utf-8');
    console.log(`Successfully added new ${category}: ${newItem.name}`);

  } catch (err) {
    console.error("An error occurred during execution. Local data remains unchanged.", err);
  }
}

run();
