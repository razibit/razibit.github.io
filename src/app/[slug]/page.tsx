import Link from "next/link";
import { notFound } from "next/navigation";
import { getPages, routeUrl } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

type RouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const page = getPages().find((item) => item.slug === slug);
  return page
    ? {
        title: String(page.meta.title ?? page.slug),
        description: typeof page.meta.description === "string" ? page.meta.description : undefined,
      }
    : {};
}

export default async function ContentPage({ params }: RouteProps) {
  const { slug } = await params;
  const page = getPages().find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <main className="article-page">
      <Link className="back-link" href={routeUrl("/")}>← Home</Link>
      <h1>{String(page.meta.title ?? page.slug)}</h1>
      {typeof page.meta.description === "string" && <p className="page-lede">{page.meta.description}</p>}
      <Markdown content={page.body} className="markdown article-body" />
    </main>
  );
}
