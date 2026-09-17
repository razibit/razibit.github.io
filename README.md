# Razib — Profile & Practice

A single-page work portfolio built with HTML, CSS, and JavaScript. No build step, package installation, backend, or database is required.

## Run locally

From this repository directory:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. The server is local only. Stop it with Ctrl+C.

## Files and behavior

- `index.html`: semantic content and explicit content placeholders.
- `assets/style.css`: responsive layout, light/dark palettes, keyboard focus, print styles.
- `assets/theme.js`: early theme selection to avoid a wrong-theme first paint.
- `assets/portfolio.js`: theme persistence, system preference updates, section navigation, height-aware sticky introduction.
- `assets/fonts/InterVariable.woff2`: locally served Inter from https://rsms.me/inter/font-files/InterVariable.woff2. Its SIL Open Font License is included alongside it.
- `design-review/`: preserved concept gallery and original reference work.
- `academic/`: independent, ignored repository; outside this implementation.

The page follows the system theme until a visitor selects Light or Dark. Explicit choices are remembered using `portfolio-theme` in localStorage. Blocked storage does not prevent switching themes. Clearing the saved choice restores system behavior. Content and anchor links also work without JavaScript.

## Content to supply before publishing

- Headshot, three project screenshots, and personal signature.
- Verified project titles, descriptions, roles, contributions, technologies, and outcomes.
- Experience roles, companies, dates, and responsibilities.
- Confirmed technical skills and a short biography.
- Résumé file, verified GitHub/LinkedIn URLs, and actual contact details.

Social icons are intentionally disabled and have screen-reader accessible names only. The résumé is marked coming soon. `Rajib [at] email.com` is deliberately plain placeholder text; other name references remain Razib. Example content is not a claim of completed work.

## Local validation

See `output/playwright/VALIDATION.md`, `validation.txt`, and width/theme screenshots. Browser validation tools are separate from the site's runtime; the website has no npm dependencies. No deployment or Git/GitHub writes were performed.
