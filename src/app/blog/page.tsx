import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 - 우리 동네 생활 정보",
  description: "우리 동네의 유익한 정보와 팁을 담은 블로그 글을 만나보세요.",
};

export default function BlogListPage() {
  const posts = getSortedPostsData();

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
                  성남시 생활 정보 블로그
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
                href="/blog"
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors sm:text-sm"
              >
                블로그
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 본문 */}
      <main className="flex-grow mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        {/* 인트로 영역 */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 mb-3">
            📚 동네 백과사전
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tight sm:text-4xl">
            유익한 동네 생활 가이드
          </h2>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            성남시의 축제, 지원 혜택 및 유용한 생활 지식들을 알기 쉽게 정리해 드립니다.
          </p>
        </div>

        {/* 블로그 포스팅 목록 */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-amber-200 bg-white/40 p-12 text-center">
            <span className="text-4xl">📭</span>
            <p className="mt-4 text-sm font-semibold text-zinc-500">
              아직 등록된 블로그 글이 없습니다.
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              조금만 기다려 주시면 유익한 소식으로 찾아뵙겠습니다.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-100/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-300"
              >
                <div className="p-6 sm:p-8">
                  {/* 카테고리 & 날짜 */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-0.5 font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/10">
                      {post.category || "일반"}
                    </span>
                    <span className="text-zinc-400">{post.date}</span>
                  </div>

                  {/* 제목 */}
                  <h3 className="mt-4 text-xl font-bold text-zinc-900 hover:text-amber-700 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* 요약 */}
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                    {post.summary}
                  </p>

                  {/* 태그 목록 */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center text-xs text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-zinc-50/50 p-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">
                    📖 정보 제공 글
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    글 읽으러 가기
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="ml-1 h-3 w-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
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
