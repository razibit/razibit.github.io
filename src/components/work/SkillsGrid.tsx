"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { SkillGroup } from "@/types/content";

function setSkillTagPressed(event: ReactPointerEvent<HTMLLIElement>, pressed: boolean) {
  if (event.pointerType !== "touch") return;
  if (pressed) event.currentTarget.dataset.pressed = "true";
  else delete event.currentTarget.dataset.pressed;
}

export default function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="skills-grid">
      {groups.map((group, index) => {
        const headingId = `skill-category-${index}-heading`;
        return (
          <article className="skill-card" key={group.name} aria-labelledby={headingId}>
            <h3 id={headingId}>{group.name}</h3>
            <ul className="skill-tags">
              {group.items.map((item) => (
                <li
                  className="skill-tag"
                  key={item}
                  onPointerDown={(event) => setSkillTagPressed(event, true)}
                  onPointerUp={(event) => setSkillTagPressed(event, false)}
                  onPointerCancel={(event) => setSkillTagPressed(event, false)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
