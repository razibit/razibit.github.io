# Portfolio Project Knowledge

## Purpose

This workspace contains the source repositories for Razib’s portfolio website. It is being restructured into two clearly separated portfolios:

1. **Work portfolio** — the primary portfolio for professional work, projects, experience, and related presentation.
2. **Academic portfolio** — a separate portfolio for academic work, research, education, publications, and related material.

The two portfolios may be presented under the same public domain, but they are maintained as separate Git repositories.

## Repository architecture

### Main domain repository

- **Local path:** `G:\Portfolio\razibit.github.io`
- **Repository role:** Main domain repository and work portfolio.
- **Public URL context:** `razibit.github.io`
- **Expected portfolio path:** The work portfolio is associated with the main domain repository.
- **Git relationship:** This is the parent repository in the local workspace.

### Academic repository

- **Local path:** `G:\Portfolio\razibit.github.io\academic`
- **Repository role:** Academic portfolio.
- **Expected public path:** `razibit.github.io/academic`
- **Git relationship:** This directory is an independent Git repository nested inside the main domain repository. It must remain independently versioned and must not be treated as ordinary content of the parent repository.

## Important Git boundary

The parent repository ignores the academic repository using this rule in `.gitignore`:

```gitignore
/academic/
```

This prevents the parent repository from tracking the academic repository’s files or its nested `.git` directory. Work performed inside `academic` belongs to the academic repository; work performed at the workspace root belongs to the main domain/work portfolio repository.

Do not move, merge, delete, reinitialize, or convert either repository without explicit instruction. Do not assume that a change in one repository should be committed or duplicated in the other.

## Current workspace layout

```text
G:\Portfolio\razibit.github.io\
├── .git\                         # Git metadata for the main domain/work repository
├── .gitignore                    # Ignores the independent academic repository
├── academic\                     # Separate Git repository for the academic portfolio
├── state\                        # Reserved workspace directory; current contents are unspecified
└── PROJECT_KNOWLEDGE.md          # This central project context file
```

The `state` directory exists in the workspace, but its purpose and contents have not yet been established. Agents should inspect it before relying on it and should not infer that it belongs to either portfolio without evidence.

## Working conventions for agents

Before making changes:

1. Identify which portfolio and repository the request concerns.
2. Confirm the current working directory and inspect the applicable repository’s status.
3. Read this file and any repository-local instructions or documentation.
4. Preserve the repository boundary: root changes belong to the work portfolio; `academic` changes belong to the academic portfolio.
5. Keep changes narrowly scoped and avoid altering the other portfolio as an incidental side effect.

After making changes:

1. Validate the affected functionality locally when applicable.
2. Report the exact repository and files changed.
3. Distinguish local/build validation from deployment or live-site validation.
4. Update this knowledge file when the change establishes an important architecture decision, workflow convention, route, integration, deployment detail, or other durable project fact.

Git operations such as branching, committing, pushing, merging, or pull-request management require explicit user instruction. Editing project files is allowed when it is part of the requested task, but repository history and remote state must not be changed automatically.

## Knowledge-file maintenance

This file is the central, durable context for both portfolio repositories. It should be updated alongside the existing information whenever the project gains noteworthy information, including:

- portfolio purpose, scope, or ownership boundaries;
- repository or directory structure;
- routes, domains, hosting, deployment, or build conventions;
- shared assets or intentional separation between the portfolios;
- important design, content, or architecture decisions;
- development, testing, or release workflows;
- resolved incidents and their lasting implications;
- known limitations, pending decisions, or verified external dependencies.

Keep entries factual, concise, and dated where timing matters. Prefer confirmed facts over assumptions. When something is unknown, record it as unknown or pending verification instead of guessing. Preserve historical context when replacing an earlier decision: explain what changed and why.

## Confirmed facts and open items

### Confirmed

- The main domain repository is the work portfolio repository.
- The `academic` repository is a separate repository for the academic portfolio.
- The academic portfolio is represented at `razibit.github.io/academic`.
- The parent repository ignores `/academic/`.

### 2026-09-18 — File-based content system

