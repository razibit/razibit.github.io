---
title: "PhoneDB — Smartphone Research and Comparison with a Custom Data Pipeline"
label: "Data-backed web application"
summary: "A smartphone catalog and four-device comparison app backed by MySQL and a separately built Python collection pipeline."
role: "Scraper creator and application engineering contributor"
contribution: "Dataset collection, ingestion, API/database hardening, and catalog flows."
stack: "Next.js · Express · MySQL · Python"
outcome: "Historical 4,144-row catalog; four-device comparison; published dataset."
featured: true
order: 5
repository: "https://github.com/razibit/Smartphone-Recommendation-WebApp"
link: "https://razibit.github.io/Smartphone-Recommendation-WebApp/"
---

*Turning collected specifications into a transparent shortlist.*

## Project header

**Category:** Data-backed web application. **Role:** Scraper creator and application engineering contributor. **Timeline:** Dataset work in July 2025; PhoneDB repository work from August 2025; hardening in September 2026. **Status:** Implemented runtime and public static showcase; hosted full-stack operation is not claimed. **Context:** DBMS course project.

## Overview and problem

Phone specifications span prices, hardware, memory, display, battery, and variants. Comparing scattered pages makes it difficult to apply several requirements consistently. PhoneDB structures those attributes so visitors can narrow a catalog, inspect details, and compare devices while retaining control of the decision.

## Solution and my contribution

I built the standalone collection tool and supplied the dataset used by PhoneDB. My documented application work includes database tooling and a later hardening pass across configuration, migrations, API validation and error handling, CSV ingestion, catalog/comparison flows, and a static showcase. The original nested application's complete authorship and team split are not established, so I describe my specific work rather than claiming sole ownership of every component.

## Technical architecture

The separate Python scraper uses requests, Beautiful Soup, lxml, typed validation, delayed HTTP requests, retries/backoff, and CSV/JSON export. PhoneDB begins at the dataset handoff: a seeder normalizes rows and processes them transactionally into MySQL. A typed Express API builds parameterized queries with allowlisted sorting and shared list/count filters. Next.js/React presents pagination, detailed records, and URL-addressable comparison of up to four devices.

## Key engineering work

Checksummed forward-only migrations stop on altered migration history. Database reset tooling is explicitly guarded and blocked in production. CSV seeding uses validation, lookup caching, and idempotent transactions. API paths validate IDs, ranges, pagination, and sort choices; deterministic ordering and distinct counts keep filtered pages consistent. Safe-read retry and error handling give the client recoverable failure states.

## Challenges and solutions

The first data collection missed prices, prompting a parser update and second collection. Ingestion separates source-oriented rows from normalized relational entities. Query validation and shared filter semantics address unsafe input and mismatched pagination. The scraper remains a separate project and is not represented as a continuous background crawler inside the web runtime.

## Technology stack

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS. **Backend:** Express, Node.js, typed REST endpoints. **Database:** MySQL 8, mysql2, forward-only migrations. **Collection:** Python, requests, Beautiful Soup, lxml, pytest. **Data:** CSV/JSON validation and transactional seeding.

## Results and limitations

The September 21, 2026 CSV snapshot has 4,144 rows, 72 columns, and 77 brand labels. The published dataset had 4,080 views and 938 downloads in the owner’s September 14 milestone. Downloads are not unique people or application usage. The data is historical rather than complete/current market coverage. The public showcase presents the project; it is distinct from a deployed Next.js/Express/MySQL runtime. Automatic ranking is a possible extension, not an implemented feature.
