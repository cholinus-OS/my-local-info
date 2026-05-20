const fs = require("fs");
const path = require("path");

// 1. .env.local 파일이 로컬에 있으면 환경 변수를 읽어옵니다. (별도 라이브러리 설치 방지)
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      process.env[key.trim()] = values.join("=").trim();
    }
  });
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PUBLIC_DATA_API_KEY = process.env.PUBLIC_DATA_API_KEY;

// 데이터 저장 경로 설정
const infoFilePath = path.join(__dirname, "../public/data/local-info.json");
const blogFilePath = path.join(__dirname, "../public/data/blog.json");

// 2. 공공데이터포털 API에서 최신 정보 수집하기
async function fetchPublicData() {
  console.log("🔄 공공데이터 수집 시작...");

  // API 키가 없으면 샘플 데이터를 반환합니다 (테스트용)
  if (!PUBLIC_DATA_API_KEY) {
    console.log("⚠️ PUBLIC_DATA_API_KEY가 없습니다. 기본 샘플 데이터를 사용합니다.");
    return {
      events: [
        {
          id: "event-1",
          name: "성남시 봄꽃 축제",
          category: "행사",
          startDate: "2026-04-05",
          endDate: "2026-04-13",
          location: "중앙공원",
          target: "성남 시민 및 방문객 누구나",
          summary: "중앙공원의 아름다운 벚꽃과 봄꽃을 만끽하며 야외 공연, 포토존, 시민 참여 프로그램을 즐길 수 있는 봄맞이 축제입니다.",
          originalLink: "#"
        },
        {
          id: "event-2",
          name: "판교 청년 창업 박람회",
          category: "행사",
          startDate: "2026-04-19",
          endDate: "2026-04-20",
          location: "판교 테크노밸리",
          target: "창업에 관심 있는 청년 및 예비 창업자",
          summary: "스타트업 데모데이, 투자 상담, 현직자 멘토링 및 창업 지원 사업 소개 등 판교에서 열리는 청년 창업가를 위한 네트워킹 박람회입니다.",
          originalLink: "#"
        },
        {
          id: "event-3",
          name: "성남시 어린이날 큰잔치",
          category: "행사",
          startDate: "2026-05-05",
          endDate: "2026-05-05",
          location: "성남종합운동장",
          target: "어린이를 동반한 가족 누구나",
          summary: "어린이날을 맞아 페이스 페인팅, 만들기 체험, 무대 공연 등 온 가족이 함께 즐길 수 있는 다양한 놀거리와 볼거리를 무료로 제공합니다.",
          originalLink: "#"
        }
      ],
      benefits: [
        {
          id: "benefit-1",
          name: "성남시 청년 월세 지원금",
          category: "혜택",
          startDate: "2026-01-01",
          endDate: "2026-12-31",
          location: "온라인 신청 (복지로 또는 관할 행정복지센터)",
          target: "성남시 거주 만 19세~34세 무주택 청년 (소득 기준 충족 필요)",
          summary: "청년들의 주거비 부담을 덜어주기 위해 실제 납부하는 월세를 월 최대 20만 원씩 최대 12개월 동안 지원해 주는 사업입니다.",
          originalLink: "#"
        },
        {
          id: "benefit-2",
          name: "경기도 출산지원금",
          category: "혜택",
          startDate: "2026-01-01",
          endDate: "2026-12-31",
          location: "주민등록지 관할 행정복지센터 또는 정부24",
          target: "경기도 내 출산 가정",
          summary: "저출생 극복을 위해 경기도 내에서 아이를 출산한 가정에 첫째아 100만 원, 둘째아 150만 원의 축하금을 현금 또는 지역화폐로 지원합니다.",
          originalLink: "#"
        }
      ]
    };
  }

  try {
    // 💡 실제 공공데이터포털 API를 사용하는 경우 예시 (한국관광공사 축제 정보 서비스)
    // const url = `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${PUBLIC_DATA_API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=20260401&areaCode=31&sigunguCode=2`; // 경기 성남시 코드
    // const response = await fetch(url);
    // const result = await response.json();
    // 데이터 가공 로직 작성 필요...
    
    console.log("ℹ️ 실제 API 연동이 정상적으로 작동 중이라고 가정하고 샘플을 반환합니다.");
    // (이 곳에 나중에 발급받으신 진짜 API URL과 변환 로직을 적어넣으시면 됩니다)
    
    return {
      events: [],
      benefits: []
    };
  } catch (error) {
    console.error("❌ 공공데이터 API 호출 오류:", error);
    throw error;
  }
}

