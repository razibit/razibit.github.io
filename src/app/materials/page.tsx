import { MaterialCard } from "@/components/shared/CollectionCard";
import { getMaterials, getSiteConfig } from "@/lib/content";

export const metadata = { title: "Materials" };

export default function MaterialsPage() {
  const materials = getMaterials();
  return <main className="standalone-page"><p className="eyebrow">{getSiteConfig().author.name}</p><h1>Materials</h1><p className="page-lede">Resources, talks, notes, and downloadable material.</p><div className="collection-grid">{materials.length ? materials.map((item) => <MaterialCard key={item.slug} item={item} />) : <p className="empty-state">No materials published yet.</p>}</div></main>;
}
