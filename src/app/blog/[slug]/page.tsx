import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostData, getSortedPostsData } from "../../../lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import localInfo from "../../../../public/data/local-info.json";

interface Props {
  params: Promise<{ slug: string }>;
}

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

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다 | 성남시 생활 정보",
    };
  }

  const title = `${post.title} | 성남시 생활 정보`;
  const description = post.summary || "성남시의 유익한 정보와 팁을 담은 블로그 글입니다.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://my-local-info-aef.pages.dev/blog/${slug}`,
      type: "article",
      locale: "ko_KR",
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  const { events, benefits } = localInfo as {
    events: EventItem[];
    benefits: BenefitItem[];
  };

  const matchedInfo = [
    ...(events || []),
    ...(benefits || [])
  ].find((item) => item.name === post.title);

  const originalLink = matchedInfo?.originalLink;
  const hasValidLink = originalLink && originalLink !== "#";
  const displayLink = hasValidLink ? originalLink : "https://www.data.go.kr/";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "description": post.summary || "성남시의 유익한 정보와 팁을 담은 블로그 글입니다.",
    "author": {
      "@type": "Organization",
      "name": "성남시 생활 정보"
    },
    "publisher": {
      "@type": "Organization",
      "name": "성남시 생활 정보"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": "https://my-local-info-aef.pages.dev"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "블로그",
        "item": "https://my-local-info-aef.pages.dev/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://my-local-info-aef.pages.dev/blog/${post.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 text-zinc-800 font-sans antialiased flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
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
              <h1 className="text-lg font-bold text-amber-900">블로그 소식 보기</h1>
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
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:bg-amber-100/50 sm:text-sm"
              >
                소개
              </Link>
              <Link
                href="/blog"
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors sm:text-sm"
              >
                목록으로
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 본문 */}
      <main className="flex-grow mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <article className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl shadow-orange-100/40 p-6 sm:p-10">
          {/* 포스팅 정보 */}
          <div className="border-b border-zinc-100 pb-6 mb-8">
            <div className="flex items-center gap-2 text-xs mb-3">
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2.5 py-0.5 font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/10">
                {post.category || "일반"}
              </span>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-400">최종 업데이트: {post.date}</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              {post.title}
            </h2>

            {post.summary && (
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-500 italic bg-amber-50/30 p-4 rounded-xl border border-amber-100/50">
                {post.summary}
              </p>
            )}
          </div>

          {/* 마크다운 렌더러 영역 */}
          <div className="prose prose-amber max-w-none prose-headings:font-bold prose-a:text-amber-600 prose-img:rounded-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* 태그 목록 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 출처 표시 및 AI 안내 영역 */}
          <div className="mt-10 p-6 rounded-2xl bg-amber-50/50 border border-amber-100/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100/60 pb-3">
              <span className="text-sm font-semibold text-zinc-700 flex items-center gap-1.5">
                <span className="text-base">📌</span> 원문 출처
              </span>
              <a
                href={displayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-amber-700 hover:text-amber-900 underline break-all inline-flex items-center gap-1"
              >
                {hasValidLink ? "공공데이터 상세 페이지 바로가기" : "공공데이터포털 바로가기"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-3.5 w-3.5 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              이 글은 공공데이터포털(<a href="http://data.go.kr/" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-700 hover:underline">data.go.kr</a>)의 정보를 바탕으로 AI가 작성하였습니다. 정확한 내용은 원문 링크를 통해 확인해주세요.
            </p>
          </div>

          {/* 하단 네비게이션 버튼 */}
          <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-white py-3.5 px-6 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
            >
              ← 블로그 목록으로 돌아가기
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center rounded-2xl bg-amber-500 hover:bg-amber-600 py-3.5 px-6 text-sm font-bold text-white transition-colors shadow-sm"
            >
              홈페이지로 가기
            </Link>
          </div>
        </article>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-amber-100 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p>© 2026 우리 동네 생활 정보. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
