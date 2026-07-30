/**
 * 30-day Mendix Developer interview-preparation plan (original content).
 * Ramp-up on days 1–5 (lighter), then ~2h/day. Rendered as an interactive
 * tracker in the app; per-day completion is saved per account.
 * Each drill question has a concise answer, revealed by the "Show answers" toggle.
 */

export interface Drill {
  q: string
  a: string
}

export interface PrepDay {
  day: number
  week: number
  title: string
  light?: boolean
  hours: string
  learn: string
  build: string
  drill: Drill[]
  selfTest?: string
}

export interface TopicArea {
  area: string
  items: string[]
}

export const WEEKS = [
  { n: 1, title: 'Foundations & ramp-up', color: '#22d3ee', days: 'Days 1–7' },
  { n: 2, title: 'Core deep-dive', color: '#a855f7', days: 'Days 8–14' },
  { n: 3, title: 'Advanced, adjacent & delivery', color: '#f59e0b', days: 'Days 15–21' },
  { n: 4, title: 'Interview readiness', color: '#ec4899', days: 'Days 22–30' },
]

export const PREP_DAYS: PrepDay[] = [
  { day: 1, week: 1, light: true, hours: '~1h', title: 'Orientation + Platform overview', learn: 'What Mendix is (low-code, model-driven). Platform: Studio Pro, Portal, Marketplace, Team Server, Mendix Cloud. Runtime architecture (client ↔ runtime server ↔ database); microflows (server) vs nanoflows (client).', build: 'Create a blank app; tour the App Explorer, modules, toolbox and error list.', drill: [
    { q: 'What is Mendix and why low-code?', a: 'A low-code, model-driven platform — you build apps visually and it generates the running app. Faster delivery, less boilerplate, business + IT collaboration.' },
    { q: 'Walk me through the Mendix architecture.', a: 'Client (UI + nanoflows) ↔ Runtime server (microflows/business logic) ↔ database. Microflows run on the server, nanoflows on the device.' },
    { q: 'Microflow vs nanoflow?', a: 'Microflow runs on the server with direct DB access; nanoflow runs on the client/device and works offline.' },
    { q: 'What does a module contain?', a: 'A domain model, pages, microflows, module roles and resources — a reusable, self-contained feature unit.' },
  ] },
  { day: 2, week: 1, light: true, hours: '~1h', title: 'Domain model fundamentals', learn: 'Entities, attribute types (String, Integer/Long, Decimal, Boolean, Enumeration, DateTime, AutoNumber, Hashed string, Binary), associations (1-1, 1-*, *-*, owner, Reference vs Reference set).', build: 'Model Customer–Order (1-*) and Order–Product (*-*).', drill: [
    { q: 'Explain the three association types.', a: 'One-to-one, one-to-many, many-to-many — derived from the Type (Reference vs Reference set) plus the Owner property.' },
    { q: 'Reference vs Reference set?', a: 'A Reference points to at most one object (1-1 / 1-*); a Reference set is the multi-valued many-to-many end.' },
    { q: 'Where is the foreign key stored in a one-to-many?', a: 'On the "many" side, which owns the association.' },
  ] },
  { day: 3, week: 1, light: true, hours: '~1.25h', title: 'Domain model advanced', learn: 'Generalization vs association (is-a vs has-a; what inherits — access rules do NOT). Delete behavior (keep/cascade/prevent). Persistable vs non-persistable. Indexes. Validation rules. System entities.', build: 'Add a generalization, set delete behavior, add an index and a validation rule.', drill: [
    { q: 'Generalization vs one-to-one association — when each?', a: 'Generalization for is-a inheritance and shared search/sort; a 1-1 association for high write volume or to extend a Marketplace module without changing it.' },
    { q: 'What are the delete-behavior options?', a: 'Keep the associated objects (default), delete them too (cascade), or prevent the delete if still associated (error).' },
    { q: 'When would you use a non-persistable entity?', a: 'For temporary in-memory data (wizard steps, calculations) that never needs saving to the database.' },
  ] },
  { day: 4, week: 1, light: true, hours: '~1.25h', title: 'Pages & UI basics', learn: 'Pages, layouts + placeholders, navigation & home page, data widgets (data view / list view / data grid) and their data sources (database / association / microflow / nanoflow).', build: 'Overview page (data grid of Customers) + detail page (data view).', drill: [
    { q: 'Data view vs list view vs data grid?', a: 'Data view = one object; list view = a list with a custom template; data grid = a searchable, sortable column table.' },
    { q: 'What is a layout/placeholder?', a: 'A layout is reusable page structure (nav/header); placeholders are the gaps pages fill with content.' },
    { q: 'What can a data view’s microflow source return?', a: 'A single object of the data view’s entity.' },
  ] },
  { day: 5, week: 1, light: true, hours: '~1.5h', title: 'Pages advanced + Atlas UI', learn: 'Snippet vs building block. Conditional visibility (attribute/role). Atlas UI, Theme Editor, design properties. Responsive navigation profiles. Page templates (wizard/login).', build: 'Reuse a snippet on two pages; hide a button by module role; restyle with design properties.', drill: [
    { q: 'Snippet vs building block?', a: 'A snippet is one reusable definition (edits propagate everywhere); a building block is copied onto the page and then edited independently.' },
    { q: 'How do you show a widget only to admins?', a: 'Set the widget’s conditional visibility to the Administrator module role.' },
    { q: 'What is a master layout?', a: 'A layout that another layout is based on.' },
  ] },
  { day: 6, week: 1, hours: '~2h', title: 'Microflows: fundamentals', learn: 'Activities (Create/Change/Commit/Retrieve/Delete/Show page), variables, exclusive split (decision), merge, sequence flow, commit vs Refresh in client.', build: 'Microflow that creates + commits an object and opens a confirmation page.', drill: [
    { q: 'Commit vs Refresh in client?', a: 'Commit saves to the database; Refresh in client pushes the change to open pages so the UI updates.' },
    { q: 'How many paths does a decision follow?', a: 'Exactly one — there is no inclusive split.' },
    { q: 'Retrieve by association vs from database?', a: 'By association avoids a query only if the object is already in memory; from database allows XPath constraints and sorting.' },
  ] },
  { day: 7, week: 1, hours: '~2h', title: 'Microflows: advanced', learn: 'Loops/iterators (break/continue), aggregates (count/sum/avg), list operations, sub-microflows, error handling (rollback / custom with & without rollback / continue), cast + inheritance split.', build: 'Loop over a list, aggregate a total, extract a sub-microflow, add error handling.', drill: [
    { q: 'Error-handling options and when to use each?', a: 'Rollback (revert + stop); custom with rollback (revert + error path); custom without rollback (keep + error path); continue (keep + silent — avoid).' },
    { q: 'What is the N+1 problem?', a: 'Retrieving inside a loop = one query per item; fix by retrieving the whole list once or over an association.' },
  ], selfTest: 'LearnMendix → Rapid + Microflows quizzes' },

  { day: 8, week: 2, hours: '~2h', title: 'Events & scheduled events', learn: 'Event handlers (before/after create/commit/delete/rollback), scheduled events (no params, full rights), intro to the Workflow engine.', build: 'Add a before-commit event that sets a field; create a scheduled event.', drill: [
    { q: 'Before-commit vs after-commit event?', a: 'Before-commit runs before saving (can validate/adjust or abort); after-commit runs once the object is persisted.' },
    { q: 'Constraints on a scheduled-event microflow?', a: 'No parameters, no user, runs with full rights on a time schedule.' },
  ] },
  { day: 9, week: 2, hours: '~2h', title: 'XPath deep-dive', learn: 'Constraint syntax, tokens ([%CurrentUser%], [%CurrentObject%], date tokens), association traversal (/), operators, functions (contains, starts-with), empty, where XPath is used.', build: 'Write 5 constraints: own-records, date range, traversal, contains, empty.', drill: [
    { q: 'How would you show a user only their own records?', a: 'An entity access rule with an XPath constraint such as [System.owner = current user].' },
    { q: 'Difference between / and //?', a: '// starts a query (all objects of an entity); / steps into a related entity, association or attribute.' },
  ] },
  { day: 10, week: 2, hours: '~2h', title: 'Security part 1 — roles & access', learn: 'Security levels (Off/Prototype/Production and what each enforces), user roles vs module roles (mapping in App Security), page access, microflow access.', build: 'Turn on Production security; create two module roles; grant page/microflow access.', drill: [
    { q: 'User role vs module role?', a: 'User roles (app level) bundle module roles (module level), which carry the actual page/microflow/entity access.' },
    { q: 'What does Prototype/Demo enforce?', a: 'Sign-in, page and microflow access — but not entity (data) access.' },
    { q: 'Why keep module roles separate?', a: 'So a module stays self-contained and reusable across apps and the Marketplace.' },
  ] },
  { day: 11, week: 2, hours: '~2h', title: 'Security part 2 — data & enterprise', learn: 'Entity access rules (CRUD + per-member + XPath row constraint), anonymous & demo users, SSO (SAML/OIDC), encryption, audit trails, secure REST.', build: 'Add an entity access rule with an owner XPath constraint; test with demo users.', drill: [
    { q: 'What is the real data guard vs page hiding?', a: 'Entity access rules — page hiding can be bypassed by deep links, so it isn’t security.' },
    { q: 'How does SSO work in Mendix?', a: 'SAML/OIDC via a Marketplace module; users authenticate at an identity provider and are mapped to user roles.' },
  ] },
  { day: 12, week: 2, hours: '~2h', title: 'Integration part 1 — REST', learn: 'Call REST service, published REST service, import/export mappings, JSON/XML structures, message definitions, OpenAPI/Swagger.', build: 'Consume a public REST API → import mapping → show the data on a page.', drill: [
    { q: 'How do you consume a REST API?', a: 'The Call REST service activity, then an import mapping to turn the JSON/XML response into Mendix objects.' },
    { q: 'Import vs export mapping?', a: 'Import = JSON/XML in → objects; export = objects → JSON/XML out.' },
    { q: 'How do you expose your app as an API?', a: 'A published REST service — resources/operations mapped to microflows, export mappings, secured with auth.' },
  ] },
  { day: 13, week: 2, hours: '~2h', title: 'Integration part 2 — SOAP, OData, Data Hub', learn: 'SOAP/WSDL, OData (BI/Excel/Power BI), Data Hub, published-service security, API auth (API key, OAuth), sync vs async, batching, error handling, webhooks.', build: 'Publish an OData service; register/consume a Data Hub dataset (or walk the docs flow).', drill: [
    { q: 'REST vs SOAP vs OData — when each?', a: 'REST modern/JSON; SOAP legacy/XML/WSDL; OData a queryable data feed (BI tools, other apps).' },
    { q: 'What is the Data Hub for?', a: 'A catalog of published OData datasets so apps can discover and reuse each other’s data.' },
    { q: 'How do you secure a published service?', a: 'Authentication (login / API key / OAuth), role-restricted operations, and HTTPS.' },
  ] },
  { day: 14, week: 2, hours: '~2h', title: 'Data management & OQL', learn: 'Retrieve db vs association, commit/rollback/transactions, OQL & datasets, caching, batch processing large volumes, object states.', build: 'Batch-process a large list with paging; write a simple OQL dataset.', drill: [
    { q: 'How do transactions work in a microflow?', a: 'A microflow runs in one transaction; an unhandled error rolls everything back unless you set custom error handling.' },
    { q: 'How do you process 100k records safely?', a: 'Batch and paginate — commit in chunks, avoid huge in-memory lists, run it as an async/scheduled job.' },
  ], selfTest: 'LearnMendix → Intermediate Security + Microflows + XPath quizzes' },

  { day: 15, week: 3, hours: '~2h', title: 'Java actions & extensibility', learn: 'Java actions (executeAction(), Runtime API — IContext, IMendixObject, Core), JavaScript actions (nanoflows/device), when to drop to code, javasource vs userlib.', build: 'Write a tiny Java action (e.g. string manipulation) called from a microflow.', drill: [
    { q: 'When do you use a Java action vs low-code?', a: 'Only when low-code or a Marketplace module can’t do it — complex algorithms, specific libraries, low-level operations.' },
    { q: 'Java vs JavaScript action?', a: 'Java runs on the server (Runtime API); JavaScript actions run in nanoflows on the client/device.' },
  ] },
  { day: 16, week: 3, hours: '~2h', title: 'Pluggable widgets, SDK & platform APIs', learn: 'Pluggable widgets (React), custom widgets, Platform SDK / Model SDK, Build/Deploy APIs.', build: 'Read the pluggable-widget docs; sketch a widget’s properties (or scaffold one).', drill: [
    { q: 'What is a pluggable widget?', a: 'A custom, React-based UI component with typed properties, reusable like a built-in widget.' },
    { q: 'What could you automate with the Model SDK?', a: 'Programmatic model changes — bulk edits, code generation, migrations, governance checks.' },
  ] },
  { day: 17, week: 3, hours: '~2h', title: 'Workflows', learn: 'Workflow engine, user tasks, context entity, decisions/parallel splits, timers, Workflow Commons, task/admin UIs.', build: 'Model a small approval workflow (submit → approve/reject).', drill: [
    { q: 'When would you use a Workflow vs a microflow?', a: 'Workflow for long-running, human-in-the-loop processes; microflow for short automated logic.' },
    { q: 'What is the workflow context?', a: 'The entity instance the workflow runs on (e.g. the request being approved).' },
  ] },
  { day: 18, week: 3, hours: '~2h', title: 'Performance & scalability', learn: 'Efficient retrieves/XPath, N+1, indexes, caching, paging/lazy loading, microflow profiling, horizontal scaling, APM, memory & long transactions.', build: 'Create an N+1 then fix it; add an index; profile a slow microflow.', drill: [
    { q: 'Your app is slow — how do you diagnose it?', a: 'Profile it / use APM to find the slow microflow or query; check for N+1 retrieves, missing indexes and over-large page lists.' },
    { q: 'How do you scale a Mendix app?', a: 'Optimize data access first, then scale horizontally (more runtime instances) with caching and async for heavy work.' },
  ] },
  { day: 19, week: 3, hours: '~2h', title: 'Mobile (native/PWA) & offline', learn: 'Native mobile, offline-first + sync, nanoflows on device, mobile-specific pages/profiles, PWA.', build: 'Add a phone profile + a nanoflow; skim the offline-sync docs.', drill: [
    { q: 'How does offline work in Mendix?', a: 'Offline-first: a data subset is stored on the device, nanoflows run locally, and changes sync to the server when online.' },
    { q: 'Why nanoflows for mobile/offline?', a: 'They run on the device without a server round-trip, so they work offline and feel fast.' },
  ] },
  { day: 20, week: 3, hours: '~2h', title: 'Version control, CI/CD, ALM & deployment', learn: 'Team Server (Git), branching/merging (merge feature branch vs advanced merge, tagged versions), environments (Test/Acceptance/Production), MDA packages, CI/CD (Build/Deploy APIs, pipelines), Mendix Cloud / private cloud / Kubernetes.', build: 'Create a branch, make a change, merge it; build a deployment package.', drill: [
    { q: 'Explain your branching strategy.', a: 'Keep main deployable; develop on feature branches and merge back (merge feature branch / advanced merge).' },
    { q: 'How does a Mendix CI/CD pipeline work?', a: 'A pipeline calls the Mendix Build/Deploy APIs to build/test/deploy, with quality gates that must pass before shipping.' },
    { q: 'Test → Acceptance → Production?', a: 'Promote a validated deployment package through test, then acceptance, then live.' },
  ] },
  { day: 21, week: 3, hours: '~2h', title: 'Testing, best practices & architecture', learn: 'Unit Testing module, ATS, test automation; best practices (naming, modularization, security-by-design); app architecture (single vs multi-app, microservices, shared services via Data Hub).', build: 'Write a unit test; refactor a module for cleaner naming/structure.', drill: [
    { q: 'How do you test a Mendix app?', a: 'Unit Testing module for microflows, ATS for UI/regression, the consistency check, reviews, and demo-user security tests.' },
    { q: 'How do you structure a large app?', a: 'Modularize by feature with clean boundaries; consider multi-app/microservices with shared data via the Data Hub.' },
  ], selfTest: 'LearnMendix → full mock exam (50 questions)' },

  { day: 22, week: 4, hours: '~2h', title: 'Adjacent tech refresh', learn: 'OOP/programming fundamentals, Java basics (for Java actions), SQL basics (SELECT/JOIN/WHERE ≈ OQL/XPath), REST/HTTP/JSON, Git basics.', build: 'Quick exercises: write a SQL join; make a REST call in Postman/curl; do a git branch + merge.', drill: [
    { q: 'What is a foreign key?', a: 'A column referencing another table’s primary key — the relational equivalent of a Mendix association’s reference.' },
    { q: 'GET vs POST?', a: 'GET reads data (safe, cacheable); POST sends/creates data with a request body.' },
    { q: 'What is JSON?', a: 'A lightweight text format of key–value pairs and arrays used to exchange data.' },
    { q: 'What is a merge conflict?', a: 'When two branches change the same thing and version control needs you to choose which change wins.' },
  ] },
  { day: 23, week: 4, hours: '~2h', title: 'Agile/Scrum & Mendix delivery', learn: 'Scrum roles (PO / Scrum Master / Developers = Business Engineers), ceremonies, story points, Sprintr/Portal, feedback widget, Mendix delivery methodology.', build: 'Write 3 user stories with acceptance criteria for a feature.', drill: [
    { q: 'Walk me through your Agile process.', a: 'A prioritized backlog owned by the PO; sprints with planning, daily stand-up, review and retro; stories estimated in points.' },
    { q: 'How do you handle changing requirements mid-sprint?', a: 'New requests go to the PO and onto the backlog for a future sprint; the current sprint stays stable.' },
  ] },
  { day: 24, week: 4, hours: '~2h', title: 'Certifications & Marketplace ecosystem', learn: 'Cert path (Rapid → Intermediate → Advanced → Expert). Common Marketplace modules: Community Commons, Excel importer/exporter, Deep Link, Encryption, MendixSSO/SAML, Email connector, Workflow Commons, Data Widgets.', build: 'List the Marketplace modules you’ve used with one line on each.', drill: [
    { q: 'Which Marketplace modules have you used?', a: 'Name real ones — e.g. Community Commons, Excel importer, Deep Link, Encryption, MendixSSO, Email, Workflow Commons — and what for.' },
    { q: 'How do you evaluate a module for production?', a: 'Check its support/rating, maintenance, version compatibility, security and licensing before relying on it.' },
  ] },
  { day: 25, week: 4, hours: '~2h', title: 'Behavioral & HR prep', learn: 'STAR method. Prep the classics (why leaving, strengths/weaknesses, notice period, salary) — keep answers positive and specific.', build: 'Write out 5 STAR stories: a hard bug, a conflict, a tight deadline, a proud project, a failure/learning.', drill: [
    { q: 'Tell me about yourself (60–90s).', a: 'A crisp pitch: Mendix developer, ~2 yrs, GRC/TPRM domain, what you build, and what you’re looking for.' },
    { q: 'Why are you leaving?', a: 'Frame positively — growth, scope, new challenges; never bash the current employer.' },
    { q: 'Greatest strength / weakness?', a: 'A real strength with an example; a genuine weakness plus how you’re actively improving it.' },
  ] },
  { day: 26, week: 4, hours: '~2h', title: 'Project deep-dives (your work)', learn: 'For each project (VerifAI, GRC/TPRM apps): the business problem, your role, domain model + key microflows + security + integrations, challenges, decisions, measurable impact.', build: 'Write a one-page brief per project you can speak to for 5 minutes.', drill: [
    { q: 'Tell me about a Mendix project you’re proud of.', a: 'Use STAR: problem → your role → what you built (domain/microflows/security/integration) → the impact.' },
    { q: 'What was the hardest technical problem you solved?', a: 'Pick one real problem; explain the constraint, your approach, and the result.' },
  ] },
  { day: 27, week: 4, hours: '~2h', title: 'System / app design scenarios', learn: 'Approach every design as: domain model → microflows → security → integration → UI.', build: 'Design end-to-end: (1) a leave-management app, (2) a GRC risk register / vendor-risk (TPRM) module — your home turf, (3) order-management with an external payment API.', drill: [
    { q: 'Design a leave-management app.', a: 'Entities: Employee, LeaveRequest, LeaveType; microflows to submit/approve; role-based access; list+detail UI; optional calendar/HR integration.' },
    { q: 'Design a GRC risk register in Mendix.', a: 'Entities: Risk, Control, Assessment, Owner; microflows for scoring + approval workflow; role-based access; dashboards; OData/export for reporting.' },
  ] },
  { day: 28, week: 4, hours: '~2h', title: 'Live modeling / build under pressure', learn: 'Some interviews screen-share a live build — practice narrating your reasoning as you model.', build: 'Time yourself building a small feature end-to-end: entity + page + microflow + a security rule + a validation.', drill: [
    { q: 'Narrate every step out loud as you build.', a: 'Say what and why: "I’ll add the entity… now a microflow to commit… a security rule so only the owner can edit…".' },
  ] },
  { day: 29, week: 4, hours: '~2h', title: 'Full mock interview', learn: 'Run it like the real thing, then review honestly.', build: '45 min technical (mixed Topic Bank questions) + 20 min behavioral + one design prompt. Record it; score yourself; list every stumble.', drill: [
    { q: 'Answer 15 mixed technical questions cold.', a: 'Use the Q&A tab and Topic Bank; aim for a crisp descriptive answer plus a simple restatement each time.' },
  ], selfTest: 'LearnMendix mock exam — aim ≥ 80%' },
  { day: 30, week: 4, hours: '~2h', title: 'Weak-area blitz + logistics', learn: 'Prep questions to ask the interviewer; set a company-research routine (product, tech stack, Glassdoor, interviewer LinkedIn).', build: 'Hammer your weak-spot list from Days 1–29; re-read your resume so every line has a story.', drill: [
    { q: 'Re-answer your 10 shakiest questions.', a: 'Pull from your weak-spot note and re-answer each until it comes out smooth and confident.' },
  ] },
]