// 3. Gemini AI로 블로그 자동 글쓰기 함수
async function generateBlogPost(item) {
  const isEvent = item.category === "행사";
  
  if (!GEMINI_API_KEY) {
    console.log(`⚠️ GEMINI_API_KEY가 없습니다. [${item.name}] 소식의 임시 블로그 글을 생성합니다.`);
    return {
      id: `blog-${item.id}`,
      title: `[정보] ${item.name} 소식과 알아두면 좋은 점`,
      summary: `${item.name}에 대한 간략한 요약입니다. (로컬 테스트용)`,
      content: `안녕하세요! 

오늘 소개해 드릴 소식은 **${item.name}** 입니다.
* **장소/대상:** ${item.location} / ${item.target}
* **기간:** ${item.startDate} ~ ${item.endDate}

상세 정보 및 혜택은 본문을 참고하세요.`,
      date: new Date().toISOString().split("T")[0],
      relatedId: item.id
    };
  }

  const prompt = `
당신은 동네 소식을 친절하고 자세히 알려주는 전문 블로거입니다.
아래의 정보를 바탕으로 네이버 블로그 스타일의 친근하고 알찬 포스팅을 작성해 주세요.

[소식 정보]
- 이름: ${item.name}
- 카테고리: ${item.category}
- 기간: ${item.startDate} ~ ${item.endDate}
- 장소/신청처: ${item.location}
- 대상: ${item.target}
- 주요 내용: ${item.summary}

[작성 규칙]
1. 제목은 사람들의 이목을 끄는 매력적인 제목으로 작성하세요. (예: "성남시 봄꽃 축제 방문 가이드: 주차 꿀팁과 놓치면 안 되는 포토존")
2. 글 내부에는 소식을 즐기거나 혜택을 받기 위한 꿀팁, 주의사항 등을 창의적으로 추가해 주세요.
3. 소제목을 구분하기 위해 '### 소제목' 형식을 사용하세요.
4. 문단을 나누거나 핵심 줄글을 표현할 때 마크다운 가로선(---)과 글머리 기호(* )를 적절히 섞어서 글의 가독성을 높여주세요.
5. 어조는 "~해요", "~해 보세요" 와 같은 친근하고 부드러운 말투로 써주세요.
6. JSON 형식으로 결과를 출력해 주세요. 답변은 정확히 아래의 JSON 포맷만 반환해야 하며, 다른 텍스트는 일절 포함하지 마세요:
{
  "title": "블로그 제목",
  "summary": "블로그 글 한 줄 요약",
  "content": "마크다운 형식의 본문 내용 (엔터는 \\n으로 줄바꿈 처리)"
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error?.message || "Gemini API 호출 실패");
    }

    const textContent = result.candidates[0].content.parts[0].text;
    const blogData = JSON.parse(textContent);
    
    return {
      id: `blog-${item.id}`,
      title: blogData.title,
      summary: blogData.summary,
      content: blogData.content,
      date: new Date().toISOString().split("T")[0],
      relatedId: item.id
    };
  } catch (error) {
    console.error(`❌ [${item.name}] Gemini 글쓰기 실패:`, error);
    // 실패 시 임시 백업 글 작성
    return {
      id: `blog-${item.id}`,
      title: `[작성이 지연됨] ${item.name} 알아보기`,
      summary: `${item.name}에 대한 요약입니다.`,
      content: `${item.summary}\n\n상세 내용은 홈페이지를 참고하세요.`,
      date: new Date().toISOString().split("T")[0],
      relatedId: item.id
    };
  }
}

// 4. 메인 실행 함수
async function main() {
  try {
    console.log("🚀 생활 정보 자동 수집 및 블로그 포스팅 생성 작업 개시...");
    
    // 데이터 수집
    const data = await fetchPublicData();
    
    // 날짜 업데이트 기록
    data.lastUpdated = new Date().toISOString().split("T")[0];
    
    // 파일 저장
    fs.writeFileSync(infoFilePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✅ 최신 생활 정보 파일 저장 완료: ${infoFilePath}`);

    // 블로그 포스팅 생성 (모든 행사와 혜택 소식에 대해 하나씩 포스팅 작성)
    const allItems = [...data.events, ...data.benefits];
    const blogPosts = [];
    
    for (const item of allItems) {
      console.log(`✍️ '${item.name}' 포스팅 작성 중...`);
      const post = await generateBlogPost(item);
      blogPosts.push(post);
    }

    fs.writeFileSync(blogFilePath, JSON.stringify(blogPosts, null, 2), "utf-8");
    console.log(`✅ AI 블로그 포스팅 파일 저장 완료: ${blogFilePath}`);
    
    console.log("🎉 모든 자동화 작업이 성공적으로 끝났습니다!");
  } catch (error) {
    console.error("❌ 치명적인 작업 실패:", error);
    process.exit(1);
  }
}

main();
