import Link from "next/link";
import { Markdown } from "@/lib/markdown";
import { publicAssetUrl, routeUrl, type ContentDocument, type MaterialMeta, type PostMeta } from "@/lib/content";

export function PostCard({ post }: { post: ContentDocument<PostMeta> }) {
  return <article className="collection-card"><p className="eyebrow">{post.meta.date}</p><h2><Link href={routeUrl(`/blog/${post.slug}/`)}>{post.meta.title}</Link></h2>{post.meta.description && <p>{post.meta.description}</p>}<Link className="text-link" href={routeUrl(`/blog/${post.slug}/`)}>Read post →</Link></article>;
}

export function MaterialCard({ item }: { item: ContentDocument<MaterialMeta> }) {
  return <article className="collection-card" id={item.slug}>{item.meta.image && <img className="collection-image" src={publicAssetUrl(item.meta.image)} alt="" />}<p className="eyebrow">{item.meta.type ?? "Material"}{item.meta.date ? ` · ${item.meta.date}` : ""}</p><h2>{item.meta.title}</h2>{item.meta.description && <p>{item.meta.description}</p>}<Markdown content={item.body} />{(item.meta.link || item.meta.download) && <div className="card-links">{item.meta.link && <a href={item.meta.link} target="_blank" rel="noreferrer">Open resource</a>}{item.meta.download && <a href={publicAssetUrl(item.meta.download)} download>Download</a>}</div>}</article>;
}

