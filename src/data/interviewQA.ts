/**
 * Interview Q&A bank — every key question with a `descriptive` (technical)
 * answer and an `easy` (plain-English) answer. Original content, aligned with
 * docs.mendix.com. Shown in the Interview Prep → Q&A tab.
 */

export interface QA {
  q: string
  descriptive: string
  easy: string
}

export interface QAGroup {
  area: string
  qa: QA[]
}

export const INTERVIEW_QA: QAGroup[] = [
  {
    area: 'Platform & architecture',
    qa: [
      { q: 'What is Mendix?', descriptive: 'A low-code, model-driven application platform. You build apps from visual models — a domain model (data), pages (UI) and microflows/nanoflows (logic) — and Mendix generates and runs the full web/mobile app, handling the database, server and client. You can still extend it with Java/JavaScript when needed.', easy: 'It’s like building with smart LEGO instead of moulding every brick — you assemble apps visually and Mendix turns it into a real running app.' },
      { q: 'Why low-code? Pros and cons?', descriptive: 'Pros: much faster delivery, less boilerplate, easier maintenance, business + IT collaboration, and built-in security/deployment. Cons: less low-level control, some platform lock-in, licensing cost, and very custom needs may still require code.', easy: 'You trade a bit of fine-grained control for a lot of speed — ideal for business apps.' },
      { q: 'Explain the Mendix architecture.', descriptive: 'Three tiers: the client (browser/mobile) runs the UI and nanoflows; the Mendix Runtime server runs microflows and business logic; the database stores persistable data. The client talks to the runtime over a data API, and the runtime talks to the database.', easy: 'Browser (screens) ↔ Mendix server (logic) ↔ database (data). Microflows run on the server, nanoflows on the device.' },
      { q: 'Microflow vs nanoflow?', descriptive: 'A microflow runs on the server and can access the database directly — used for most business logic. A nanoflow runs on the client/device: faster for UI logic and usable offline, but it still calls the server for data.', easy: 'Microflow = server-side logic; nanoflow = on-the-device logic that also works offline.' },
      { q: 'What does a module contain?', descriptive: 'A self-contained unit bundling a domain model, pages, microflows, module roles (security) and resources. Modules keep features independent so they can be reused and shared via the Marketplace.', easy: 'A folder for one feature — its data, screens, logic and permissions — that you can reuse elsewhere.' },
    ],
  },
  {
    area: 'Domain model',
    qa: [
      { q: 'What are the three association types?', descriptive: 'One-to-one, one-to-many and many-to-many. They derive from the association Type (Reference vs Reference set) plus the Owner property. In a one-to-many, the reference (foreign key) sits on the “many” side.', easy: '1-to-1, 1-to-many, many-to-many — and the “many” side remembers who it belongs to.' },
      { q: 'Generalization vs association?', descriptive: 'Generalization is inheritance (“is-a”): a specialization inherits attributes, associations and validation rules — but not access rules. An association is a “has-a/uses” link between two independent entities.', easy: 'Generalization = “is a kind of” (Manager is-a Employee). Association = “has/uses” (Employee has-a Desk).' },
      { q: 'What are the delete-behavior options?', descriptive: 'Per association end: keep the associated objects (default), delete them too (cascade), or prevent the delete while associations still exist (show an error). It protects referential integrity, and applies to in-memory objects too.', easy: 'When you delete something, choose: leave its linked items, delete them too, or block the delete.' },
      { q: 'Persistable vs non-persistable entity?', descriptive: 'Persistable entities are stored in the database (they have a table). Non-persistable entities live only in memory during the session — great for wizard/working data — and cannot have indexes or stored validation.', easy: 'Persistable = saved to disk; non-persistable = scratch paper that vanishes after the session.' },
      { q: 'What is an index for?', descriptive: 'An index speeds up retrieval/search on the indexed attribute, at the cost of slightly slower inserts/updates/deletes. It’s only available on persistable entities — add it to attributes you frequently search or sort on.', easy: 'Like a book’s index — finding things is faster, but every edit costs a little to keep it updated.' },
    ],
  },
  {
    area: 'Pages & UI',
    qa: [
      { q: 'Data view vs list view vs data grid?', descriptive: 'A data view shows a single object; a list view shows a list rendered with a custom template; a data grid shows a list in a searchable, sortable column table with paging.', easy: 'One thing = data view; a styled feed = list view; a spreadsheet-like table = data grid.' },
      { q: 'Snippet vs building block?', descriptive: 'A snippet is one reusable definition — edit it once and every use updates (a live link). A building block is a template whose widgets are copied onto the page and then edited independently.', easy: 'Snippet = shared master slide (changes everywhere); building block = a stamp you drop and tweak.' },
      { q: 'What is a layout / placeholder / master layout?', descriptive: 'A layout provides reusable page structure (nav, header) via placeholders that pages fill with content. A master layout is the layout another layout is based on.', easy: 'A layout is a picture frame with empty slots; pages slot their content into the slots.' },
      { q: 'How do you show a widget only to admins?', descriptive: 'Use conditional visibility on the widget, set to visible for the Administrator module role (visibility can also depend on a boolean attribute or expression).', easy: '“Only show this if…” — set the button’s visibility to the Administrator role.' },
    ],
  },
  {
    area: 'Microflows',
    qa: [
      { q: 'What are the common microflow activities?', descriptive: 'Create/Change/Commit/Retrieve/Delete objects, Show page, decisions (exclusive splits), loops, aggregate, and calling sub-microflows. Create/change happen in memory; the change only persists when you commit.', easy: 'Make a thing, change it, save it (commit), fetch data, open a page — nothing’s saved until you commit.' },
      { q: 'Commit vs Refresh in client?', descriptive: 'Commit persists an object’s changes to the database. “Refresh in client” pushes the updated object to open pages so the UI reflects it. To update what the user sees after a change, you usually need both.', easy: 'Commit = save to database; refresh in client = update the screen.' },
      { q: 'What are the error-handling options?', descriptive: 'Rollback (revert and stop), Custom with rollback (revert, then follow the error path), Custom without rollback (keep changes, then follow the error path), and Continue (keep changes and carry on silently). Docs prefer “custom without rollback” over “continue” so failures stay visible.', easy: 'On a failure you choose: undo everything, undo-then-branch, keep-then-branch, or ignore. Avoid “ignore”.' },
      { q: 'What is the N+1 problem?', descriptive: 'Retrieving related data inside a loop runs one query per iteration (N+1 total), which kills performance. Fix it by retrieving the whole list once, or over an association already in memory.', easy: 'Don’t fetch inside a loop — grab everything in one go instead of one query per item.' },
      { q: 'What is a scheduled event?', descriptive: 'A microflow that runs automatically on a time schedule, with no user and no parameters, executing with full rights — used for nightly jobs, cleanups and batch processing.', easy: 'A timer that runs a microflow on its own (e.g. every night), no user needed.' },
    ],
  },
  {
    area: 'XPath',
    qa: [
      { q: 'What is XPath used for?', descriptive: 'XPath filters data with bracketed constraints — in entity access rules (row-level security), microflow/data-source retrieves, and page data sources. Example: [VacationRequest_Submitter = current user].', easy: 'It’s how you say “only show rows where…” — like “only my own records”.' },
      { q: 'What does [%CurrentUser%] do?', descriptive: 'It’s a system token that resolves to the GUID of the logged-in user, used to constrain data to that user (e.g. own-records access rules).', easy: 'A placeholder that means “whoever is logged in”.' },
      { q: 'Difference between / and //?', descriptive: 'A query starts with // to select all objects of an entity; a single / then traverses to a related entity, association or attribute.', easy: '// = “start / all of these”; / = “step into a linked thing”.' },
    ],
  },
  {
    area: 'Security',
    qa: [
      { q: 'What are the three security levels?', descriptive: 'Off (no security — local/Free App only), Prototype/Demo (sign-in, page and microflow access enforced, but data is open), and Production (full security including entity/data access — required for licensed cloud).', easy: 'Off = testing; Prototype = login + screens locked but data open; Production = fully locked down.' },
      { q: 'User roles vs module roles?', descriptive: 'End-users are assigned user roles (app level). Each user role bundles module roles (module level), and module roles carry the actual page/microflow/entity access. You map them in App Security.', easy: 'A user role is a job title; it’s made of permission badges (module roles) from each module.' },
      { q: 'What actually protects data — page access or entity access?', descriptive: 'Entity access rules. Page access only controls menu/button visibility and can be bypassed by deep links; entity access (CRUD + member rights + XPath row constraints) is the real data guard.', easy: 'Hiding a page isn’t security — entity access rules are what truly lock the data.' },
      { q: 'How does SSO work in Mendix?', descriptive: 'Via SAML or OIDC using the MendixSSO/SAML/OIDC Marketplace modules — users authenticate against an identity provider (Azure AD, Okta), and Mendix maps them to user roles, removing local passwords.', easy: 'Users log in with their company account (Microsoft/Okta); a Marketplace module handles the handshake.' },
    ],
  },
  {
    area: 'Integration (REST, SOAP, OData, Data Hub)',
    qa: [
      { q: 'How do you consume a REST API?', descriptive: 'Use the Call REST service activity — set the URL, HTTP method, headers and auth. The JSON/XML response is parsed by an import mapping (built on a JSON/XML structure) into Mendix objects, often non-persistable.', easy: '“Call REST service” grabs the data; an import mapping unpacks that JSON into Mendix objects.' },
      { q: 'How do you expose your app as an API?', descriptive: 'Create a published REST service — define resources and operations (GET/POST/…), map each to a microflow, use export mappings to serialize objects to JSON, and secure it (API key/auth). Mendix auto-generates OpenAPI/Swagger docs.', easy: 'A published REST service — you pick the endpoints and which microflow runs for each; Mendix writes the docs.' },
      { q: 'Import vs export mapping?', descriptive: 'An import mapping turns incoming JSON/XML into Mendix objects; an export mapping serializes Mendix objects into JSON/XML to send out. Both are built on JSON/XML structures or message definitions.', easy: 'Import = data in → objects; export = objects → data out.' },
      { q: 'What is OData and when do you use it?', descriptive: 'OData publishes your data as a standard, queryable feed that clients can filter and sort themselves — consumed by Excel, Power BI and other Mendix apps (via the Data Hub). Use it to share live, queryable data.', easy: 'A live, filterable data URL — great for letting BI tools or other apps pull your data.' },
      { q: 'REST vs SOAP vs OData?', descriptive: 'REST is modern, lightweight, JSON and resource-based. SOAP is older, strict, XML and contract-first (described by a WSDL). OData is a queryable data protocol (built on REST) for exposing/consuming datasets.', easy: 'REST = modern/JSON; SOAP = old/XML/WSDL; OData = a queryable data feed.' },
      { q: 'What is the Data Hub?', descriptive: 'A catalog of shared, published OData services across your Mendix landscape. Publish a dataset once and other teams/apps discover and reuse it — enabling data sharing without point-to-point integrations.', easy: 'An internal “app store for data” — publish once, other apps find and reuse it.' },
      { q: 'Synchronous vs asynchronous integration?', descriptive: 'A synchronous call waits for the response before continuing — simple, but it blocks and can time out on slow calls. Asynchronous decouples the call (queues/scheduled processing) for long-running or high-volume work.', easy: 'Sync = wait for the answer now; async = fire it off and handle the reply later.' },
      { q: 'How do you secure a published service?', descriptive: 'Use authentication (username/password via a microflow, API keys, or OAuth/SSO), restrict which module roles can access which operations, and always use HTTPS. Never expose data without auth.', easy: 'Lock it with a login, an API key, or OAuth — never leave the endpoint open.' },
    ],
  },
  {
    area: 'Extensibility',
    qa: [
      { q: 'When do you use a Java action vs low-code?', descriptive: 'Only when the platform or a Marketplace module can’t do it — complex algorithms, specific libraries, or low-level operations. Prefer low-code first for maintainability and upgrade-safety.', easy: 'Drop to code only when the visual tools can’t do it; otherwise stay low-code.' },
      { q: 'Java action vs JavaScript action?', descriptive: 'Java actions run on the server using the Mendix Runtime API; JavaScript actions run in nanoflows on the client/device, for browser/device APIs and offline logic.', easy: 'Java = server-side code; JavaScript action = device-side code.' },
      { q: 'What is a pluggable widget?', descriptive: 'A custom, React-based UI component with typed properties that you build, package and reuse (and can publish to the Marketplace) like any built-in widget.', easy: 'A custom React component you can drop on pages like a normal widget.' },
    ],
  },
  {
    area: 'Data & performance',
    qa: [
      { q: 'Your app is slow — how do you diagnose it?', descriptive: 'Measure, don’t guess: use the microflow debugger/profiler and APM to find slow microflows and database queries; check for N+1 retrieves, missing indexes, over-large lists on pages, and heavy conditional visibility.', easy: 'Profile it to find the slow step, then fix that — usually a loop-retrieve or a missing index.' },
      { q: 'How do you scale a Mendix app?', descriptive: 'Optimize data access first (XPath, indexes, paging), then scale horizontally with multiple runtime instances behind a load balancer; use caching and async for heavy work; monitor with APM.', easy: 'Fix slow queries first, then add more server instances to handle load.' },
      { q: 'How do you process 100k records safely?', descriptive: 'Batch and paginate — retrieve and commit in chunks (e.g. 1000 at a time), avoid holding huge lists in memory, and run it as a scheduled/async job with proper transaction and error handling.', easy: 'Do it in small batches, not all at once, so you don’t blow up memory.' },
    ],
  },
  {
    area: 'Workflows',
    qa: [
      { q: 'Workflow vs microflow?', descriptive: 'A microflow is short server logic that runs to completion. A workflow models long-running, human-in-the-loop processes (approvals, onboarding) that span days and multiple users, with user tasks and persisted state.', easy: 'Microflow = quick automated logic; workflow = a multi-day process with human steps.' },
      { q: 'What is the workflow context?', descriptive: 'The entity instance a workflow runs on (e.g. the expense report being approved). User tasks and decisions operate on that context object.', easy: 'The “thing” the workflow is about — like the request being approved.' },
    ],
  },
  {
    area: 'Mobile & offline',
    qa: [
      { q: 'How does offline work in Mendix?', descriptive: 'Native/PWA apps can run offline-first: a synchronizable subset of data is stored on the device, nanoflows run locally, and changes sync to the server when a connection is available.', easy: 'The app keeps a copy of your data on the device and syncs up when you’re back online.' },
    ],
  },
  {
    area: 'ALM, CI/CD & deployment',
    qa: [
      { q: 'What is your branching strategy?', descriptive: 'Keep the main line deployable; develop features/fixes on branch lines and merge back (merge feature branch for a whole branch, advanced merge for selected revisions). Building a deployment package creates a tagged version.', easy: 'Work on side branches so main stays clean, then merge back in.' },
      { q: 'What are Test → Acceptance → Production?', descriptive: 'The standard Mendix Cloud pipeline — promote a validated deployment package through Test, then Acceptance, then Production, verifying at each stage before it goes live.', easy: 'Changes go test → staging → live, checked at each step.' },
      { q: 'How does a Mendix CI/CD pipeline work?', descriptive: 'Automate build/test/deploy by calling the Mendix Build/Deploy APIs from a pipeline (Jenkins/Azure DevOps/GitHub Actions), with quality gates (automated tests, the consistency check) that must pass before shipping.', easy: 'Every change is auto-built, tested and deployed via the Build/Deploy APIs — no manual steps.' },
    ],
  },
  {
    area: 'Testing & best practices',
    qa: [
      { q: 'How do you test a Mendix app?', descriptive: 'Unit-test microflows with the Unit Testing module; automate UI/regression with ATS (Application Test Suite); run the model consistency check; do code/model reviews; and test security by signing in as each demo user.', easy: 'Unit-test logic, automate UI tests with ATS, and fix consistency errors before shipping.' },
      { q: 'How do you structure a large app?', descriptive: 'Modularize by feature/domain with clean boundaries and few cross-module dependencies; consider multi-app/microservices with shared services via the Data Hub; apply naming conventions and security-by-design.', easy: 'Split into tidy feature modules, keep them loosely coupled, and share data via the Data Hub.' },
    ],
  },
  {
    area: 'Agile & process',
    qa: [
      { q: 'What does Mendix call the developers on a Scrum team?', descriptive: 'Business Engineers. The Scrum team is the Product Owner, the Scrum Master and the Developers (Business Engineers).', easy: 'Mendix calls the developers “Business Engineers”.' },
      { q: 'How do you handle changing requirements mid-sprint?', descriptive: 'Protect the sprint — new requests go to the Product Owner and onto the prioritized backlog for a future sprint; the current sprint scope stays stable unless the PO renegotiates.', easy: 'New asks go on the backlog for next sprint; you don’t derail the current one.' },
    ],
  },
]

export const QA_TOTAL = INTERVIEW_QA.reduce((n, g) => n + g.qa.length, 0)
