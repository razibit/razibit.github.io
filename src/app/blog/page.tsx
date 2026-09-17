import { PostCard } from "@/components/shared/CollectionCard";
import { getPosts, getSiteConfig } from "@/lib/content";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getPosts();
  return <main className="standalone-page"><p className="eyebrow">{getSiteConfig().author.name}</p><h1>Blog</h1><p className="page-lede">Long-form notes, technical writing, and reflections.</p><div className="collection-grid">{posts.length ? posts.map((post) => <PostCard key={post.slug} post={post} />) : <p className="empty-state">No posts published yet.</p>}</div></main>;
}
