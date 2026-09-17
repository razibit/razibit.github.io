import WorkHome from "@/components/work/WorkHome";
import { getAboutContent } from "@/lib/workContent";
import { getExperience, getMaterials, getNews, getProjects, getSiteConfig, getToml } from "@/lib/content";
import type { SkillsContent } from "@/types/content";

export default function Home() {
  const config = getSiteConfig();
  const skills = getToml<SkillsContent>("skills.toml");
  return <WorkHome config={config} about={getAboutContent()} projects={getProjects()} experience={getExperience()} materials={getMaterials()} news={getNews()} skills={skills} />;
}
