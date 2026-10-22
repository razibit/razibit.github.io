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
              {config.social?.github && <a className="social-icon" href={config.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" width="22" height="22">
                  {/* Font Awesome Free 7.3.0 by @fontawesome — https://fontawesome.com/license/free (Icons: CC BY 4.0), Copyright 2026 Fonticons, Inc. */}
                  <path fill="currentColor" d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z" />
                </svg>
              </a>}
              {config.social?.linkedin && <a className="social-icon" href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <svg aria-hidden="true" focusable="false" viewBox="0 0 448 512" width="22" height="22">
                  {/* Font Awesome Free 7.3.0 by @fontawesome — https://fontawesome.com/license/free (Icons: CC BY 4.0), Copyright 2026 Fonticons, Inc. */}
                  <path fill="currentColor" d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z" />
                </svg>
              </a>}
              {config.social?.x && <a className="social-icon" href={config.social.x} target="_blank" rel="noopener noreferrer" aria-label="X profile">
                <svg aria-hidden="true" focusable="false" viewBox="0 0 448 512" width="22" height="22">
                  {/* Font Awesome Free 7.3.0 by @fontawesome — https://fontawesome.com/license/free (Icons: CC BY 4.0), Copyright 2026 Fonticons, Inc. */}
                  <path fill="currentColor" d="M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z" />
                </svg>
              </a>}
            </div>
          </div>
        </section>

        <div className="content" tabIndex={-1}>
          <section id="work" className="section work" aria-labelledby="work-heading" tabIndex={-1}>
            <p className="preview-note">Products, systems, and research</p>
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
  
          <footer className="footer">
            <div><p>Thanks for stopping by.</p><p>© 2026 {config.author.name}</p></div>
            <img className="signature-image" src={publicAssetUrl("/images/signature.png")} alt={`${config.author.name} signature`} />
          </footer>
        </div>
      </main>
    </>
  );
}
