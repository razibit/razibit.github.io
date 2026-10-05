---
title: "iLoveMd — Browser-Based Markdown Editing, Annotation, and Document Export"
label: "Developer and writing tool"
summary: "A local-first browser workspace with Markdown editing, rendered review, revision-aware annotations, and document exports."
role: "Workspace implementation contributor"
contribution: "Rendering, storage, annotations, and browser export workflows."
stack: "React · TypeScript · IndexedDB · Markdown · Playwright"
outcome: "Preview and export share one rendering engine and a selected document snapshot."
featured: true
order: 3
repository: "https://github.com/razibit/ilovemd"
demo: "https://ilovemd.tech"
---

*One Markdown source from writing to finished document.*

## Project header

**Category:** Developer and writing tool. **Role:** Workspace implementation contributor. **Timeline:** Documented work from September 2026. **Status:** Working browser application; site reachable in the current link check.

## Overview and problem

Documents with math, diagrams, images, and annotations can drift between editor preview and exported files. iLoveMd unifies writing and review around Markdown as the source of truth.

## Solution and my contribution

I implemented the workspace, rendering/storage/annotation paths, and subsequent export and interface refinements. The client supports editing, split/preview modes, outline navigation, synchronized scrolling, local images, themes, revision history, and visual annotations.

## Technical architecture

A React/CodeMirror application uses a shared TypeScript Markdown engine built with Unified, remark/rehype, KaTeX, Shiki, and sanitized Mermaid output. IndexedDB separates content-addressed images from revision snapshots and stores local preferences/history/annotations. Superseded render workers are cancelled, and revision checks discard stale results. An immutable selected snapshot drives browser-held PDF/PNG/HTML output. The optional Node/Fastify/Playwright reference renderer is separate and is not the web app’s export backend.

## Challenges and solutions

Preview/export mismatch is addressed by one rendering engine and snapshot-based export. Atomic storage updates and version checks protect document heads/history. Annotation records retain revision and layout context so changes do not silently relocate marks. Export preflight detects missing resources and printable-bound issues.

## Technology stack

**Frontend:** React, TypeScript, CodeMirror, Vite. **Rendering:** Unified, remark, rehype, KaTeX, Shiki, Mermaid. **Storage:** IndexedDB. **Export/testing:** PDFMake, html2canvas, Playwright. **Hosting:** Static Cloudflare configuration.

## Results and limitations

The application generates PDF with selectable text and repeating table headers, PNG, standalone HTML, Markdown, and source/asset bundles locally. September 9 validation documentation records 20 engine/export checks and 16 Chromium journeys passing; these are historical results rather than rerun proof here. Browser storage can be evicted or cleared and is not a durable backup. Conflicting automation p95 figures are omitted rather than presented as interaction latency.