- Both repositories now use Node.js 22, Next.js static export, Markdown front matter, TOML configuration, and content loaders under `src/lib/`.
- Work content lives in `content/` at the parent root. Projects generate `/work/<slug>/`, posts generate `/blog/<slug>/`, and pages generate `/<slug>/`; news, materials, experience, skills, profile, navigation, and contact data are also content-driven.
- Academic content lives in the independent `academic` repository root. Its static routes are `/`, `/publications/`, `/teaching/`, `/services/`, `/materials/`, and `/blog/`, with dynamic Markdown routes for additional pages and posts. `next.config.ts` prefixes generated academic assets and internal links with `/academic`.
- Academic publications are read from the configured `content/publications.toml` source, normally `content/publications.bib`, with selected flags, previews, abstracts, BibTeX, DOI/arXiv, code, PDF, poster, and slides fields.
- `npm run validate-content` checks front matter, TOML, BibTeX, duplicate slugs/keys, content directories, and local public assets before `npm run build`. The GitHub Actions workflows run both commands with Node.js 22 on `master` (work) and `main` (academic).
- The nested `academic/JiayiGeng.github.io/` repository is preserved as ignored local reference material. It is excluded from the academic TypeScript scope and is not copied into generated output.
- No Git commits, pushes, branches, pull requests, or deployments were performed during this implementation.

### Open items

- GitHub Pages deployment has not been live-verified from this workspace; only local validation and static builds are confirmed.
- Final personal work and academic content, verified contact/profile links, publication entries, and local media remain to be supplied before publishing.
- The purpose of the root `state` directory has not yet been established.

## Update log

### 2026-09-17 — Selected concept implementation

- The user selected Profile & Practice and authorized implementation, fulfilling the earlier concept-selection gate.
- Root `index.html` and `assets/` now provide a dependency-free static work portfolio. No framework, build, backend, or database is used. Run locally with `python -m http.server 8765 --bind 127.0.0.1`; no deployment was performed.
- Work, Experience, Skills, About, and Contact are same-page sections. Desktop introduction sticks only when it fits the viewport; narrower layouts use normal flow.
- Local Inter, system-default light/dark themes, explicit localStorage preference with failure handling, skip navigation, and visible focus are implemented.
- Only disabled GitHub/LinkedIn marks are present, with accessible names and no visible labels/tooltips. Contact displays the exact placeholder `Rajib [at] email.com`; the portfolio name remains Razib. Upwork is absent from the implemented page.
- Missing personal/project content remains explicit. See root README for the full replacement checklist and local run instructions.
- Local Chrome/Playwright checks, contrast measurements, and responsive screenshots are in `output/playwright/`. The concept gallery and independent academic repository are preserved.

### 2026-09-17

- Created `design-review/` for work-portfolio concept selection only: three static image-generated directions, twelve final desktop/mobile light/dark previews, and a dependency-free local HTML review gallery.
- Directions are Profile & Practice, Personal Editorial, and Work in Focus. Professional positioning chosen by the user: full-stack product engineer, targeting Upwork clients and startup recruiters.
- The gallery opens directly as HTML or through `python -m http.server 4173 --bind 127.0.0.1 --directory design-review`. This is a review artifact, not a selected portfolio frontend or deployment architecture.
- Reference studies: Tania Rascia (primary), Brittany Chiang (left introduction only), Cassidy Williams (personal composition only), Una Kravets (signature), Kent C. Dodds (composition at reduced type scale).
- Project examples, role/contribution/outcome data, experience dates, biography details, headshot, signature, resume, and contact/profile destinations require supplied or verified content before publishing. Do not infer claims from the visual placeholders.
- Preserve the decision gate: await the user's concept selection and requested modifications before final implementation. Academic portfolio remains outside scope.
- Validation evidence and raster/accessibility limitations are recorded in `design-review/README.md` and `design-review/checks/`.

### 2026-09-13

- Created this central knowledge file for the two-repository portfolio project.
- Documented the work-portfolio/main-domain and academic-portfolio repository boundary.
- Documented the academic public path: `razibit.github.io/academic`.
- Documented the parent `.gitignore` rule `/academic/`.
