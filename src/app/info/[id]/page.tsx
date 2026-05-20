import Link from "next/link";
import localInfo from "../../../../public/data/local-info.json";

interface InfoItem {
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

// 빌드 타임에 어떤 상세 페이지들이 생성되어야 하는지 미리 정의해 주는 함수입니다.
export function generateStaticParams() {
  const { events, benefits } = localInfo;
  const paths = [
    ...events.map((e) => ({ id: e.id })),
    ...benefits.map((b) => ({ id: b.id })),
  ];
  return paths;
}

// 개별 상세 페이지를 보여주는 리액트 컴포넌트입니다.
export default async function InfoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { events, benefits } = localInfo;

  // 전체 데이터 중에서 주소창의 ID와 일치하는 항목을 찾습니다.
  const item = [...events, ...benefits].find((x) => x.id === id) as InfoItem | undefined;

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50/30 p-4 text-center">
        <h2 className="text-2xl font-bold text-zinc-800">소식을 찾을 수 없습니다</h2>
        <p className="mt-2 text-zinc-500">삭제되었거나 주소가 올바르지 않습니다.</p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const isEvent = item.category === "행사";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 text-zinc-800 font-sans antialiased">
      {/* 헤더 */}
      <header className="border-b border-amber-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-200 bg-white text-amber-900 transition-colors hover:bg-amber-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <h1 className="text-lg font-bold text-amber-900">상세 소식 보기</h1>
          </div>
        </div>
      </header>

      {/* 본문 콘텐츠 */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <article className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl shadow-orange-100/40">
          {/* 타이틀 배너 */}
          <div className={`p-6 sm:p-10 border-b border-zinc-100 ${isEvent ? "bg-gradient-to-tr from-amber-500/10 to-orange-500/10" : "bg-gradient-to-tr from-orange-500/10 to-red-500/10"}`}>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
                isEvent
                  ? "bg-amber-100 text-amber-800 ring-amber-600/20"
                  : "bg-orange-100 text-orange-800 ring-orange-600/20"
              }`}>
                {item.category}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              {item.name}
            </h2>
          </div>

          {/* 핵심 정보 목록 */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="rounded-2xl bg-zinc-50/50 p-6 border border-zinc-100">
              <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                기본 안내 정보
              </h3>
              <dl className="grid gap-y-4 gap-x-6 sm:grid-cols-2 text-sm">
                <div>
                  <dt className="font-semibold text-zinc-500">📅 {isEvent ? "행사 기간" : "지원 기간"}</dt>
                  <dd className="mt-1 text-zinc-800 font-medium">
                    {item.startDate === item.endDate
                      ? item.startDate
                      : `${item.startDate} ~ ${item.endDate}`}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">📍 {isEvent ? "행사 장소" : "신청 처"}</dt>
                  <dd className="mt-1 text-zinc-800 font-medium truncate">{item.location}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-zinc-500">👥 지원 대상</dt>
                  <dd className="mt-1 text-zinc-800 font-medium">{item.target}</dd>
                </div>
              </dl>
            </div>

            {/* 상세 설명 */}
            <div>
              <h3 className="text-base font-bold text-zinc-950 mb-3">소식 상세 내용</h3>
              <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line sm:text-base">
                {item.summary}
              </p>
            </div>

            {/* 원본 링크 버튼 */}
            <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row gap-4">
              <a
                href={item.originalLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center rounded-2xl py-3.5 px-4 text-sm font-bold text-white shadow-md transition-all duration-300 ${
                  isEvent
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-orange-100"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-red-100"
                }`}
              >
                자세히 보기 →
              </a>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center rounded-2xl border border-zinc-200 bg-white py-3.5 px-4 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                목록으로 돌아가기
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* 푸터 */}
      <footer className="mt-20 border-t border-amber-100 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="mb-2">
            본 사이트의 정보는 공공데이터포털(data.go.kr)의 API 데이터를 기반으로 제공됩니다.
          </p>
          <p>© 2026 우리 동네 생활 정보. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
