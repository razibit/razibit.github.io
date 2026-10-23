"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import ProjectImageCarousel, { type ProjectCardImage } from "./ProjectImageCarousel";
import styles from "./ProjectsGrid.module.css";

const INITIAL_PROJECT_COUNT = 9;
const COLLAPSED_TEXT_LINES = 3;

export type ProjectCardData = {
  slug: string;
  title: string;
  label?: string;
  summary?: string;
  images?: ProjectCardImage[];
  href: string;
  contribution?: string;
  stack?: string | string[];
  outcome?: string;
};

function ProjectTextDetails({
  project,
  detailsId,
}: {
  project: ProjectCardData;
  detailsId: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const contributionMeasureRef = useRef<HTMLParagraphElement>(null);
  const outcomeMeasureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    let frame = 0;
    const measureOverflow = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const hasClippedText = [contributionMeasureRef.current, outcomeMeasureRef.current]
          .some((element) => {
            if (!element) return false;
            const lineHeight = Number.parseFloat(window.getComputedStyle(element).lineHeight);
            const height = element.getBoundingClientRect().height;
            return Number.isFinite(lineHeight)
              ? height > lineHeight * COLLAPSED_TEXT_LINES + 1
              : height > 72;
          });
        setHasOverflow(hasClippedText);
      });
    };

    const observer = typeof ResizeObserver === "undefined"
      ? undefined
      : new ResizeObserver(measureOverflow);
    observer?.observe(details);
    window.addEventListener("resize", measureOverflow);
    measureOverflow();
    void document.fonts?.ready.then(measureOverflow);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measureOverflow);
    };
  }, [project.contribution, project.outcome]);

  const showReadMore = hasOverflow || expanded;
  const textClassName = expanded ? styles.metaText : `${styles.metaText} ${styles.clampedText}`;

  return (
    <div className={styles.details} ref={detailsRef}>
      <div className={styles.textGroup} id={detailsId}>
        {project.contribution && (
          <div className={styles.textBlock}>
            <p className={textClassName}>
              <strong>Contribution:</strong> {project.contribution}
            </p>
            <p className={`${styles.metaText} ${styles.measurement}`} ref={contributionMeasureRef} aria-hidden="true">
              <strong>Contribution:</strong> {project.contribution}
            </p>
          </div>
        )}
        {project.outcome && (
          <div className={styles.textBlock}>
            <p className={textClassName}>
              <strong>Outcome:</strong> {project.outcome}
            </p>
            <p className={`${styles.metaText} ${styles.measurement}`} ref={outcomeMeasureRef} aria-hidden="true">
              <strong>Outcome:</strong> {project.outcome}
            </p>
          </div>
        )}
      </div>
      {showReadMore && (
        <button
          className={styles.readMore}
          type="button"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

function getStackItems(stack: ProjectCardData["stack"]): string[] {
  if (Array.isArray(stack)) return stack;
  if (!stack) return [];
  return stack.split("·").map((item) => item.trim()).filter(Boolean);
}

export default function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  const [showAll, setShowAll] = useState(false);
  const gridId = useId();
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <>
      <div className={styles.headingRow}>
        <h2 className={styles.heading} id="work-heading">Selected work</h2>
        {projects.length > INITIAL_PROJECT_COUNT && (
          <button
            className={styles.expandToggle}
            type="button"
            aria-expanded={showAll}
            aria-controls={gridId}
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? "Show Less" : "All Projects"}
            <svg className={styles.chevron} aria-hidden="true" focusable="false" viewBox="0 0 12 12">
              <path
                d={showAll ? "M2.25 7.5 6 3.75 9.75 7.5" : "M2.25 4.5 6 8.25 9.75 4.5"}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        )}
      </div>
      <p className="section-intro">A closer look at the problems, decisions, and details behind the work.</p>
      <div className={styles.grid} id={gridId}>
        {visibleProjects.map((project) => {
          const detailsId = `${gridId}-${project.slug}-details`;
          const stackItems = getStackItems(project.stack);

          return (
            <article className={styles.card} key={project.slug} aria-labelledby={`${gridId}-${project.slug}-heading`}>
              {project.images && project.images.length > 0 && (
                <ProjectImageCarousel images={project.images} projectTitle={project.title} />
              )}
              <div className={styles.cardBody}>
                <p className={styles.label}>{project.label ?? "Project"}</p>
                <h3 className={styles.title} id={`${gridId}-${project.slug}-heading`}>
                  <Link href={project.href}>{project.title}</Link>
                </h3>
                {project.summary && <p className={styles.summary}>{project.summary}</p>}
                {(project.contribution || project.outcome) && (
                  <ProjectTextDetails project={project} detailsId={detailsId} />
                )}
                {stackItems.length > 0 && (
                  <div className={styles.stack}>
                    <div className={styles.badges}>
                      {stackItems.map((item, index) => <span className={styles.badge} key={`${item}-${index}`}>{item}</span>)}
                    </div>
                  </div>
                )}
                <Link className={styles.detailLink} href={project.href}>Read project detail →</Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
