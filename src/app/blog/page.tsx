import Link from "next/link";
import blogPosts from "../../../public/data/blog.json";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  relatedId: string;
}

export default function BlogList() {
  const posts = blogPosts as BlogPost[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 text-zinc-800 font-sans antialiased">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
              <h1 className="text-xl font-bold tracking-tight text-amber-900 sm:text-2xl">
                동네 이야기 블로그
              </h1>
            </div>
            <nav className="flex space-x-1 sm:space-x-2">
              <Link
                href="/"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100/50 sm:text-sm"
              >
                홈으로
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 본문 */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        
        {/* 블로그 설명 영역 */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight sm:text-3xl">
            💡 AI가 읽어주는 동네 소식
          </h2>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            공공데이터를 알기 쉽게 풀어서 설명하고, 꿀팁까지 정리해 전해드려요.
          </p>
        </div>

        {/* 블로그 포스팅 목록 */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-amber-100/70 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-200"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center space-x-2 text-xs text-zinc-400">
                  <span className="font-semibold text-amber-600">AI 추천 소식</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="mt-3 text-lg font-bold text-zinc-900 hover:text-amber-700 sm:text-xl">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {post.summary}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-50 pt-4">
                  <span className="text-xs text-zinc-400">
                    💡 생활 정보 자동 작성 블로그
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    글 읽으러 가기
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="ml-1 h-3.5 w-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-20 border-t border-amber-100 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2">
            본 사이트의 블로그 글은 AI(Gemini API)를 사용하여 자동 생성된 글입니다.
          </p>
          <p>© 2026 우리 동네 생활 정보. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
