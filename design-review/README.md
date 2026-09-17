# Work portfolio concept review

Created 2026-09-17. Review stage only. No concept has been selected and no portfolio application has been implemented.

Open `index.html` directly, or serve this folder using `python -m http.server 4173 --bind 127.0.0.1 --directory design-review` from the work repository root. No dependencies, database, Docker, hosting, or build step are required.

## Deliverables

- Three concepts: Profile & Practice, Personal Editorial, Work in Focus.
- Twelve current PNG previews in `previews/`: full desktop and representative mobile, each in light and dark modes.
- One local review gallery with theme/screen controls, large-image inspection, individual image links, design rationale, tablet behavior notes, and contrast specifications.
- `content.txt` contains the representative copy; `prompts.json` records the built-in image generation briefs.
- Reference captures are kept in `references/` for design study. They are third-party website screenshots, not portfolio assets to publish.

## Design rationale

Profile & Practice combines Brittany Chiang's left introduction/navigation arrangement with Tania Rascia's structured reading hierarchy. The headshot placeholder is above the name. The main content is an independent, clearly headed layout.

Personal Editorial emphasizes Tania's readable organization, conventional type, and compact sections. Cassidy Williams informs only its welcoming composition and personality, not its type or components.

Work in Focus uses wider image/text project sections and paired supporting sections, informed by Kent C. Dodds's composition but with restrained scale and no corporate footer. Tania's hierarchy remains the common foundation.

All three use a compact sign-off and labeled signature placeholder inspired by Una Kravets. The same project examples appear in each. No academic portfolio work is included.

## Content boundaries

The marketplace, document editor, and operations workspace are explicitly representative examples, not verified project claims. Roles, contributions, outcomes, dates, employer history, profile destinations, email, résumé, headshot, and signature await supplied content. The illustrative stacks need confirmation. Do not publish the previews as evidence of the owner's actual history.

An initial Profile & Practice draft introduced dates and biographical copy from outside the supplied content; it was corrected before inclusion. An initial Personal Editorial mobile draft retained a tablet-like layout; the deliverable is its reflowed replacement. Rejected drafts are not in this review folder.

## Fidelity and accessibility

These are built-in image_gen raster mockups, not browser screenshots of an implemented portfolio. Logical design targets were desktop 1440px wide and mobile 390px wide; actual output pixel dimensions are recorded in `validation.json`. Generated typefaces, spacing, colors, and minor text wrapping are approximate. The mobile artifacts are scroll excerpts, not full-page mobile layouts.

The proposed design tokens are precise; generated pixels are not asserted to match them exactly. Intended text sizes: body 16px, supporting 14px, headings approximately 24–36px. Intended fonts by concept: Inter, Source Sans 3, IBM Plex Sans. Any oversized heading approximation or incidental raster shading should be normalized to these specifications during the selected implementation.

Light: background #FAFAF8, primary #202428, supporting #596168, accent #185F73, control outline #7A8288. Dark: background #191D21, primary #EEF0F2, supporting #ADB5BD, accent #89C9DA, control outline #77838C. See `validation.json` for calculated token contrast ratios.

Final functional specification: same-page anchor navigation, visible underlined links and 3px focus outlines, 44px comfortable control targets, normal document order, no decorative motion, no tabbed replacement of portfolio content. Theme changes must preserve all content and avoid animations. Required text contrast: 4.5:1 normal / 3:1 large; essential control contrast: 3:1. Actual keyboard, screen-reader, responsive, persistence, and rendered-contrast testing remains for the selected portfolio build.

At tablet width around 834px, collapse the persistent rail into normal flow; keep the editorial column; remove the project-led concept's margin labels and stack media/text when necessary. Exact breakpoints are not validated by static images.

## Sources

- https://www.taniarascia.com/
- https://brittanychiang.com/
- https://cassidoo.co/
- https://una.im/about
- https://kentcdodds.com/
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

## Review gate

Await the user's selected concept and requested modifications. Do not treat acceptance of the creation plan as selection of a concept. No deployment or Git write operations were performed.
