# GitHub-Based Skills Inventory for Work Portfolio
**Account:** [razibit](https://github.com/razibit)  
**Inventory date:** 22 October 2026  
**Purpose:** Master skill catalogue to support the work portfolio, professional résumés, and project case studies.

## Audit coverage and interpretation

The connected GitHub account exposes **31 repositories**, including the private `career-knowledge-base`. The review traversed the recursive default-branch file trees of all 31 repositories, extracted the skills and technologies from all 12 canonical Career Knowledge Base project records, read the professional master CV and existing work-portfolio content, and inspected selected READMEs, manifests, source files, and application architectures.

**This is not an every-line inspection of all repository files, historical branches, commits, binaries, notebooks, or archives.** Therefore it is a **comprehensive, evidence-informed skills inventory**, not a certification of mastery or exclusive personal authorship. The source may show a technology in code, documentation, configuration, coursework, or a collaborative project; those are different levels of evidence. Verify individual ownership where appropriate.

**Evidence tiers:** 
- **Strong project evidence:** central to a substantial implementation or repeatedly demonstrated.
- **Project evidence:** visible in a project or its code, but not necessarily a principal specialty.
- **Exploratory/conditional:** learning exercise, conditional service, historic integration, configuration, or not individually attributed. Don't present as core expertise without further confirmation.

## A. Complete skill taxonomy

### A1. Programming and markup
| Skill | Representative evidence | Positioning |
|---|---|---|
| TypeScript | DenZo, Serendiply, iLoveMd, PhoneDB, Meal App, portfolio | Strong project evidence |
| JavaScript / Node.js | DenZo, Serendiply, Lotus Lantern, Cashew Desktop | Strong project evidence |
| Python | HPE Research, Text Moderation, Scraper, Senfai, Domain Intelligence, Research Vault | Strong project evidence |
| SQL | DenZo, PhoneDB, Meal App, Domain Intelligence, Senfai, Research Vault | Strong project evidence |
| Rust | Domain Intelligence Rust implementation | Project evidence |
| C | Compiler Construction project (Flex/Bison/GCC) | Project evidence |
| C++ | Algorithms, DSA Essentials, Cpp-Program | Coursework evidence |
| C# | AlwaysOnTop .NET/WPF application | Project evidence |
| Java | Trackese Swing desktop attendance app | Project evidence |
| HTML, CSS | Frontend/desktop/extension projects | Strong project evidence |
| Bash, PowerShell | Linux utility, deployment/setup scripts, Windows tooling | Project evidence |

### A2. Frontend development and browser applications
React; Next.js; Vite; React Router; Tailwind CSS; Zustand; TanStack Query; interactive forms and dashboards; responsive UI; light/dark themes; accessibility-oriented UI; server-rendered and static Next.js sites; API-connected interfaces; client-side caching/state; CodeMirror; Tiptap; Fabric.js; Markdown rendering; unified/remark/rehype; KaTeX; Mermaid; Shiki; Plotly.js; Chart.js; browser-local exports (PDF/PNG/HTML); client-side HTML sanitization; document snapshots and revision-aware rendering; Progressive Web Apps; Workbox; service workers; browser extension manifest/background/content/popup scripts.

**Representative projects:** DenZo, iLoveMd, Mess Meal Management, PhoneDB, Senfai Terminal, Cashew Desktop, UhmegleSense, work and academic portfolio repositories.

### A3. Backend, API and software architecture
Node.js; NestJS; Express; FastAPI; Flask; service-oriented/multi-service architectures; backend-for-frontend routes; REST API design; validated request/response schemas; Zod; Pydantic; OpenAPI-generated types; authentication sessions; HTTP gateways; service-to-service communication; API middleware; error handling; retry and timeout policies; webhook ingestion/verification; presigned object-storage uploads; concurrency-aware workflow design; asynchronous/background execution; HTTP streaming; export endpoints; typed API contracts.

**Representative projects:** DenZo, Serendiply, PhoneDB, Senfai, Domain Intelligence, JEV Playground, AI Text Moderation.

### A4. Data storage and database engineering
PostgreSQL; MySQL; SQLite; APSW; SQLx; Redis; Supabase; MongoDB (limited/selected Serendiply paths); IndexedDB; better-sqlite3; relational schema design; SQL migrations; migration checksums; indexes/queries; parameterized SQL; SQL transactions; row-level security; database-backed cutoff enforcement; database-backed queues and jobs; atomic claim/lease management; durable checkpoints; reconciliation; database outbox pattern; database backup and restore; SQLite FTS5 search; import/export; CSV-based persistence; JSON/JSONL; SQL ingestion and validation.

### A5. Real-time, distributed and networked systems
WebRTC; Socket.IO; WebSocket sessions; server-sent events (SSE); WebRTC signaling; Redis atomic matchmaking; session coordination and disconnect recovery; event-driven workflows; Azure Service Bus; transactional event publishing/outboxes; message replay; retry-safe/idempotent operations; optimistic/transactional consistency; distributed worker job leasing; throttling and quotas; HTTP requests and signed callbacks; UDP/DDP networking; Bluetooth Low Energy.

**Representative projects:** Serendiply, DenZo, Senfai Terminal, Domain Intelligence, Lotus Lantern.

### A6. Cloud, deployment and software delivery
Azure Container Apps; Azure Container Registry; Azure Database for PostgreSQL; Azure Service Bus; Azure Identity; Azure Log Analytics (documented infrastructure); Cloudflare R2; Cloudflare edge/DNS; Cloudflare Workers (project deployment); Google Cloud Run/Cloud SQL/Artifact Registry/Secret Manager/Pub/Sub (**historical or configured**); Docker; Docker Compose; GitHub Actions; CI/CD pipelines; release and deployment scripting; environment configuration; pnpm; Turborepo; npm; Git; build pipelines; static export; GitHub Pages; Electron packaging; shell/PowerShell automation.

**Important:** An AWS S3 SDK used against Cloudflare R2 is not evidence of AWS cloud hosting. A configured service is not proof that it is currently running in production.

### A7. Identity, security, safety and reliability
Better Auth; Supabase Auth; OAuth/Google OAuth (conditionally configured in DenZo); verification and OTP flows; BulkSMSBD integration; access control; role-/permission-based authorization; customer/seller/admin isolation; signed actor context; SQL parameterization; request validation; rate limiting; input allowlisting; HTML sanitization; private media access; R2 presigned upload; signed webhooks; idempotency keys; duplicate callback recovery; authorization checks; credential separation; safe error handling; reliability and reconciliation logic; client/server trust boundaries; moderated image/chat/report flows.

**Representative projects:** DenZo, Serendiply, Meal App, Domain Intelligence, Senfai, iLoveMd.

### A8. Commerce, platform and third-party integration engineering
Multi-vendor marketplace architecture; customer/seller/admin web applications; seller onboarding; catalog and variants; inventory reservation; server-side price revalidation; multi-seller checkout; seller suborders; order lifecycle; SSLCommerz payment initiation/verification; Pathao shipping and webhook flows; seller commissions; ledger and double-entry validation; payment and inventory reconciliation; seller ownership checks; product reviews/moderation; campaign links; attribution/analytics; search and content publishing; email and SMS delivery.

**Representative project:** DenZo. Finance posting/refund/payout modules had gated rollout; don't claim live financial throughput.

### A9. AI, ML and inference
Python ML experimentation; PyTorch; TensorFlow/Keras (**learning projects**); scikit-learn; Hugging Face Transformers; CNN architectures; ConvNeXt-Base; MediaPipe Pose; visual feature extraction; pose landmarks and geometric measurements; multi-task prediction; feature fusion; BERT-Tiny fine-tuning; TF-IDF/logistic-regression baselines; class weights; supervised text classification; model evaluation; train/validation/test splits; multi-seed experiments; loss/accuracy/F1/confusion-matrix analysis; ONNX export; ONNX Runtime Web; browser inference; TensorFlow.js / NSFW.js / BlazeFace client-side detection (**Serendiply browser safety flows, not guaranteed moderation**).

**Representative projects:** HPE Research, AI Text Moderation, Serendiply, 100 Days of AI.

### A10. NLP, generative AI and evaluation integrations
Text preprocessing; NLTK; tokenization; stemming; lemmatization; stopword removal; POS tagging; named entity recognition; bag-of-words; TF-IDF; Word2Vec exercises; transformer models; BERT-Tiny; prompt and model interface integration; OpenRouter API; Vercel AI Gateway and `typesafe-ai/jev`; structured Boolean/choice/score evaluation requests; Gemini API experimentation notebook.

**Evidence tier caveat:** NLTK exercises and Gemini experimentation support learning exposure. The repository name `Generative-AI-Langchain-and-Huggingface` alone does *not* establish LangChain proficiency.

### A11. Web scraping, datasets and analytics
`requests`; Beautiful Soup; lxml; urllib3; HTTPX; pagination/listing discovery; HTML parsing; bounded retries/backoff; rate limiting; data extraction and normalization; structured record validation; CSV/JSON/JSONL export; PostgreSQL/MySQL ingestion; pandas; NumPy; Matplotlib; seaborn (**research/notebook use**); data cleaning; reproducible dataset creation; Kaggle dataset publication; source provenance; dataset metrics.

**Representative projects:** Smartphone Specs Scraper (4,144-row downstream catalog), PhoneDB, research notebooks, Research Vault, Domain Intelligence.

### A12. Research engineering, scholarly data and experimentation
Research prototype development; annotated image datasets; evaluation protocols; multi-task comparisons; replicable experiments; scientific writing/presentation; literature discovery; Crossref; OpenAlex; official proceedings metadata; citation graph exploration; PyMuPDF; PyMuPDF4LLM; structured PDF/HTML/JATS text ingestion; source hashes; per-page provenance; SQLite full-text retrieval; metadata deduplication; research review ledgers; source validation; evidence-based screening; reproducibility and limitation reporting.

**Important:** The Research Vault's automatic scientific-judgment and paid conversion pipelines are disabled or retired. A supported workflow is not a proven scientific result.

### A13. Systems, desktop, devices and compilers
Rust (Tokio, Axum, SQLx, reqwest, Clap, serde, tracing); Python CLI packaging; PostgreSQL multiworker and SQLite local-worker models; HTTP bearer-token authorization; resumable queue design; C# and .NET 8; WPF; Win32/PInvoke; Windows window enumeration/Z-order; Electron; IPC/contextBridge; `better-sqlite3`; Java Swing; Windows BLE (`noble-winrt`); local UDP/DDP; Ubuntu GTK; Linux backlight/sysfs; `xrandr`; `brightnessctl`; udev/ACPI/GRUB troubleshooting; JavaScript Chrome extensions; Flex; Bison; lexical analysis; LALR parsing; AST; symbol tables; semantic analysis; three-address intermediate code; Make/GCC/WSL.

### A14. Algorithms and core CS
Breadth-first search; graphs; stacks; linked lists; pointers; Prim's algorithm; Floyd–Warshall; heapsort; greedy fractional knapsack; basic data structures; parsing/compilers; concurrency control; API contract design; structured error recovery. Core algorithm files mostly show coursework and practice, not production algorithm specializations.

### A15. Testing, quality assurance and tooling
pytest; Jest; Vitest; React Testing Library; Playwright; browser smoke/acceptance tests; integration and fixture-based tests; API tests; migration/backup tests; synthetic benchmarks; reproducible experiment reports; linting, TypeScript type checking, ESLint, Prettier, Ruff; GitHub Actions; CI checks; vulnerability/dependency inventory; architecture documentation; source-level debugging; trace-based investigation; evidence/claim boundary documentation.

### A16. Professional and product competencies
Solo founding-engineer ownership; translating product requirements into implementation; cross-stack engineering; end-to-end feature delivery; technical decision-making; product workflow design; debugging and systems thinking; troubleshooting; third-party integration planning; startup execution; cost and operational trade-offs; documentation; technical communication; research presentation; data-driven evaluation.

**Do not promote unsupported claims of managing a large engineering team, revenue growth, millions of users, guaranteed AI safety, or high-scale production operations.**

## B. Recommended portfolio skills display

Use a compact main section with these **technology-only** badge groups. Keep implementation capabilities primarily in project case studies.

| Display group | Recommended badges |
|---|---|
| Languages | TypeScript, JavaScript, Python, SQL, Rust, C, C++, C#, Java |
| Frontend | React, Next.js, Tailwind CSS, Vite, Zustand, TanStack Query, CodeMirror |
| Backend | Node.js, NestJS, Express, FastAPI, Flask, REST APIs |
| Databases | PostgreSQL, MySQL, SQLite, Redis, Supabase, MongoDB, IndexedDB |
| Cloud & DevOps | Azure, Cloudflare, Docker, GitHub Actions, Git, pnpm, Turborepo |
| Real-Time & APIs | WebRTC, Socket.IO, WebSockets, Azure Service Bus, SSLCommerz, Pathao |
| AI & ML | PyTorch, scikit-learn, Hugging Face, MediaPipe, ONNX, ONNX Runtime Web |
| Testing | Playwright, pytest, Jest, Vitest, React Testing Library |
| Additional | Electron, .NET, WPF, Java Swing, Flex, Bison, Beautiful Soup, pandas |

The shortest website variant can reduce each group to 4–7 badges and surface specialized badges alongside relevant projects instead.

## C. Repository audit matrix

The current linked account showed these 31 repositories. The observation records source-tree and selected-source review; not every file was individually read.

| Repository | What it adds to the skill inventory | Visibility |
|---|---|---|
| [Cpp-Program](https://github.com/razibit/Cpp-Program) | Introductory C++, ML notebooks / experiments | Public |
| [DSA-Essentials](https://github.com/razibit/DSA-Essentials) | C++ graphs, pointers, linked lists, stacks | Public |
| [razibit.github.io](https://github.com/razibit/razibit.github.io) | Next.js static portfolio, content system, GitHub Pages | Public |
| [Algorithms](https://github.com/razibit/Algorithms) | C++/Python algorithms | Public |
| [razibit](https://github.com/razibit/razibit) | GitHub profile README | Public |
| [Generative-AI-Langchain-and-Huggingface](https://github.com/razibit/Generative-AI-Langchain-and-Huggingface) | NLP, NLTK, Python/pandas notebooks | Public |
| [100-Days-of-AI](https://github.com/razibit/100-Days-of-AI) | TensorFlow/Keras, CNN/MNIST, linear regression learning | Public |
| [Object-Oriented-Programming](https://github.com/razibit/Object-Oriented-Programming) | Contains license only; no skills verified | Public |
| [Personal-Toolbox](https://github.com/razibit/Personal-Toolbox) | HTML/JavaScript interactive financial calculations | Public |
| [Trackese-Smart-Attendance-Tracker](https://github.com/razibit/Trackese-Smart-Attendance-Tracker) | Java, Swing, CSV persistence | Public |
| [uhmegleSense](https://github.com/razibit/uhmegleSense) | Browser extension, DOM automation, notifications | Public |
| [Serendiply](https://github.com/razibit/Serendiply) | WebRTC, Redis/Socket.IO, real-time web, moderation | Private |
| [Smartphone-Recommendation-WebApp](https://github.com/razibit/Smartphone-Recommendation-WebApp) | React, Express, MySQL, catalog ingestion, SQL | Public |
| [Brightness-Controller-Ubuntu-24-LTS](https://github.com/razibit/Brightness-Controller-Ubuntu-24-LTS) | Linux system administration and GTK/Python utility | Public |
| [meal-app](https://github.com/razibit/meal-app) | Supabase, PWA, PostgreSQL and meal cutoff workflows | Public |
| [AI-Text-Moderation-Model](https://github.com/razibit/AI-Text-Moderation-Model) | NLP, transformers, scikit-learn, Flask | Private |
| [AlwaysOnTop](https://github.com/razibit/AlwaysOnTop) | C#, WPF, Win32 window management | Public |
| [cashew-desktop](https://github.com/razibit/cashew-desktop) | Electron, SQLite, Chart.js, local-first desktop | Public |
| [DenZo](https://github.com/razibit/DenZo) | Full-stack, marketplace, multi-service backend, cloud and payments | Private |
| [HPE-Research](https://github.com/razibit/HPE-Research) | Computer vision, PyTorch, ONNX, model evaluation | Private |
| [Lotus-Lantern-for-Windows-PC](https://github.com/razibit/Lotus-Lantern-for-Windows-PC) | Bluetooth LE, UDP/DDP, Windows integrations | Public |
| [CC-Lab-Project-razibit-and-the-tokenizers](https://github.com/razibit/CC-Lab-Project-razibit-and-the-tokenizers) | Flex/Bison, C, parsing, intermediate code | Public |
| [ilovemd](https://github.com/razibit/ilovemd) | Markdown editor, IndexedDB, browser export | Public |
| [academic](https://github.com/razibit/academic) | Next.js academic portfolio implementation; placeholder content must not be treated as personal achievements | Public |
| [smartphone-specs-scraper](https://github.com/razibit/smartphone-specs-scraper) | Python scraping, validation, CSV/JSON, testing | Public |
| [senfai-terminal](https://github.com/razibit/senfai-terminal) | FastAPI, APSW/SQLite, React market terminal, provider integration | Private |
| [career-knowledge-base](https://github.com/razibit/career-knowledge-base) | Twelve canonical career/project records and project evidence | Private |
| [jev-playground](https://github.com/razibit/jev-playground) | TypeScript/Vite, AI evaluation API, server credential handling | Public |
| [HPE-Folder-Backup](https://github.com/razibit/HPE-Folder-Backup) | Research presentation/archival assets; not independent code skills | Private |
| [domain-intelligence](https://github.com/razibit/domain-intelligence) | Rust/Axum/Tokio/SQLx, Python CLI, resilient jobs and API | Private |
| [research-vault](https://github.com/razibit/research-vault) | Scholarly retrieval, SQLite, PDF handling, data provenance | Private |

## D. Important omissions in current work portfolio

The current [content/skills.toml](https://github.com/razibit/razibit.github.io/blob/master/content/skills.toml) contains only:

- Frontend: React, Next.js, TypeScript
- Backend: Node.js, REST APIs, PostgreSQL
- Delivery: Git, Testing, Accessibility

It does **not** represent the full skills inventory. Especially underrepresented are NestJS, Redis, MySQL, Docker, Azure, Cloudflare, WebRTC, Socket.IO, Supabase, Python/data tooling, ML/ONNX, Playwright, Rust, FastAPI, Electron, WPF and cross-service integration engineering.

## E. Publication safeguards

1. **Private repositories:** DenZo, Serendiply, HPE-Research, AI Text Moderation, Senfai Terminal, Career Knowledge Base, Domain Intelligence, Research Vault, and HPE backup are private. GitHub links to them will not serve unauthenticated recruiters. Publish safe case-study descriptions or redacted examples instead.
2. **No fabricated proficiency:** The same badge list does not establish equal ability in TypeScript, Rust and C#. Put the strongest stacks first.
3. **Evidence boundaries:** Distinguish configured services and prototypes from active production usage. No claim of live exchange execution, trading profitability, enterprise-scale traffic, or proven moderation effectiveness.
4. **No false academic or portfolio content:** Some portfolio files are placeholders. Their fictional awards, positions, publications or sample projects are not career evidence.
5. **Version freshness:** The Career Knowledge Base canonical project records primarily reflect September 2026. The October code inventory reveals newer projects worth formally recording.
6. **Keep badge UI clean:** Technologies belong in compact grouped badges. Methods and engineering achievements should primarily be described through case studies.

## F. Career Knowledge Base records to add or expand

High-value additional records currently underrepresented in the 12 canonical project records:

- Senfai Research Terminal — recent Python/FastAPI/React/SQLite work
- Domain Intelligence — Rust and Python domain-research system
- Research Vault — research literature and provenance software
- JEV Playground — generative-AI evaluation interface
- AlwaysOnTop — C#/.NET WPF Windows utility
- Cashew Desktop — Electron/SQLite personal finance app
- UhmegleSense — browser extension and automation
- Professional and academic portfolio codebases — static-site architecture and content publishing
- Selected C++/DSA, TensorFlow/Keras and NLTK learning repositories — record separately as practice/learning, not production experience

**Best positioning:** full-stack / product engineering is the primary professional narrative, backend architecture and data correctness the differentiating capability, and AI/ML + systems engineering complementary evidence. This is a recommended marketing hierarchy, not a constraint on future specialization.
