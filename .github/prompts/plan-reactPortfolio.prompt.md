# Plan: React Portfolio — PhD & Industry Ready

**TL;DR:** Replace the existing plain HTML/CSS site with a **React + Vite + Tailwind CSS** single-page app in the same `razibit.github.io` folder. All content will be real (no placeholders). The page scrolls through 10 sections — structured for course evaluation (25 Feb), PhD applications, and internships simultaneously. All content lives in data files so live modifications during evaluation are trivially easy.

---

## Steps

1. **Initialize React + Vite inside the existing folder** at `g:\Portfolio\razibit.github.io`. Run `npm create vite@latest . -- --template react` to scaffold Vite in-place. The old HTML/CSS/JS files remain until the React build works, then are staged for deletion.

2. **Install dependencies** — `tailwindcss`, `postcss`, `autoprefixer` (Tailwind v3), and `@tailwindcss/typography` for publication/blog prose. Optionally: `framer-motion` (lightweight animation for hero/cards) and `react-icons` (replaces current PNG social icons).

3. **Configure Tailwind** (`tailwind.config.js` + `postcss.config.js`). Extend the config to carry over the brand green `#62b04a` as `accent` so design continuity is maintained.

4. **Configure Vite** (`vite.config.js`) — set `base: "./"` so assets resolve correctly on GitHub Pages.

5. **Create data files** under `src/data/`:
   - `projects.js` — 6 projects: SenFAI, COVID X-ray, Bangla Digit, Smart Agriculture, **Global Smartphone Database 2025 (Kaggle viral)**, **AI Photographer Device (Research Concept)**
   - `publications.js` — 2 real publications (IEEE 2023, ACM 2022); third marked optional/placeholder
   - `experience.js` — MU AI Lab (Research Assistant), **Apostrophe Labs (Founder, May 2025–Present)**, Teaching Assistant
   - `skills.js` — categorized: Python/JS/C++, ML/DL/CV, React/Tailwind/Git, Data Engineering
   - `awards.js` — Dean's Scholarship, Hackathon 1st Place, NLP Challenge Award, VC Academic Excellence Award

6. **Build components** in `src/components/` — one file per section, completely independent (easy for teacher to ask you to modify any part):
   - `Navbar.jsx` — sticky, smooth-scroll links, mobile hamburger menu (Tailwind `md:flex hidden`)
   - `Hero.jsx` — name, headline `"AI Engineering Student | Founder @ Apostrophe Labs | Dataset Creator"`, two CTA buttons (View Projects → anchors to `#projects`, Download CV → `/files/rajib_dab_cv.pdf`)
   - `About.jsx` — 2-column: profile photo left, bio right; includes Apostrophe Labs origin story in 2–3 lines
   - `Skills.jsx` — 4 category cards using Tailwind grid; each skill is a badge element
   - `Experience.jsx` — vertical timeline using CSS border-left trick; Apostrophe Labs listed first (most recent)
   - `Projects.jsx` — filterable card grid (All / AI / Web / Data); each card: title, description, tech badge chips, GitHub link icon; data comes from `projects.js`
   - `Publications.jsx` — accordion cards with expand/collapse abstract + one-click BibTeX copy (React `useState`)
   - `ResearchInterests.jsx` — icon-card grid: Computer Vision, NLP, Human-AI Interaction, Intelligent Systems, AI Hardware
   - `Awards.jsx` — clean list with year badge and description
   - `Contact.jsx` — email, GitHub, LinkedIn, ResearchGate, ORCID as icon links; minimal centered layout
   - `Footer.jsx` — copyright line

7. **Wire everything in `App.jsx`** — single scrollable page: `<Navbar>` + `<main>` containing all section components in order. Section IDs match Navbar anchors.

8. **Responsiveness** — every component uses Tailwind responsive prefixes (`sm:`, `md:`, `lg:`). Test breakpoints: 320px, 768px, 1024px. Two-column layouts collapse to single-column below `md`. Hero text scales with `text-4xl md:text-6xl`.

9. **GitHub Pages deployment** — add `"build": "vite build"` and `"deploy"` script. Build output goes to `dist/`. Configure Actions or use `gh-pages` package. Keep CNAME file.

10. **Clean up** — archive or delete old `*.html`, `css/`, `js/` files after confirming the React build serves correctly.

---

## Project File Structure

```
razibit.github.io-2.0/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html              ← Vite entry point
├── public/
│   ├── images/rajib_dab.jpg
│   ├── files/rajib_dab_cv.pdf
│   └── assets/icons/social_icons/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Experience.jsx
    │   ├── Projects.jsx
    │   ├── Publications.jsx
    │   ├── ResearchInterests.jsx
    │   ├── Awards.jsx
    │   ├── Contact.jsx
    │   └── Footer.jsx
    └── data/
        ├── projects.js
        ├── publications.js
        ├── experience.js
        ├── skills.js
        └── awards.js
```

---

## Verification

- `npm run dev` → live preview at `localhost:5173`, check all sections render
- Chrome DevTools → Device toolbar: verify 320px, 768px, 1024px layouts
- Click all CTA buttons and nav links
- Test Projects filter (All / AI / Web / Data)
- Test Publications accordion + BibTeX copy button
- `npm run build` → confirm `dist/` is generated, no build errors
- Deploy to GitHub Pages, confirm live site at `razibit.github.io`

---

## Decisions

- **React + Vite over Next.js:** Static portfolio doesn't need SSR; Vite is faster, simpler, teacher can see clean `src/` structure
- **Single-page over multi-page:** Faster to build before Feb 25, better UX for reviewers who scroll, all sections visible without routing setup
- **Tailwind over plain CSS:** Responsiveness is built-in via utility classes; teacher resizing the window will work perfectly; code is readable
- **Data files over hardcoded JSX:** Any live modification (change a project name, swap a color, add an item) takes 10 seconds — zero chance of failing the live test
- **Real content only:** Fake internships and fake co-authors are a liability for PhD applications; replace completely with Apostrophe Labs + Kaggle dataset which are genuine strong signals
- **Light theme:** More professional for academic/PhD context; better contrast; easier to read publications text
