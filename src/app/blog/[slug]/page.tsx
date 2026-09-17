import { notFound } from "next/navigation";
import { Markdown } from "@/lib/markdown";
import { getPost, getPosts, routeUrl } from "@/lib/content";
import Link from "next/link";

type RouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const posts = getPosts();
  return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "__empty__" }];
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  if (slug === "__empty__") return {};
  const post = getPost(slug);
  return post ? { title: post.meta.title, description: post.meta.description } : {};
}

export default async function BlogPostPage({ params }: RouteProps) {
  const { slug } = await params;
  if (slug === "__empty__") notFound();
  const post = getPost(slug);
  if (!post) notFound();
  return <main className="article-page"><Link className="back-link" href={routeUrl("/blog/")}>← All posts</Link><p className="eyebrow">{post.meta.date}</p><h1>{post.meta.title}</h1>{post.meta.description && <p className="page-lede">{post.meta.description}</p>}<Markdown content={post.body} className="markdown article-body" />{post.meta.tags?.length ? <p className="tag-row">{post.meta.tags.map((tag) => <span key={tag}>{tag}</span>)}</p> : null}</main>;
}
