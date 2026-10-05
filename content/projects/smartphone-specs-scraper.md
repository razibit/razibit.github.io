---
title: "Smartphone Specs Scraper — Python Data Collection for Structured Phone Catalogs"
label: "Data collection tool"
summary: "A Python CLI for discovering smartphone listings, extracting specifications and prices, and exporting validated CSV/JSON."
role: "Scraper creator"
contribution: "Collection, validation, CSV/JSON exports, fixtures, and packaging."
stack: "Python · requests · Beautiful Soup · pytest"
outcome: "Supplied PhoneDB’s dataset; a September 2026 milestone recorded 938 Kaggle downloads."
featured: false
order: 8
repository: "https://github.com/razibit/smartphone-specs-scraper"
---

*A repeatable collection path from catalog pages to validated records.*

## Project header

**Category:** Data collection tool. **Role:** Scraper creator. **Timeline:** Initial collection July 2025; packaging/refinement September 2026. **Status:** Implemented CLI with fixture-backed tests.

## Problem, solution, and contribution

PhoneDB needed a structured source dataset rather than manually copied specifications. I built the scraper and performed two collection passes; the first omitted prices and the second captured the intended scope. The pipeline separates URL discovery, detail parsing, HTTP transport, validation, progress/logging, and export.

## Architecture and engineering

Python requests/urllib3 provide delayed, retrying transport with exponential backoff. Beautiful Soup/lxml parse listings and detail pages. Typed records are validated and written to timestamped CSV/JSON. CLI options bound runs and pagination start points. pytest fixtures and mocks allow deterministic checks while live price tests remain opt-in. It is a separate upstream tool rather than an embedded PhoneDB service.

## Results and limitations

The handoff supplies PhoneDB’s historical 4,144-row snapshot. A September 14, 2026 owner-reported Kaggle milestone records 4,080 views and 938 downloads. Those are dataset counters and not unique users. Source HTML and availability can change; continuous freshness and complete market coverage are not claimed.
