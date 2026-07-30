/**
 * 30-day Mendix Developer interview-preparation plan (original content).
 * Ramp-up on days 1–5 (lighter), then ~2h/day. Rendered as an interactive
 * tracker in the app; per-day completion is saved per account.
 */

export interface PrepDay {
  day: number
  week: number
  title: string
  light?: boolean
  hours: string
  learn: string
  build: string
  drill: string[]
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
  { day: 1, week: 1, light: true, hours: '~1h', title: 'Orientation + Platform overview', learn: 'What Mendix is (low-code, model-driven). Platform: Studio Pro, Portal, Marketplace, Team Server, Mendix Cloud. Runtime architecture (client ↔ runtime server ↔ database); microflows (server) vs nanoflows (client).', build: 'Create a blank app; tour the App Explorer, modules, toolbox and error list.', drill: ['What is Mendix and why low-code?', 'Walk me through the Mendix architecture.', 'Microflow vs nanoflow?', 'What does a module contain?'] },
  { day: 2, week: 1, light: true, hours: '~1h', title: 'Domain model fundamentals', learn: 'Entities, attribute types (String, Integer/Long, Decimal, Boolean, Enumeration, DateTime, AutoNumber, Hashed string, Binary), associations (1-1, 1-*, *-*, owner, Reference vs Reference set).', build: 'Model Customer–Order (1-*) and Order–Product (*-*).', drill: ['Explain the three association types.', 'Reference vs Reference set?', 'Where is the foreign key stored in a one-to-many?'] },
  { day: 3, week: 1, light: true, hours: '~1.25h', title: 'Domain model advanced', learn: 'Generalization vs association (is-a vs has-a; what inherits — access rules do NOT). Delete behavior (keep/cascade/prevent). Persistable vs non-persistable. Indexes. Validation rules. System entities.', build: 'Add a generalization, set delete behavior, add an index and a validation rule.', drill: ['Generalization vs one-to-one association — when each?', 'What are the delete-behavior options?', 'When would you use a non-persistable entity?'] },
  { day: 4, week: 1, light: true, hours: '~1.25h', title: 'Pages & UI basics', learn: 'Pages, layouts + placeholders, navigation & home page, data widgets (data view / list view / data grid) and their data sources (database / association / microflow / nanoflow).', build: 'Overview page (data grid of Customers) + detail page (data view).', drill: ['Data view vs list view vs data grid?', 'What is a layout/placeholder?', 'What can a data view’s microflow source return?'] },
  { day: 5, week: 1, light: true, hours: '~1.5h', title: 'Pages advanced + Atlas UI', learn: 'Snippet vs building block. Conditional visibility (attribute/role). Atlas UI, Theme Editor, design properties. Responsive navigation profiles. Page templates (wizard/login).', build: 'Reuse a snippet on two pages; hide a button by module role; restyle with design properties.', drill: ['Snippet vs building block?', 'How do you show a widget only to admins?', 'What is a master layout?'] },
  { day: 6, week: 1, hours: '~2h', title: 'Microflows: fundamentals', learn: 'Activities (Create/Change/Commit/Retrieve/Delete/Show page), variables, exclusive split (decision), merge, sequence flow, commit vs Refresh in client.', build: 'Microflow that creates + commits an object and opens a confirmation page.', drill: ['Commit vs Refresh in client?', 'How many paths does a decision follow?', 'Retrieve by association vs from database?'] },
  { day: 7, week: 1, hours: '~2h', title: 'Microflows: advanced', learn: 'Loops/iterators (break/continue), aggregates (count/sum/avg), list operations, sub-microflows, error handling (rollback / custom with & without rollback / continue), cast + inheritance split.', build: 'Loop over a list, aggregate a total, extract a sub-microflow, add error handling.', drill: ['Error-handling options and when to use each?', 'What is the N+1 problem?'], selfTest: 'LearnMendix → Rapid + Microflows quizzes' },

