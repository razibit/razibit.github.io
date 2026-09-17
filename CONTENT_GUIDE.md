# Work portfolio content guide

The work portfolio is a statically generated Next.js site. Ordinary updates are made in `content/` and `public/`; React, TypeScript, and CSS files do not need to change.

## Where to edit

| Change | Authoring file | Result |
| --- | --- | --- |
| Profile, title, social links, navigation | `content/config.toml` | Header, navigation, metadata, contact/profile links |
| Biography | `content/about.md` | Homepage About section |
| Project | `content/projects/<slug>.md` | Homepage project card and `/work/<slug>/` detail page |
| Experience | `content/experience/<slug>.md` | Homepage Experience section |
| Blog post | `content/posts/YYYY-MM-DD-<slug>.md` | `/blog/` and `/blog/<slug>/` |
| News item | `content/news/YYYY-MM-DD-<slug>.md` | Homepage News section and `/news/` |
| Material/resource | `content/materials/<slug>.md` | Homepage preview and `/materials/` |
| General page | `content/pages/<slug>.md` | `/<slug>/`; add navigation in `config.toml` if it should be linked |
| Skills | `content/skills.toml` | Homepage Skills section |
| Optional technical publications | `content/publications.bib` | Reserved shared content surface; no work page currently consumes it |

Delete the corresponding content file to remove that item on the next build. Set `published: false` to keep a post or news item validated but hidden.

## Markdown files

Use YAML front matter between the opening and closing `---` lines. Filenames become stable URL slugs, so avoid renaming a published post or project unless its URL may change.

### Project

```markdown
---
title: Example project
label: Product platform
summary: One-sentence description shown on the homepage.
role: Your verified role
contribution: The decisions and work you can substantiate.
stack: React · TypeScript · PostgreSQL
outcome: A verified outcome, or leave this field out.
featured: true
image: /images/example-project.png
repository: https://github.com/example/repository
demo: https://example.com
---

Longer project detail in GitHub-Flavored Markdown.
```

Project `image`, `repository`, `demo`, and `link` fields are optional. Local images must exist below `public/` and be referenced with a root-relative path such as `/images/example-project.png`.

### Blog post

```markdown
---
title: A technical note
date: 2026-09-18
description: A short summary for the blog index and metadata.
tags:
  - TypeScript
  - PostgreSQL
featured: false
published: true
image: /images/post-cover.png
---

Write the post here. Tables, task lists, fenced code, links, and images use GitHub-Flavored Markdown.
```

The `date` field controls ordering; the filename controls the `/blog/<slug>/` URL. `published` defaults to true when omitted.

### News, experience, materials, and pages

```markdown
---
title: A short announcement
date: 2026-09-18
published: true
---

News body written in Markdown.
```

Experience files normally use `title`, `dates`, `summary`, and optional `featured`. Material files use `title`, `type`, `date`, `description`, `tags`, `image`, `link`, and/or `download`. Page files require `title` and may have `description`; their body is rendered as Markdown.

For a downloadable local material, place the file in `public/` and use `download: /files/resource.pdf`. External links may be full `https://` URLs.

## TOML files

`config.toml` owns site identity and navigation. Use `type = "section"` with a homepage section id (for example `work`, `experience`, `news`) or `type = "page"` for a generated route such as `blog` or a file in `content/pages/`.

`skills.toml` uses one table per group:

```toml
note = "Optional note"

[[groups]]
name = "Frontend"
items = ["React", "TypeScript"]
```

## Validation and local build

From this repository root:

```powershell
npm ci
npm run validate-content
npm run build
```

Validation reports the file and field for invalid front matter, TOML, BibTeX, duplicate slugs, malformed values, missing local assets, and missing required content directories. The static site is written to `out/`. GitHub Actions runs the same validation and build with Node.js 22 before deploying the root site.

The setup is intentionally file-based: edit these files locally or through GitHub’s web editor, then let the repository workflow rebuild the static site.

