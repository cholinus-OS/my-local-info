const fs = require('fs');
const path = require('path');

async function run() {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error("Missing required environment variable: GEMINI_API_KEY");
    process.exit(1);
  }

  const localInfoPath = path.join(process.cwd(), 'public/data/local-info.json');
  if (!fs.existsSync(localInfoPath)) {
    console.error("local-info.json file not found.");
    process.exit(1);
  }

  let localInfo;
  try {
    localInfo = JSON.parse(fs.readFileSync(localInfoPath, 'utf-8'));
  } catch (err) {
    console.error("Failed to parse local-info.json:", err);
    process.exit(1);
  }

  // [1단계] 최신 데이터 확인
  const postsDir = path.join(process.cwd(), 'src/content/posts');

  // 특정 아이템이 이미 작성되었는지 검사하는 헬퍼 함수
  function isAlreadyWritten(item) {
    if (!item) return false;
    if (!fs.existsSync(postsDir)) return false;
    const files = fs.readdirSync(postsDir);
    return files.some(file => {
      if (!file.endsWith('.md')) return false;
      const fileContent = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      return fileContent.includes(item.name);
    });
  }

  const lastEvent = localInfo.events && localInfo.events.length > 0 
    ? localInfo.events[localInfo.events.length - 1] 
    : null;
  const lastBenefit = localInfo.benefits && localInfo.benefits.length > 0 
    ? localInfo.benefits[localInfo.benefits.length - 1] 
    : null;

  const getNum = (item) => {
    if (!item || !item.id) return 0;
    const match = item.id.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  let latestItem = null;
  const eventWritten = isAlreadyWritten(lastEvent);
  const benefitWritten = isAlreadyWritten(lastBenefit);

  if (lastEvent && !eventWritten && lastBenefit && !benefitWritten) {
    // 둘 다 아직 안 쓰여졌다면 ID 숫자가 더 큰 최신 것을 선택
    latestItem = getNum(lastEvent) >= getNum(lastBenefit) ? lastEvent : lastBenefit;
  } else if (lastEvent && !eventWritten) {
    latestItem = lastEvent;
  } else if (lastBenefit && !benefitWritten) {
    latestItem = lastBenefit;
  } else {
    // 둘 다 쓰여졌다면 기본 최신 비교를 타겟으로 (이후 조기종료 처리됨)
    if (lastEvent && lastBenefit) {
      latestItem = getNum(lastEvent) >= getNum(lastBenefit) ? lastEvent : lastBenefit;
    } else {
      latestItem = lastEvent || lastBenefit;
    }
  }

  if (!latestItem) {
    console.log("최신 항목 데이터가 없습니다.");
    return;
  }

  if (isAlreadyWritten(latestItem)) {
    console.log("이미 작성된 글입니다");
    return;
  }

  try {
    // [2단계] Gemini AI로 블로그 글 생성
    const todayKST = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split('T')[0];

    const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.

정보: ${JSON.stringify(latestItem, null, 2)}

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${todayKST}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, ... ]
---

(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

마지막 줄에 FILENAME: YYYY-MM-DD-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로.`;

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

    // 마크다운 백틱 코드블록 제거
    let cleanText = responseText.trim();
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```(markdown|json|text)?/i, '').replace(/```$/, '').trim();
    }

    // [3단계] 파일명 및 내용 분리 저장
    let filename = `${todayKST}-post.md`;
    let fileContent = cleanText;

    const filenameMatch = cleanText.match(/FILENAME:\s*([^\s\n]+)/i);
    if (filenameMatch) {
      let matchedName = filenameMatch[1].trim();
      if (!matchedName.endsWith('.md')) {
        matchedName += '.md';
      }
      filename = matchedName;
      // 내용에서 FILENAME 제거
      fileContent = cleanText.replace(/FILENAME:\s*[^\s\n]+/i, '').trim();
    }

    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(postsDir, filename), fileContent, 'utf-8');
    console.log(`Successfully generated blog post: ${filename}`);

  } catch (err) {
    console.error("An error occurred during execution. Local files remain unchanged.", err);
  }
}

run();
