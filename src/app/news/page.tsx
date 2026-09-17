import NewsList from "@/components/shared/NewsList";
import { getNews, getSiteConfig } from "@/lib/content";

export const metadata = { title: "News" };

export default function NewsPage() {
  return (
    <main className="standalone-page">
      <p className="eyebrow">{getSiteConfig().author.name}</p>
      <h1>News</h1>
      <p className="page-lede">Announcements, updates, and short notes.</p>
      <NewsList items={getNews()} />
    </main>
  );
}
