import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, publicAssetUrl, routeUrl } from "@/lib/content";
import { Markdown } from "@/lib/markdown";

type RouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const project = getProjects().find((item) => item.slug === slug);
  return project ? { title: project.meta.title, description: project.meta.summary } : {};
}

export default async function ProjectPage({ params }: RouteProps) {
  const { slug } = await params;
  const project = getProjects().find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="article-page">
      <Link className="back-link" href={routeUrl("/#work")}>← Selected work</Link>
      <p className="eyebrow">{project.meta.label ?? "Project"}</p>
      <h1>{project.meta.title}</h1>
      {project.meta.summary && <p className="page-lede">{project.meta.summary}</p>}
      {project.meta.image && <img className="article-image" src={publicAssetUrl(project.meta.image)} alt={`${project.meta.title} image`} />}
      <dl className="detail-grid">
        {project.meta.role && <div><dt>Role</dt><dd>{project.meta.role}</dd></div>}
        {project.meta.contribution && <div><dt>Contribution</dt><dd>{project.meta.contribution}</dd></div>}
        {project.meta.stack && <div><dt>Stack</dt><dd>{Array.isArray(project.meta.stack) ? project.meta.stack.join(" · ") : project.meta.stack}</dd></div>}
        {project.meta.outcome && <div><dt>Outcome</dt><dd>{project.meta.outcome}</dd></div>}
      </dl>
      <Markdown content={project.body} className="markdown article-body" />
      <div className="card-links">
        {project.meta.repository && <a href={project.meta.repository} target="_blank" rel="noreferrer">Repository</a>}
        {project.meta.demo && <a href={project.meta.demo} target="_blank" rel="noreferrer">Live demo</a>}
        {project.meta.link && <a href={project.meta.link} target="_blank" rel="noreferrer">Project link</a>}
      </div>
    </main>
  );
}
