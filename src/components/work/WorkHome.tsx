import Link from "next/link";
import { Markdown } from "@/lib/markdown";
import { publicAssetUrl, routeUrl, type ContentDocument, type ExperienceMeta, type MaterialMeta, type NewsMeta, type ProjectMeta, type SiteConfig } from "@/lib/content";
import type { SkillsContent } from "@/types/content";
import NewsList from "@/components/shared/NewsList";
import ProjectsGrid, { type ProjectCardData } from "@/components/work/ProjectsGrid";

export default function WorkHome({
  config,
  about,
  projects,
  experience,
  materials,
  news,
  skills,
}: {
  config: SiteConfig;
  about: string;
  projects: ContentDocument<ProjectMeta>[];
  experience: ContentDocument<ExperienceMeta>[];
  materials: ContentDocument<MaterialMeta>[];
  news: ContentDocument<NewsMeta>[];
  skills: SkillsContent;
}) {
  const orderedProjects = [
    ...projects.filter((project) => project.meta.featured !== false),
    ...projects.filter((project) => project.meta.featured === false),
  ];
  const projectCards: ProjectCardData[] = orderedProjects.map((project) => ({
    slug: project.slug,
    title: project.meta.title,
    label: project.meta.label,
    summary: project.meta.summary,
    imageUrl: project.meta.image ? publicAssetUrl(project.meta.image) : undefined,
    href: routeUrl(`/work/${project.slug}/`),
    contribution: project.meta.contribution,
    stack: project.meta.stack,
    outcome: project.meta.outcome,
  }));
  const featuredExperience = experience.filter((item) => item.meta.featured !== false);

  return (
    <>
      <main className="portfolio">
        <section className="profile-hero" id="profile" aria-labelledby="profile-heading">
          {config.author.avatar ? <img className="headshot" src={publicAssetUrl(config.author.avatar)} alt={`${config.author.name} profile`} /> : <div className="headshot placeholder" role="img" aria-label="Headshot placeholder">Headshot<br />to add</div>}
          <div className="profile-copy">
            <div className="identity">
              <h1 id="profile-heading">{config.author.name}</h1>
              <p className="profession">{config.author.title}</p>
            </div>
            <p className="introduction">{(config.author.introduction ?? "").split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p>
            <p className="positioning">{config.author.positioning}</p>
            <div className="profile-actions">
              <a className="contact-action" href="#contact">Let’s talk</a>
              {config.author.resume_url ? <a className="resume-link" href={config.author.resume_url}>Résumé</a> : <span className="resume-placeholder">Résumé <span>— coming soon</span></span>}
            </div>
            <div className="social-links" aria-label="Professional profiles">
              {config.social?.github && <a className="social-icon" href={config.social.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">GitHub</a>}
              {config.social?.linkedin && <a className="social-icon" href={config.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">LinkedIn</a>}
            </div>
          </div>
        </section>

        <div className="content" tabIndex={-1}>
          <section id="work" className="section work" aria-labelledby="work-heading" tabIndex={-1}>
            <p className="preview-note">Products, systems, and research</p>
            <h2 id="work-heading">Selected work</h2>
            <p className="section-intro">A closer look at the problems, decisions, and details behind the work.</p>
            <ProjectsGrid projects={projectCards} />
          </section>
  
          <section id="experience" className="section" aria-labelledby="experience-heading" tabIndex={-1}>
            <h2 id="experience-heading">Experience</h2>
            <ol className="experience-list">
              {featuredExperience.map((item) => (
                <li key={item.slug}><p className="dates">{item.meta.dates}</p><div><h3>{item.meta.title}{item.meta.company ? ` · ${item.meta.company}` : ""}</h3><p>{item.meta.summary}</p></div></li>
              ))}
            </ol>
          </section>
  
          <section id="skills" className="section" aria-labelledby="skills-heading" tabIndex={-1}>
            <h2 id="skills-heading">Skills</h2>
            {skills.note && <p className="supporting-note">{skills.note}</p>}
            <dl className="skills-list">
              {skills.groups.map((group) => <div key={group.name}><dt>{group.name}</dt><dd>{group.items.join(", ")}</dd></div>)}
            </dl>
          </section>
  
          <section id="about" className="section" aria-labelledby="about-heading" tabIndex={-1}>
            <h2 id="about-heading">About</h2>
            <Markdown content={about} />
          </section>
  
          <section id="news" className="section" aria-labelledby="news-heading" tabIndex={-1}>
            <h2 id="news-heading">News</h2>
            <NewsList items={news} />
          </section>
  
          {materials.length > 0 && <section className="section" aria-labelledby="materials-heading"><h2 id="materials-heading">Materials</h2><div className="material-list">{materials.slice(0, 3).map((item) => <Link className="material-card" key={item.slug} href={routeUrl(`/materials/#${item.slug}`)}><strong>{item.meta.title}</strong><span>{item.meta.description}</span></Link>)}</div></section>}
  
          <section id="contact" className="section contact" aria-labelledby="contact-heading" tabIndex={-1}>
            <h2 id="contact-heading">Contact</h2>
            <p>Have a product in mind?<br />Let’s talk about what you’re building.</p>
            {config.author.email ? <p className="email">{config.author.email}</p> : <p className="supporting-note">Contact details to be added before publishing.</p>}
          </section>
  
          <footer className="footer"><div><p>Thanks for stopping by.</p><p>© 2026 {config.author.name}</p></div><span className="signature-placeholder">Signature placeholder</span></footer>
        </div>
      </main>
    </>
  );
}