  { day: 8, week: 2, hours: '~2h', title: 'Events & scheduled events', learn: 'Event handlers (before/after create/commit/delete/rollback), scheduled events (no params, full rights), intro to the Workflow engine.', build: 'Add a before-commit event that sets a field; create a scheduled event.', drill: ['Before-commit vs after-commit event?', 'Constraints on a scheduled-event microflow?'] },
  { day: 9, week: 2, hours: '~2h', title: 'XPath deep-dive', learn: 'Constraint syntax, tokens ([%CurrentUser%], [%CurrentObject%], date tokens), association traversal (/), operators, functions (contains, starts-with), empty, where XPath is used.', build: 'Write 5 constraints: own-records, date range, traversal, contains, empty.', drill: ['How would you show a user only their own records?', 'Difference between / and //?'] },
  { day: 10, week: 2, hours: '~2h', title: 'Security part 1 — roles & access', learn: 'Security levels (Off/Prototype/Production and what each enforces), user roles vs module roles (mapping in App Security), page access, microflow access.', build: 'Turn on Production security; create two module roles; grant page/microflow access.', drill: ['User role vs module role?', 'What does Prototype/Demo enforce?', 'Why keep module roles separate?'] },
  { day: 11, week: 2, hours: '~2h', title: 'Security part 2 — data & enterprise', learn: 'Entity access rules (CRUD + per-member + XPath row constraint), anonymous & demo users, SSO (SAML/OIDC), encryption, audit trails, secure REST.', build: 'Add an entity access rule with an owner XPath constraint; test with demo users.', drill: ['What is the real data guard vs page hiding?', 'How does SSO work in Mendix?'] },
  { day: 12, week: 2, hours: '~2h', title: 'Integration part 1 — REST', learn: 'Call REST service, published REST service, import/export mappings, JSON/XML structures, message definitions, OpenAPI/Swagger.', build: 'Consume a public REST API → import mapping → show the data on a page.', drill: ['How do you consume a REST API?', 'Import vs export mapping?', 'How do you expose your app as an API?'] },
  { day: 13, week: 2, hours: '~2h', title: 'Integration part 2 — SOAP, OData, Data Hub', learn: 'SOAP/WSDL, OData (BI/Excel/Power BI), Data Hub, published-service security, API auth (API key, OAuth), sync vs async, batching, error handling, webhooks.', build: 'Publish an OData service; register/consume a Data Hub dataset (or walk the docs flow).', drill: ['REST vs SOAP vs OData — when each?', 'What is the Data Hub for?', 'How do you secure a published service?'] },
  { day: 14, week: 2, hours: '~2h', title: 'Data management & OQL', learn: 'Retrieve db vs association, commit/rollback/transactions, OQL & datasets, caching, batch processing large volumes, object states.', build: 'Batch-process a large list with paging; write a simple OQL dataset.', drill: ['How do transactions work in a microflow?', 'How do you process 100k records safely?'], selfTest: 'LearnMendix → Intermediate Security + Microflows + XPath quizzes' },

  { day: 15, week: 3, hours: '~2h', title: 'Java actions & extensibility', learn: 'Java actions (executeAction(), Runtime API — IContext, IMendixObject, Core), JavaScript actions (nanoflows/device), when to drop to code, javasource vs userlib.', build: 'Write a tiny Java action (e.g. string manipulation) called from a microflow.', drill: ['When do you use a Java action vs low-code?', 'Java vs JavaScript action?'] },
  { day: 16, week: 3, hours: '~2h', title: 'Pluggable widgets, SDK & platform APIs', learn: 'Pluggable widgets (React), custom widgets, Platform SDK / Model SDK, Build/Deploy APIs.', build: 'Read the pluggable-widget docs; sketch a widget’s properties (or scaffold one).', drill: ['What is a pluggable widget?', 'What could you automate with the Model SDK?'] },
  { day: 17, week: 3, hours: '~2h', title: 'Workflows', learn: 'Workflow engine, user tasks, context entity, decisions/parallel splits, timers, Workflow Commons, task/admin UIs.', build: 'Model a small approval workflow (submit → approve/reject).', drill: ['When would you use a Workflow vs a microflow?', 'What is the workflow context?'] },
  { day: 18, week: 3, hours: '~2h', title: 'Performance & scalability', learn: 'Efficient retrieves/XPath, N+1, indexes, caching, paging/lazy loading, microflow profiling, horizontal scaling, APM, memory & long transactions.', build: 'Create an N+1 then fix it; add an index; profile a slow microflow.', drill: ['Your app is slow — how do you diagnose it?', 'How do you scale a Mendix app?'] },
  { day: 19, week: 3, hours: '~2h', title: 'Mobile (native/PWA) & offline', learn: 'Native mobile, offline-first + sync, nanoflows on device, mobile-specific pages/profiles, PWA.', build: 'Add a phone profile + a nanoflow; skim the offline-sync docs.', drill: ['How does offline work in Mendix?', 'Why nanoflows for mobile/offline?'] },
  { day: 20, week: 3, hours: '~2h', title: 'Version control, CI/CD, ALM & deployment', learn: 'Team Server (Git), branching/merging (merge feature branch vs advanced merge, tagged versions), environments (Test/Acceptance/Production), MDA packages, CI/CD (Build/Deploy APIs, pipelines), Mendix Cloud / private cloud / Kubernetes.', build: 'Create a branch, make a change, merge it; build a deployment package.', drill: ['Explain your branching strategy.', 'How does a Mendix CI/CD pipeline work?', 'Test → Acceptance → Production?'] },
  { day: 21, week: 3, hours: '~2h', title: 'Testing, best practices & architecture', learn: 'Unit Testing module, ATS, test automation; best practices (naming, modularization, security-by-design); app architecture (single vs multi-app, microservices, shared services via Data Hub).', build: 'Write a unit test; refactor a module for cleaner naming/structure.', drill: ['How do you test a Mendix app?', 'How do you structure a large app?'], selfTest: 'LearnMendix → full mock exam (50 questions)' },

