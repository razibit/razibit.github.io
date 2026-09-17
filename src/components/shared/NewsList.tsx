import { Markdown } from "@/lib/markdown";
import type { ContentDocument, NewsMeta } from "@/lib/content";

export default function NewsList({ items, emptyMessage = "No news published yet." }: { items: ContentDocument<NewsMeta>[]; emptyMessage?: string }) {
  return items.length ? (
    <div className="news-list">
      {items.map((item) => (
        <article key={item.slug}>
          <time dateTime={item.meta.date}>{item.meta.date}</time>
          {item.meta.title && <h3>{item.meta.title}</h3>}
          <Markdown content={item.body} />
        </article>
      ))}
    </div>
  ) : <p className="empty-state">{emptyMessage}</p>;
}