export const TOPIC_BANK: TopicArea[] = [
  { area: 'Platform & architecture', items: ['Low-code / model-driven — pros & cons', 'Studio Pro, Portal, Marketplace, Team Server, Cloud', 'Runtime architecture: client, runtime server, database', 'The model (.mpr); versions/LTS'] },
  { area: 'Domain model', items: ['Entities, attribute types, AutoNumber, calculated vs stored', 'Associations 1-1/1-*/*-*, owner, Reference vs Reference set', 'Generalization vs association; what inherits (not access rules)', 'Delete behavior; persistable vs non-persistable; indexes; validation; system members'] },
  { area: 'Pages & UI', items: ['Data view / list view / data grid + data sources', 'Layouts, placeholders, master layout, navigation profiles', 'Snippet vs building block; conditional visibility', 'Atlas UI, theming, design properties, page templates, pluggable widgets'] },
  { area: 'Microflows & nanoflows', items: ['Activities, splits/merges, loops, aggregates, list operations', 'Sub-microflows, cast + inheritance split', 'Error handling & transactions; events; scheduled events', 'Microflow (server) vs nanoflow (client/offline)'] },
  { area: 'XPath & OQL', items: ['Constraints, tokens, operators, functions, traversal, empty', 'Where XPath is used; XPath vs OQL; OQL datasets'] },
  { area: 'Security', items: ['Levels Off/Prototype/Production', 'User roles vs module roles', 'Entity access (CRUD + member + XPath); page & microflow access', 'Anonymous & demo users; SSO (SAML/OIDC); encryption; audit'] },
  { area: 'Integration', items: ['REST consume/publish, SOAP/WSDL, OData, Data Hub', 'Import/export mappings; JSON/XML structures; message definitions', 'Auth (API key, OAuth, SSO); sync vs async; webhooks; OpenAPI'] },
  { area: 'Extensibility', items: ['Java actions (Runtime API, executeAction, IContext/IMendixObject/Core)', 'JavaScript actions; pluggable/custom widgets (React)', 'Platform SDK / Model SDK; Build/Deploy APIs'] },
  { area: 'Data & performance', items: ['Retrieve db vs association; commit/rollback; caching; paging; batch', 'N+1; indexes; profiling; horizontal scaling; APM; memory'] },
  { area: 'Workflows', items: ['Engine; user tasks; context entity; decisions/parallel; timers; Workflow Commons'] },
  { area: 'Mobile & offline', items: ['Native mobile; PWA; offline-first + sync; nanoflows on device; mobile profiles'] },
  { area: 'ALM, CI/CD & deployment', items: ['Team Server/Git; branching/merging; tagged versions', 'Environments (T/A/P); MDA packages; CI/CD pipelines; Cloud / private / Kubernetes'] },
  { area: 'Testing & quality', items: ['Unit Testing module; ATS; test automation; consistency check; reviews'] },
  { area: 'Best practices & architecture', items: ['Naming; modularization; single vs multi-app; microservices; shared services via Data Hub; security-by-design'] },
  { area: 'Agile & process', items: ['Scrum roles/ceremonies; Business Engineers; story points; Sprintr; feedback; delivery methodology'] },
  { area: 'Marketplace ecosystem', items: ['Community Commons, Excel importer/exporter, Deep Link, Encryption, MendixSSO/SAML, Email, Workflow Commons, Data Widgets'] },
]

