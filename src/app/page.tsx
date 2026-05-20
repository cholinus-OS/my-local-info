import Link from "next/link";
import localInfo from "../../public/data/local-info.json";

interface EventItem {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  originalLink: string;
}

interface BenefitItem {
  id: string;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  originalLink: string;
}

export default function Home() {
  const { events, benefits, lastUpdated } = localInfo as {
    events: EventItem[];
    benefits: BenefitItem[];
    lastUpdated: string;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 text-zinc-800 font-sans antialiased">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* 우리동네 아이콘 대용 로고 */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-200">
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
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-amber-900 sm:text-2xl">
                  성남시 생활 정보
                </h1>
                <p className="text-xs text-amber-700/80 sm:block hidden">
                  우리 동네의 유용한 축제와 혜택 소식을 한눈에 확인하세요!
                </p>
              </div>
            </div>
            {/* 상단 퀵 메뉴 */}
            <nav className="flex space-x-1 sm:space-x-2">
              <a
                href="#events"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100/50 sm:text-sm"
              >
                축제·행사
              </a>
              <a
                href="#benefits"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100/50 sm:text-sm"
              >
                지원금·혜택
              </a>
              <Link
                href="/blog"
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors sm:text-sm"
              >
                블로그
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* 인트로 히어로 배너 */}
        <section className="mb-10 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 p-6 text-white shadow-xl shadow-orange-100 sm:p-10">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
              Today&apos;s Update
            </span>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl">
              성남시의 최신 소식을 AI가 매일 전해드려요!
            </h2>
            <p className="mt-3 text-sm text-amber-50/90 sm:text-lg">
              공공데이터포털에서 수집된 가장 믿을 수 있는 행사 및 혜택 정보를 확인해 보세요. 매일 아침 자동으로 업데이트됩니다.
            </p>
          </div>
        </section>

        {/* 이번 달 행사/축제 섹션 */}
        <section id="events" className="mb-12 scroll-mt-20">
          <div className="mb-6 flex items-center justify-between border-b border-amber-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎉</span>
              <h3 className="text-xl font-bold text-amber-900 sm:text-2xl">
                이번 달 행사 & 축제
              </h3>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              총 {events.length}건
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200"
              >
                <div className="p-6">
                  {/* 카테고리 태그 */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/10">
                      {event.category}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {event.startDate === event.endDate
                        ? event.startDate
                        : `${event.startDate} ~ ${event.endDate}`}
                    </span>
                  </div>

                  <h4 className="mt-4 text-lg font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                    {event.name}
                  </h4>
                  
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                    {event.summary}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-zinc-50 pt-4 text-xs text-zinc-500">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-zinc-700 w-12 shrink-0">📍 장소</span>
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-zinc-700 w-12 shrink-0">👥 대상</span>
                      <span className="truncate">{event.target}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50/50 p-4 border-t border-zinc-100">
                  <Link
                    href={`/info/${event.id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-white border border-amber-200/80 px-4 py-2 text-xs font-semibold text-amber-900 shadow-sm transition-all hover:bg-amber-50 hover:text-amber-700"
                  >
                    자세히 보기
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="ml-1.5 h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 지원금/혜택 섹션 */}
        <section id="benefits" className="scroll-mt-20">
          <div className="mb-6 flex items-center justify-between border-b border-amber-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <h3 className="text-xl font-bold text-amber-900 sm:text-2xl">
                지원금 & 혜택 정보
              </h3>
            </div>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
              총 {benefits.length}건
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-orange-200"
              >
                <div className="p-6">
                  {/* 카테고리 태그 */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 ring-1 ring-inset ring-orange-600/10">
                      {benefit.category}
                    </span>
                    <span className="text-xs text-zinc-400">상시지원</span>
                  </div>

                  <h4 className="mt-4 text-lg font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                    {benefit.name}
                  </h4>
                  
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                    {benefit.summary}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-zinc-50 pt-4 text-xs text-zinc-500">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-zinc-700 w-12 shrink-0">👥 대상</span>
                      <span className="truncate">{benefit.target}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-zinc-700 w-12 shrink-0">🏢 신청처</span>
                      <span className="truncate">{benefit.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50/50 p-4 border-t border-zinc-100">
                  <Link
                    href={`/info/${benefit.id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-white border border-orange-200/80 px-4 py-2 text-xs font-semibold text-orange-950 shadow-sm transition-all hover:bg-orange-50 hover:text-orange-700"
                  >
                    자세히 보기
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="ml-1.5 h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* 하단 푸터 */}
      <footer className="mt-20 border-t border-amber-100 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2">
            본 사이트의 정보는 공공데이터포털(data.go.kr)의 API 데이터를 기반으로 제공됩니다.
          </p>
          <div className="flex flex-col items-center justify-center space-y-1 sm:flex-row sm:space-y-0 sm:space-x-3 text-zinc-400">
            <span>마지막 업데이트: {lastUpdated}</span>
            <span className="hidden sm:inline">|</span>
            <span>© 2026 우리 동네 생활 정보. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
