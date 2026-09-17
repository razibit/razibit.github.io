# Razib — Profile & Practice

The work portfolio is a content-driven Next.js static site that preserves the Profile & Practice visual design, responsive behavior, theme switching, navigation, and accessibility treatment.

## Edit content without editing application code

Use [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the complete content map and templates. The normal authoring surface is:

- Markdown files in `content/projects/`, `experience/`, `posts/`, `news/`, `materials/`, and `pages/`
- TOML files in `content/config.toml` and `content/skills.toml`
- Optional verified assets below `public/`

Adding or removing one of those files changes the generated portfolio after the next build. The existing project and profile entries remain clearly marked placeholders until verified personal information is supplied.

## Local development and validation

Requires Node.js 22 or newer:

```powershell
npm ci
npm run dev
```

Then open http://localhost:3000/. Before publishing:

```powershell
npm run validate-content
npm run build
```

The static export is written to `out/`. GitHub Actions runs validation and the production build on the `master` branch before deploying GitHub Pages. No deployment or Git history operation is performed by local validation.

The `academic/` directory is a separate ignored Git repository. It is not part of the work-site build.