export const BEHAVIORAL: string[] = [
  'Tell me about yourself (a 60–90s pitch — Mendix + GRC domain + 2 yrs).',
  'Why are you leaving your current role? (Keep it positive — growth/scope; never bash.)',
  'Why Mendix / why this company?',
  'A challenging bug or problem you solved. (STAR)',
  'A time you disagreed with a teammate / handled conflict. (STAR)',
  'A tight deadline or high-pressure delivery. (STAR)',
  'A failure and what you learned. (STAR)',
  'Your greatest strength / greatest weakness.',
  'How do you handle changing requirements?',
  'How do you stay up to date with Mendix?',
  'Where do you see yourself in 2–3 years?',
  'Notice period? (30 days, negotiable.) · Current & expected CTC?',
  'Do you have any questions for us? (Always yes — see the questions to ask.)',
]

export const EDGE: string[] = [
  'GRC / TPRM domain depth (third-party risk, compliance, audit) — rare for a junior Mendix dev. Frame yourself as understanding the business, not just the tool.',
  'Project talking points: VerifAI and your GRC/TPRM apps — for each, know problem → your role → domain model + key microflows + security + integrations → challenge → impact.',
  '2 years, continuous (Jun 2024–present, no gaps) — steady hands-on delivery.',
  'Full-stack adjacency (Python/React/JS) — you can go beyond low-code (Java/JS actions, custom widgets).',
  'Currently pursuing the Intermediate certification — signals initiative (an employer may fund it).',
]

export const ASK: string[] = [
  'What does the Mendix team/setup look like (size, seniority, Business Engineers)?',
  'Which Mendix version and deployment (Mendix Cloud / private / on-prem / Kubernetes)?',
  'What is the branching & release process (CI/CD, environments)?',
  'What kinds of apps / domains will I work on?',
  'How do you approach integrations and testing?',
  'What does growth look like — certifications, mentorship, path to Advanced/Expert?',
  'What are the biggest technical challenges the team faces right now?',
]

export const PREP_TOTAL = PREP_DAYS.length
