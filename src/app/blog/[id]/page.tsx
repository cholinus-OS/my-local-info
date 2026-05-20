import Link from "next/link";
import blogPosts from "../../../../public/data/blog.json";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  relatedId: string;
}

export function generateStaticParams() {
  const posts = blogPosts as BlogPost[];
  return posts.map((post) => ({
    id: post.id,
  }));
}

// 텍스트 속 **굵은 글씨**를 <strong> 태그로 변환해주는 초간단 함수입니다.
function parseBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-zinc-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// 마크다운 형식의 줄글을 이쁘게 꾸며진 HTML 태그로 바꿔주는 초간단 파서입니다.
function renderMarkdown(content: string) {
  return content.split("\n").map((line, idx) => {
    const trimmed = line.trim();

    // 1. 가로선 (---)
    if (trimmed === "---") {
      return <hr key={idx} className="my-6 border-amber-100" />;
    }

    // 2. 제목 (### )
    if (trimmed.startsWith("### ")) {
      return (
        <h4 key={idx} className="mt-6 mb-3 text-lg font-bold text-amber-900">
          {trimmed.replace("### ", "")}
        </h4>
      );
    }

    // 3. 리스트 (* 또는 -)
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const text = trimmed.substring(2);
      return (
        <ul key={idx} className="list-disc pl-5 my-1.5 text-zinc-700">
          <li>{parseBoldText(text)}</li>
        </ul>
      );
    }

    // 4. 번호 리스트 (1. 2. 등)
    if (/^\d+\.\s/.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s/, "");
      return (
        <ol key={idx} className="list-decimal pl-5 my-1.5 text-zinc-700">
          <li>{parseBoldText(text)}</li>
        </ol>
      );
    }

    // 5. 일반 문단 및 빈 줄
    if (trimmed === "") {
      return <div key={idx} className="h-3" />;
    }

    return (
      <p key={idx} className="my-2.5 text-sm leading-relaxed text-zinc-700 sm:text-base">
        {parseBoldText(line)}
      </p>
    );
  });
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const posts = blogPosts as BlogPost[];
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50/30 p-4 text-center">
        <h2 className="text-2xl font-bold text-zinc-800">글을 찾을 수 없습니다</h2>
        <Link
          href="/blog"
          className="mt-6 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-600"
        >
          블로그 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 text-zinc-800 font-sans antialiased">
      {/* 헤더 */}
      <header className="border-b border-amber-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/blog"
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
              <h1 className="text-lg font-bold text-amber-900">블로그 본문 읽기</h1>
            </div>
            <Link
              href="/"
              className="text-xs font-semibold text-amber-900 hover:underline sm:text-sm"
            >
              메인 홈으로
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 본문 */}
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        
        {/* 구글 애드센스 상단 광고 영역 (플레이스홀더) */}
        <div className="mb-8 rounded-xl border border-zinc-150 bg-zinc-50/60 p-4 text-center text-xs text-zinc-400">
          <span className="block font-semibold">ADVERTISEMENT (Google AdSense)</span>
          <span className="mt-1 block">구글 애드센스 상단 광고 배치 영역</span>
        </div>

        <article className="overflow-hidden rounded-3xl border border-amber-100 bg-white p-6 shadow-xl shadow-orange-100/40 sm:p-10">
          {/* 머리말 */}
          <div className="border-b border-zinc-100 pb-6">
            <div className="flex items-center space-x-2 text-xs text-amber-600">
              <span>🏠 우리 동네 생활 꿀팁</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-zinc-950 sm:text-2xl">
              {post.title}
            </h2>
          </div>

          {/* 본문 내용 */}
          <div className="py-8 prose prose-zinc max-w-none">
            {renderMarkdown(post.content)}
          </div>

          {/* 원본 정보 연동 바로가기 */}
          {post.relatedId && (
            <div className="mt-6 rounded-2xl bg-amber-50/50 p-5 border border-amber-100/60 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-amber-900">이 소식의 공식 정보를 찾으시나요?</h4>
                <p className="text-xs text-zinc-500 mt-1">지자체 및 공공기관의 공식 혜택 정보를 확인해 보세요.</p>
              </div>
              <Link
                href={`/info/${post.relatedId}`}
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-600 transition-colors shrink-0"
              >
                공식 상세정보 보기
              </Link>
            </div>
          )}

          {/* 쿠팡 파트너스 배너 영역 */}
          <div className="mt-12 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/40 to-amber-50/40 p-6 text-center">
            <h4 className="text-sm font-extrabold text-orange-900">⚡️ 오늘의 추천 특가 상품</h4>
            <p className="text-xs text-zinc-500 mt-1">우리 동네 나들이 갈 때 필수 준비물, 지금 특가로 구경해 보세요!</p>
            
            {/* 임시 쿠팡 파트너스 링크 박스 */}
            <a
              href="https://link.coupang.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition-colors"
            >
              쿠팡 추천 상품 보러가기 🛍️
            </a>
            
            <span className="mt-3 block text-[10px] text-zinc-400">
              * 이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
            </span>
          </div>
        </article>

        {/* 구글 애드센스 하단 광고 영역 (플레이스홀더) */}
        <div className="mt-8 rounded-xl border border-zinc-150 bg-zinc-50/60 p-4 text-center text-xs text-zinc-400">
          <span className="block font-semibold">ADVERTISEMENT (Google AdSense)</span>
          <span className="mt-1 block">구글 애드센스 하단 광고 배치 영역</span>
        </div>

        {/* 목록으로 버튼 */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-bold text-amber-700 hover:text-amber-900"
          >
            ← 전체 블로그 목록 보기
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-amber-100 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="mb-2">
            본 사이트의 블로그 글은 AI(Gemini API)를 사용하여 자동 생성된 글입니다.
          </p>
          <p>© 2026 우리 동네 생활 정보. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
