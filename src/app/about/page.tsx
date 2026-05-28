import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 - 우리 동네 생활 정보",
  description: "우리 동네 생활 정보 서비스의 기획 의도와 데이터 출처, 서비스 제공 방식을 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 text-zinc-800 font-sans antialiased flex flex-col justify-between">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-amber-900 sm:text-xl">
                  우리 동네 생활 정보
                </h1>
              </div>
            </div>
            <nav className="flex space-x-2">
              <Link
                href="/"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:bg-amber-100/50 sm:text-sm"
              >
                홈으로
              </Link>
              <Link
                href="/about"
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors sm:text-sm"
              >
                소개
              </Link>
              <Link
                href="/blog"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:bg-amber-100/50 sm:text-sm"
              >
                블로그
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 본문 */}
      <main className="flex-grow mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl shadow-orange-100/40 p-8 sm:p-12">
          {/* 타이틀 영역 */}
          <div className="border-b border-zinc-100 pb-6 mb-8 text-center sm:text-left">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 mb-3">
              ℹ️ 서비스 소개
            </span>
            <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tight sm:text-4xl">
              성남시 생활 정보란?
            </h2>
            <p className="mt-3 text-zinc-500 leading-relaxed text-sm sm:text-base">
              성남시 주민들을 위해 실시간으로 유용한 지역 행사, 축제 정보 및 다양한 행정 혜택을 알기 쉽게 정리해 드리는 투명하고 신뢰성 높은 생활 정보 플랫폼입니다.
            </p>
          </div>

          <div className="space-y-10">
            {/* 1. 운영 목적 */}
            <section className="flex gap-4 sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 text-2xl">
                🎯
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 sm:text-xl mb-2">
                  서비스 운영 목적
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  지역 주민들이 놓치기 쉬운 다양한 정부 및 성남시 지자체의 혜택, 유용한 문화 행사와 축제 정보를 한눈에 보여주고자 기획되었습니다. 성남시의 활발한 커뮤니티 활성화와 주민 주거/복지 삶의 질 향상을 목표로 합니다.
                </p>
              </div>
            </section>

            {/* 2. 데이터 출처 */}
            <section className="flex gap-4 sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-800 text-2xl">
                🏛️
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 sm:text-xl mb-2">
                  신뢰할 수 있는 데이터 출처
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  본 서비스는 대한민국 행정안전부 및 각 공공기관이 운영하는 공식 **공공데이터포털(<a href="https://www.data.go.kr/" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">data.go.kr</a>)**의 오픈 API 데이터를 수집 및 활용하여 구축되었습니다. 모든 글 하단에는 원문으로 바로 갈 수 있는 출처 링크가 명시되어 있어 언제든지 팩트 체크가 가능합니다.
                </p>
              </div>
            </section>

            {/* 3. AI 활용 콘텐츠 생성 방식 */}
            <section className="flex gap-4 sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 text-2xl">
                🤖
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 sm:text-xl mb-2">
                  AI 기술을 활용한 스마트한 정보 제공
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  다소 길고 읽기 어려운 공공데이터의 공식 문서 내용을 효율적으로 전달하기 위해, 최신 인공지능(AI) 기술을 도입하여 요약 및 블로그 포스팅 작성을 자동화하고 있습니다. 매일 최신 데이터를 파싱하고 정제하여 가장 가독성 높은 형태로 매일 아침 자동 업데이트됩니다.
                </p>
                <div className="mt-3 rounded-xl bg-amber-50 p-4 border border-amber-100/50 text-xs text-amber-800 leading-relaxed">
                  <span className="font-bold">⚠️ 알림:</span> AI 기술 특성상 간혹 데이터 해석의 미세한 오차가 발생할 수 있으므로, 금전적인 신청이나 참가가 따르는 중요 혜택/행사는 반드시 제공된 원본 링크나 관할 지자체 담당 부서에 한 번 더 정확한 상세 사항을 확인하시기 바랍니다.
                </div>
              </div>
            </section>
          </div>

          {/* 소개 페이지 하단 버튼 */}
          <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center rounded-2xl bg-amber-500 hover:bg-amber-600 py-3.5 px-6 text-sm font-bold text-white transition-colors shadow-sm"
            >
              홈페이지 메인으로 가기
            </Link>
            <Link
              href="/blog"
              className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-white py-3.5 px-6 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
            >
              블로그 보러 가기
            </Link>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-amber-100 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p>© 2026 우리 동네 생활 정보. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