  { day: 22, week: 4, hours: '~2h', title: 'Adjacent tech refresh', learn: 'OOP/programming fundamentals, Java basics (for Java actions), SQL basics (SELECT/JOIN/WHERE ≈ OQL/XPath), REST/HTTP/JSON, Git basics.', build: 'Quick exercises: write a SQL join; make a REST call in Postman/curl; do a git branch + merge.', drill: ['What is a foreign key?', 'GET vs POST?', 'What is JSON?', 'What is a merge conflict?'] },
  { day: 23, week: 4, hours: '~2h', title: 'Agile/Scrum & Mendix delivery', learn: 'Scrum roles (PO / Scrum Master / Developers = Business Engineers), ceremonies, story points, Sprintr/Portal, feedback widget, Mendix delivery methodology.', build: 'Write 3 user stories with acceptance criteria for a feature.', drill: ['Walk me through your Agile process.', 'How do you handle changing requirements mid-sprint?'] },
  { day: 24, week: 4, hours: '~2h', title: 'Certifications & Marketplace ecosystem', learn: 'Cert path (Rapid → Intermediate → Advanced → Expert). Common Marketplace modules: Community Commons, Excel importer/exporter, Deep Link, Encryption, MendixSSO/SAML, Email connector, Workflow Commons, Data Widgets.', build: 'List the Marketplace modules you’ve used with one line on each.', drill: ['Which Marketplace modules have you used?', 'How do you evaluate a module for production?'] },
  { day: 25, week: 4, hours: '~2h', title: 'Behavioral & HR prep', learn: 'STAR method. Prep the classics (why leaving, strengths/weaknesses, notice period, salary) — keep answers positive and specific.', build: 'Write out 5 STAR stories: a hard bug, a conflict, a tight deadline, a proud project, a failure/learning.', drill: ['Tell me about yourself (60–90s).', 'Why are you leaving?', 'Greatest strength / weakness?'] },
  { day: 26, week: 4, hours: '~2h', title: 'Project deep-dives (your work)', learn: 'For each project (VerifAI, GRC/TPRM apps): the business problem, your role, domain model + key microflows + security + integrations, challenges, decisions, measurable impact.', build: 'Write a one-page brief per project you can speak to for 5 minutes.', drill: ['Tell me about a Mendix project you’re proud of.', 'What was the hardest technical problem you solved?'] },
  { day: 27, week: 4, hours: '~2h', title: 'System / app design scenarios', learn: 'Approach every design as: domain model → microflows → security → integration → UI.', build: 'Design end-to-end: (1) a leave-management app, (2) a GRC risk register / vendor-risk (TPRM) module — your home turf, (3) order-management with an external payment API.', drill: ['Design a leave-management app.', 'Design a GRC risk register in Mendix.'] },
  { day: 28, week: 4, hours: '~2h', title: 'Live modeling / build under pressure', learn: 'Some interviews screen-share a live build — practice narrating your reasoning as you model.', build: 'Time yourself building a small feature end-to-end: entity + page + microflow + a security rule + a validation.', drill: ['Narrate every step out loud as you build.'] },
  { day: 29, week: 4, hours: '~2h', title: 'Full mock interview', learn: 'Run it like the real thing, then review honestly.', build: '45 min technical (mixed Topic Bank questions) + 20 min behavioral + one design prompt. Record it; score yourself; list every stumble.', drill: ['Answer 15 mixed technical questions cold.'], selfTest: 'LearnMendix mock exam — aim ≥ 80%' },
  { day: 30, week: 4, hours: '~2h', title: 'Weak-area blitz + logistics', learn: 'Prep questions to ask the interviewer; set a company-research routine (product, tech stack, Glassdoor, interviewer LinkedIn).', build: 'Hammer your weak-spot list from Days 1–29; re-read your resume so every line has a story.', drill: ['Re-answer your 10 shakiest questions.'] },
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
