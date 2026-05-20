/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 웹사이트 주소 (나중에 실제 도메인 주소로 교체하시면 됩니다)
  siteUrl: process.env.SITE_URL || "https://my-local-info.pages.dev",
  generateRobotsTxt: true, // 검색엔진 봇을 위한 robots.txt 자동 생성 여부
  outDir: "out", // 정적 HTML 빌드 결과물 폴더인 out 안에 생성되도록 설정
};
