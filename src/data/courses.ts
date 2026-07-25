import type { Level } from '../types'

/**
 * LearnMendix course content.
 * Rapid + Intermediate are fully authored (lessons + quizzes).
 * Advanced + Expert are browsable previews (intro lesson each, no quiz yet).
 * Every technical answer is aligned with docs.mendix.com.
 *
 * Each lesson has BOTH a technical explanation (`tech`) and a plain-English
 * one (`simple`), plus an optional "Try it in Studio Pro" tip.
 */

export const COURSES: Level[] = [
  /* ============================================================ RAPID */
  {
    id: 'rapid',
    name: 'Rapid Developer',
    tagline: 'Your first apps — the platform, data, pages, logic & deploy.',
    color: '#22d3ee',
    icon: '🚀',
    status: 'available',
    modules: [
      {
        id: 'r-intro',
        title: 'Meet Mendix & Studio Pro',
        icon: '🚀',
        accent: 'cyan',
        blurb: 'What low-code is, the tool you build in, and the platform around it.',
        lessons: [
          {
            id: 'r-intro-1',
            title: 'What is Mendix?',
            depth: 'full',
            tech: 'Mendix is a <b>low-code, model-driven application platform</b>. Instead of writing most code by hand, you assemble apps from visual models: a <b>domain model</b> (data), <b>pages</b> (UI), and <b>microflows/nanoflows</b> (logic). The platform generates and runs the actual application for web and mobile, handling the database, server and client for you. You can still extend it with Java/JavaScript when needed.',
            simple: 'Think of Mendix like building with smart LEGO instead of moulding every brick yourself. You drag pieces together — where data lives, what screens look like, what buttons do — and Mendix turns that into a real, running app. You only drop down to hand-written code for the rare special piece.',
            terms: ['Low-code', 'Model-driven', 'Domain model', 'Microflow'],
          },
          {
            id: 'r-intro-2',
            title: 'Studio Pro & the App Explorer',
            depth: 'card',
            tech: '<b>Studio Pro</b> is the primary desktop IDE where you model everything. The <b>App Explorer</b> (left panel) is a tree of your app organised into <b>modules</b>; each module holds a domain model, pages, microflows, and resources. The <b>toolbox</b>, <b>properties</b> pane and <b>error list</b> round out the workspace.',
            simple: 'Studio Pro is your workshop. The App Explorer on the left is like a filing cabinet — folders (modules) that each contain the data, screens and logic for one part of your app. You click around this tree to find and edit things.',
            tryit: 'Open Studio Pro, create a new app from a blank template, and expand the App Explorer to see the default modules.',
            terms: ['Studio Pro', 'App Explorer', 'Module', 'Toolbox'],
          },
          {
            id: 'r-intro-3',
            title: 'The Mendix Platform',
            depth: 'card',
            tech: 'Beyond Studio Pro, the platform includes: the <b>Mendix Portal</b> (manage apps, deploy, plan Agile stories), the <b>Marketplace</b> (reusable modules, widgets and connectors), the <b>Team Server</b> (built-in Git version control), and <b>Mendix Cloud</b> (managed hosting with Test/Acceptance/Production environments).',
            simple: 'Studio Pro is where you build, but there is a whole ecosystem around it: a website to manage and launch apps (Portal), an app store for ready-made parts (Marketplace), an automatic save-history + teamwork system (Team Server), and cloud servers to run your app.',
            terms: ['Portal', 'Marketplace', 'Team Server', 'Mendix Cloud'],
          },
        ],
        quiz: [
          { q: 'What kind of platform is Mendix?', options: ['A low-code, model-driven application platform', 'A spreadsheet tool', 'A pure hand-coding IDE for Java only', 'A database engine'], correct: 0, why: 'Mendix builds apps from visual models with low-code, generating the running application.' },
          { q: 'Where do you primarily build a Mendix app?', options: ['In a text editor', 'In Studio Pro', 'In the browser console', 'In Excel'], correct: 1, why: 'Studio Pro is the main modelling IDE.' },
          { q: 'What is the Mendix Marketplace for?', options: ['Hosting production apps', 'Downloading reusable modules, widgets and connectors', 'Storing user passwords', 'Writing SQL'], correct: 1, why: 'The Marketplace provides ready-made reusable components you import into your app.' },
          { q: 'What does the Team Server provide?', options: ['A production database', 'Built-in version control (history, branches, merging) for your app model', 'Email sending', 'Styling only'], correct: 1, why: 'Team Server is the built-in Git version control for the app model.' },
        ],
      },
      {
        id: 'r-domain',
        title: 'The Domain Model (basics)',
        icon: '🗄️',
        accent: 'blue',
        blurb: 'Entities, attributes and how data connects.',
        lessons: [
          {
            id: 'r-domain-1',
            title: 'Entities & attributes',
            depth: 'full',
            tech: 'The <b>domain model</b> is your app’s data structure. An <b>entity</b> represents a type of object you store (like a database table) — e.g. <code>Customer</code>. Its <b>attributes</b> are the properties/columns — e.g. <code>Name</code> (String), <code>DateOfBirth</code> (Date), <code>Age</code> (Integer). Each stored object is one row.',
            simple: 'An entity is a template for a kind of thing — say, a Customer. Attributes are the blanks on that template: name, birthday, age. Every actual customer you save is one filled-in copy of the template.',
            tryit: 'Add an entity named Customer to your module’s domain model, then give it Name (String) and Age (Integer) attributes.',
            terms: ['Domain model', 'Entity', 'Attribute', 'Object'],
          },
          {
            id: 'r-domain-2',
            title: 'Associations (the basics)',
            depth: 'full',
            tech: 'An <b>association</b> links two entities — a relationship like a foreign key. If a <code>Customer</code> places many <code>Order</code>s, you draw a <b>one-to-many</b> association between them. Associations let you navigate from one object to related objects (a customer’s orders, an order’s customer).',
            simple: 'An association is a line connecting two entities that says "these belong together." One customer can have many orders, so you draw a line from Customer to Order. Later you can follow that line — "show me this customer’s orders."',
            terms: ['Association', 'One-to-many', 'Relationship'],
          },
          {
            id: 'r-domain-3',
            title: 'Persistable vs non-persistable',
            depth: 'card',
            tech: 'A <b>persistable</b> entity is stored in the database (it has a table). A <b>non-persistable</b> entity is not stored — it lives only in memory during a session, which is ideal for temporary data like a wizard’s working values or calculation helpers.',
            simple: 'Persistable = saved to disk, remembered forever. Non-persistable = scratch paper, exists only while you work and then it’s gone. Use scratch paper for temporary things you don’t need to keep.',
            terms: ['Persistable', 'Non-persistable', 'In-memory'],
          },
        ],
        quiz: [
          { q: 'In Mendix, an entity is most like…', options: ['A single button', 'A type/table of data you store', 'A page', 'A colour'], correct: 1, why: 'An entity represents a type of object (like a database table).' },
          { q: 'What are attributes?', options: ['The properties/fields of an entity', 'Buttons on a page', 'User accounts', 'Microflows'], correct: 0, why: 'Attributes are an entity’s properties, like columns.' },
          { q: 'What links two entities together?', options: ['A widget', 'An association', 'A layout', 'A theme'], correct: 1, why: 'Associations define relationships between entities.' },
          { q: 'Where is a persistable entity’s data stored?', options: ['Only in memory', 'In the database', 'In the browser cache only', 'It is never stored'], correct: 1, why: 'Persistable entities are saved in the database; non-persistable ones live only in memory.' },
        ],
      },
      {
        id: 'r-pages',
        title: 'Pages & Widgets (basics)',
        icon: '🖼️',
        accent: 'purple',
        blurb: 'Screens, the widgets on them, and how users move around.',
        lessons: [
          {
            id: 'r-pages-1',
            title: 'Pages & layouts',
            depth: 'full',
            tech: 'A <b>page</b> is a screen. Pages are built from <b>widgets</b> (buttons, text boxes, containers, data widgets). Every page is based on a <b>layout</b> — a reusable structure with <b>placeholders</b> that the page fills in, so shared elements like the navigation bar are defined once.',
            simple: 'A page is one screen in your app, made by dragging widgets onto it. A layout is the picture frame — it holds the shared parts (like the top menu), and each page just slots its own content into the empty space.',
            terms: ['Page', 'Widget', 'Layout', 'Placeholder'],
          },
          {
            id: 'r-pages-2',
            title: 'Data widgets: data view, list view, data grid',
            depth: 'full',
            tech: 'Data widgets show objects on a page. A <b>data view</b> shows <b>one</b> object’s details. A <b>list view</b> shows a <b>list</b> of objects, each rendered with a custom template. A <b>data grid</b> shows a list in a table of columns with built-in search, sort and paging.',
            simple: 'Three ways to show data: a data view is a single profile card (one thing). A list view is a feed (many things, styled your way). A data grid is a spreadsheet-like table (many things in rows and columns with search built in).',
            tryit: 'Drop a data grid on a page and point it at your Customer entity to list all customers.',
            terms: ['Data view', 'List view', 'Data grid'],
          },
          {
            id: 'r-pages-3',
            title: 'Navigation & the home page',
            depth: 'card',
            tech: 'The <b>Navigation</b> document defines menus and which page opens as the <b>home page</b> per profile (Responsive, Phone, Tablet, Native). Menu items and buttons trigger a page or a microflow.',
            simple: 'Navigation is your app’s menu and its front door — you pick which screen users land on first, and what each menu item opens.',
            terms: ['Navigation', 'Home page', 'Profile'],
          },
        ],
        quiz: [
          { q: 'A data view is used to show…', options: ['A list of objects', 'Exactly one object', 'A menu', 'A chart only'], correct: 1, why: 'A data view displays the details of a single object.' },
          { q: 'Which widget shows a list of objects in a searchable table of columns?', options: ['Data view', 'Data grid', 'Text box', 'Layout'], correct: 1, why: 'A data grid shows lists in columns with search/sort/paging.' },
          { q: 'What does a layout provide?', options: ['A reusable page structure with placeholders', 'A database table', 'A user role', 'A microflow'], correct: 0, why: 'Layouts give shared structure that pages fill via placeholders.' },
          { q: 'Where do you set which page opens first?', options: ['In the domain model', 'In the Navigation document', 'In security', 'In the Marketplace'], correct: 1, why: 'The home page is configured in Navigation per profile.' },
        ],
      },
      {
        id: 'r-microflows',
        title: 'Microflows (basics)',
        icon: '⚙️',
        accent: 'lime',
        blurb: 'Visual logic: do things, save things, make choices.',
        lessons: [
          {
            id: 'r-microflows-1',
            title: 'What is a microflow?',
            depth: 'full',
            tech: 'A <b>microflow</b> is a visual way to define logic that runs on the <b>server</b>. It is a flow of <b>activities</b> connected by sequence flows, with a green start and red end. Microflows can create/change/retrieve objects, call other microflows, show pages, and make decisions. (A <b>nanoflow</b> is similar but runs on the client/device.)',
            simple: 'A microflow is a flowchart that actually does work. You lay out steps left to right — "get the data, change it, save it, open a page" — and Mendix runs them in order when a button is clicked.',
            terms: ['Microflow', 'Activity', 'Sequence flow', 'Nanoflow'],
          },
          {
            id: 'r-microflows-2',
            title: 'Common activities: create, change, commit, show page',
            depth: 'full',
            tech: 'Key activities: <b>Create object</b> (new object in memory), <b>Change object</b> (set attribute values), <b>Commit</b> (save to the database), <b>Retrieve</b> (fetch objects), and <b>Show page</b> (open a page). Creating and changing happen in memory; the change only becomes permanent when you <b>commit</b>.',
            simple: 'Common steps: make a new thing, fill in its details, then save it. "Commit" is the save button — until you commit, your changes are just pencil marks that vanish. "Show page" opens a screen for the user.',
            tryit: 'Make a microflow that creates a Customer, sets its Name, commits it, and shows a confirmation page.',
            terms: ['Create', 'Change', 'Commit', 'Retrieve', 'Show page'],
          },
          {
            id: 'r-microflows-3',
            title: 'Decisions (making choices)',
            depth: 'card',
            tech: 'A <b>decision</b> (exclusive split) evaluates a condition and follows exactly one outgoing path — e.g. based on a boolean or an enumeration. Use it to branch logic ("if the order is paid, do X, otherwise do Y").',
            simple: 'A decision is a fork in the road. The microflow checks a yes/no (or a category) and goes down one path only — never both.',
            terms: ['Decision', 'Exclusive split', 'Condition'],
          },
        ],
        quiz: [
          { q: 'A microflow is…', options: ['A styling theme', 'A visual way to define logic that runs on the server', 'A database table', 'A user role'], correct: 1, why: 'Microflows model server-side logic as a flow of activities.' },
          { q: 'To permanently save an object’s changes to the database you…', options: ['Retrieve it', 'Commit it', 'Show a page', 'Delete it'], correct: 1, why: 'Commit persists in-memory changes to the database.' },
          { q: 'Which activity chooses one path based on a condition?', options: ['Loop', 'Decision (exclusive split)', 'Merge', 'Annotation'], correct: 1, why: 'A decision follows exactly one outgoing path.' },
          { q: 'How do you open a page from a microflow?', options: ['Create object', 'Show page activity', 'Commit', 'Change object'], correct: 1, why: 'The Show page activity opens a page.' },
        ],
      },
      {
        id: 'r-security',
        title: 'Security & Users (basics)',
        icon: '🔐',
        accent: 'pink',
        blurb: 'Turning on security and giving users the right access.',
        lessons: [
          {
            id: 'r-security-1',
            title: 'Security levels',
            depth: 'full',
            tech: 'An app has one of three security levels: <b>Off</b> (no security — local testing / Free Apps only), <b>Prototype/Demo</b> (sign-in + page + microflow access enforced, but all data is accessible), and <b>Production</b> (full security including entity/data access — required for licensed cloud deployments).',
            simple: 'Three settings: Off (doors wide open, testing only), Prototype (you must log in and can only reach allowed screens, but data is unguarded), and Production (everything locked down properly — what you use for real).',
            terms: ['Off', 'Prototype/Demo', 'Production'],
          },
          {
            id: 'r-security-2',
            title: 'Users, user roles & module roles',
            depth: 'card',
            tech: 'End-users are assigned <b>user roles</b> (app level). Each user role bundles one or more <b>module roles</b> (module level), and the module roles carry the actual access rights (page, microflow and entity access). Users never see module roles directly.',
            simple: 'A user gets a job title (user role) like "Manager." That title is made up of permission badges from each module (module roles). The badges decide what they can open and edit; the user just sees their title.',
            terms: ['User role', 'Module role', 'Access rights'],
          },
        ],
        quiz: [
          { q: 'Which are the three Mendix security levels?', options: ['Low, Medium, High', 'Off, Prototype/Demo, Production', 'Dev, Test, Live', 'None, Basic, Full'], correct: 1, why: 'The three levels are Off, Prototype/Demo and Production.' },
          { q: 'End-users are directly assigned…', options: ['Module roles', 'User roles', 'Microflows', 'Pages'], correct: 1, why: 'Users get user roles, which aggregate module roles.' },
          { q: 'To require users to log in, security must be at least…', options: ['Off', 'Prototype/Demo', 'It is never possible', 'Only Production'], correct: 1, why: 'Prototype/Demo already enforces sign-in, page and microflow access.' },
          { q: 'Which roles carry the actual access rights?', options: ['User roles', 'Module roles', 'Navigation profiles', 'Layouts'], correct: 1, why: 'Module roles define page/microflow/entity access; user roles bundle them.' },
        ],
      },
      {
        id: 'r-deploy',
        title: 'Run & Deploy',
        icon: '☁️',
        accent: 'amber',
        blurb: 'See your app run, then put it in the cloud.',
        lessons: [
          {
            id: 'r-deploy-1',
            title: 'Running your app locally',
            depth: 'card',
            tech: 'Click <b>Run locally</b> in Studio Pro to build and start the app on your machine, then <b>View app</b> to open it in a browser. Local runs use a local database and are perfect for quick testing during development.',
            simple: 'Hit Run to try your app right on your computer — like a rehearsal before the real show. It spins up a temporary database so you can click around and test.',
            terms: ['Run locally', 'View app', 'Local database'],
          },
          {
            id: 'r-deploy-2',
            title: 'Deploying to the Mendix Cloud',
            depth: 'full',
            tech: 'To share your app you <b>deploy</b> it. A <b>Free App</b> runs on a single <b>Sandbox</b> environment; a licensed node provides <b>Test → Acceptance → Production</b> environments. Deploying builds a <b>deployment package</b> from a Team Server revision (which becomes a <b>tagged version</b>) and publishes it. You manage all of this from the Mendix Portal.',
            simple: 'When you’re ready to show the world, you deploy to Mendix’s cloud. A free app gets one practice server; a paid one gets a test → staging → live pipeline. Each release is snapshotted so you can always roll back.',
            terms: ['Deploy', 'Free App / Sandbox', 'Test/Acceptance/Production', 'Tagged version'],
          },
        ],
        quiz: [
          { q: 'To test your app on your own machine you click…', options: ['Deploy to Production', 'Run locally', 'Merge', 'Commit'], correct: 1, why: 'Run locally builds and starts the app on your machine.' },
          { q: 'A free Mendix app runs on…', options: ['Three environments', 'A single Sandbox environment', 'Your local machine only', 'No environment'], correct: 1, why: 'Free Apps use one Sandbox; licensed nodes get Test/Acceptance/Production.' },
          { q: 'The Mendix Portal is used to…', options: ['Only write code', 'Manage apps, deployments and Agile stories', 'Design the domain model', 'Style pages'], correct: 1, why: 'The Portal manages apps, deployment and project planning.' },
          { q: 'A deployment package is built from…', options: ['A random file', 'A Team Server revision (a tagged version)', 'The local database', 'A page'], correct: 1, why: 'Packages are built from a Team Server revision, which becomes a tagged version.' },
        ],
      },
    ],
  },

  /* ===================================================== INTERMEDIATE */
  {
    id: 'intermediate',
    name: 'Intermediate Developer',
    tagline: 'The certification core: data, security, UI, logic, XPath & Agile.',
    color: '#a855f7',
    icon: '🎯',
    status: 'available',
    modules: [
      {
        id: 'i-domain',
        title: 'Domain Model (advanced)',
        icon: '🗄️',
        accent: 'blue',
        blurb: 'Associations, inheritance, delete behavior, non-persistence, indexes.',
        lessons: [
          {
            id: 'i-domain-1',
            title: 'Association types & ownership',
            depth: 'full',
            tech: 'Associations come in three multiplicities: <b>one-to-one</b>, <b>one-to-many</b> and <b>many-to-many</b>, derived from the association <b>Type</b> (Reference vs Reference set) plus the <b>Owner</b> property. A <b>Reference</b> holds at most one object on the owner side; a <b>Reference set</b> is the many-to-many, multi-valued end. For a one-to-many, the reference (foreign key) is stored on the <b>many</b> side (the owner).',
            simple: 'Relationships come in three flavours: 1-to-1, 1-to-many, and many-to-many. A "Reference" points at a single partner; a "Reference set" holds a whole group. In a one-to-many, the "many" side is the one that remembers who it belongs to.',
            terms: ['One-to-one', 'One-to-many', 'Many-to-many', 'Reference set', 'Owner'],
          },
          {
            id: 'i-domain-2',
            title: 'Generalization vs association',
            depth: 'full',
            tech: '<b>Generalization</b> is an <b>is-a</b> (inheritance) relationship: a specialization inherits <b>attributes, associations and validation rules</b> from its generalization. An <b>association</b> is a <b>has-a/uses</b> relationship between independent entities. Important nuance: entity <b>access (security) rules are NOT inherited</b> — they must be defined per entity (System.User is a platform exception).',
            simple: 'Generalization means "is a kind of" — a Manager is-a Employee, so it automatically gets all the Employee fields. Association means "has/uses" — an Employee has-a Desk, two separate things linked together. One catch: security rules do not get passed down by inheritance; you set those on each entity yourself.',
            terms: ['Generalization', 'Inheritance', 'Specialization', 'is-a vs has-a'],
          },
          {
            id: 'i-domain-3',
            title: 'Delete behavior',
            depth: 'full',
            tech: 'Each association end has a <b>delete behavior</b> with three options: (1) <b>keep</b> the associated object(s) (default), (2) <b>delete them as well</b> (cascading delete), or (3) <b>delete only if not associated</b> — prevent the delete and show an error. Delete behavior also applies to <b>in-memory</b> (uncommitted) associated objects.',
            simple: 'When you delete something, what happens to its linked items? You choose: leave them alone, delete them too (like emptying a folder deletes its files), or block the delete if links still exist (a safety catch). This even works on unsaved, in-memory objects.',
            terms: ['Delete behavior', 'Cascading delete', 'Prevent delete', 'Referential integrity'],
          },
          {
            id: 'i-domain-4',
            title: 'Non-persistable entities',
            depth: 'card',
            tech: 'A <b>non-persistable</b> entity has no database table — its values live in memory during the session (ideal for wizards/calculations). Because there is no table, you <b>cannot define indexes</b> on it and domain-model <b>validation rules are not available</b>.',
            simple: 'Non-persistable = scratch paper that vanishes after the session. Great for temporary wizard steps. Since it never hits the database, database-only features (indexes, stored validation) don’t apply.',
            terms: ['Non-persistable', 'In-memory', 'No indexes'],
          },
          {
            id: 'i-domain-5',
            title: 'Attributes, indexes & performance',
            depth: 'card',
            tech: 'An <b>AutoNumber</b> is an auto-incremented whole number generated by the database (stored, not user-editable). A <b>calculated</b> attribute runs a microflow on every retrieve, is <b>not stored</b> and can’t be sorted on. An <b>index</b> speeds up retrieval when the attribute is searched/constrained, but slows inserts/updates/deletes and is only available on <b>persistable</b> entities.',
            simple: 'AutoNumber hands out 1, 2, 3… automatically. A calculated attribute is worked out fresh every time (never stored). An index is like a book’s index — finding things is faster, but every edit costs a little more to keep the index up to date.',
            terms: ['AutoNumber', 'Calculated attribute', 'Index'],
          },
        ],
        quiz: [
          { q: 'Which association multiplicities exist in Mendix?', options: ['Only one-to-many', 'One-to-one, one-to-many and many-to-many', 'Only many-to-many', 'Zero-to-any'], correct: 1, why: 'Multiplicity comes from Type (Reference vs Reference set) plus Owner.' },
          { q: 'To also delete associated Orders when a Customer is deleted, you set delete behavior to…', options: ['Keep the Orders', 'Delete the Order objects as well (cascade)', 'Prevent the delete', 'Nothing'], correct: 1, why: 'Cascading delete propagates the delete to associated objects.' },
          { q: 'A specialization inherits which of these from its generalization?', options: ['Attributes, associations and validation rules (but NOT access rules)', 'Everything including access rules', 'Only attributes', 'Nothing'], correct: 0, why: 'Members and validation inherit; entity access rules are defined per entity.' },
          { q: 'A non-persistable entity…', options: ['Is stored in the database', 'Has no database table and lives in memory during the session', 'Cannot have attributes', 'Only works offline'], correct: 1, why: 'Non-persistable entities are in-memory only — no table, no indexes.' },
          { q: 'An AutoNumber attribute is…', options: ['A random string', 'An auto-incremented whole number generated by the database', 'User-editable text', 'Only for non-persistable entities'], correct: 1, why: 'The database assigns incrementing values; it is a stored attribute.' },
          { q: 'Adding an index to an attribute…', options: ['Speeds reads but slows writes; persistable entities only', 'Speeds everything equally', 'Makes the attribute required', 'Encrypts the value'], correct: 0, why: 'Indexes trade faster searches for slower inserts/updates/deletes.' },
        ],
      },
      {
        id: 'i-security',
        title: 'Security',
        icon: '🔐',
        accent: 'pink',
        blurb: 'Levels, user vs module roles, entity access & XPath constraints.',
        lessons: [
          {
            id: 'i-security-1',
            title: 'The three security levels',
            depth: 'full',
            tech: '<b>Off</b>: no security (local/Free App only). <b>Prototype/Demo</b>: sign-in, page and microflow access are enforced, but <b>all data is accessible</b>. <b>Production</b>: full security including <b>entity (data) access</b> and dataset access — required for licensed Mendix Cloud. Raising to Production makes entity access rules mandatory.',
            simple: 'Off = no locks (testing). Prototype = you must log in and can only reach allowed screens, but the data itself is unguarded. Production = full lockdown including who can see which rows of data — this is what real apps use.',
            terms: ['Off', 'Prototype/Demo', 'Production', 'Entity access'],
          },
          {
            id: 'i-security-2',
            title: 'User roles vs module roles',
            depth: 'full',
            tech: 'A <b>user role</b> is defined at app level and aggregates one or more <b>module roles</b>; end-users are assigned only user roles. Module roles carry the actual per-module rights and keep a module self-contained (so it can be reused/published). You connect user roles to module roles in <b>App Security</b>.',
            simple: 'A user role is a job title (Manager). It’s built from permission badges (module roles) collected from each module. Staff get the title; the badges under it decide what they can actually do. You wire titles to badges in App Security.',
            terms: ['User role', 'Module role', 'App Security'],
          },
          {
            id: 'i-security-3',
            title: 'Entity access rules & XPath constraints',
            depth: 'full',
            tech: 'An <b>access rule</b> (per module role) grants <b>Create/Read/Write/Delete</b>, sets <b>per-member</b> (attribute/association) read/write, and can add an <b>XPath constraint</b> for <b>row-level</b> security (e.g. <code>[System.owner = &#39;[%CurrentUser%]&#39;]</code> so users see only their own records). XPath constraints work on <b>persistable</b> entities only, because they run against the database.',
            simple: 'Access rules decide, for each role: can you create/read/edit/delete, which fields you can see, and — via an XPath filter — which rows. "Only your own records" is a classic XPath constraint. Row filters only work on real (database) data.',
            terms: ['Access rule', 'CRUD', 'Member access', 'XPath constraint', 'Row-level security'],
          },
          {
            id: 'i-security-4',
            title: 'Anonymous & demo users',
            depth: 'card',
            tech: '<b>Anonymous users</b> let people use the app without signing in; enable them in App Security and assign a user role. If an anonymous user must write data, always apply an <b>instance (XPath) constraint</b> so they only touch their own records. <b>Demo users</b> (one per user role, local/Free App only) let you test/demo the app as each role.',
            simple: 'Anonymous access lets strangers in without a login — handy for public forms, but keep them on a tight leash (only their own data). Demo users are ready-made test accounts, one per role, so you can quickly see the app "as a Manager" or "as an Employee."',
            terms: ['Anonymous user', 'Demo user', 'Instance access'],
          },
        ],
        quiz: [
          { q: 'At Prototype/Demo security, what is enforced?', options: ['Full entity/data access', 'Sign-in, page and microflow access — but all data is accessible', 'Nothing', 'Only anonymous access'], correct: 1, why: 'Prototype checks sign-in/page/microflow; entity access is not enforced.' },
          { q: 'How do user roles relate to module roles?', options: ['They are identical', 'A user role aggregates one or more module roles; users get only user roles', 'Module roles are assigned to users directly', 'User roles live inside modules'], correct: 1, why: 'User roles bundle module roles; end-users receive user roles.' },
          { q: 'An entity access rule can define…', options: ['Only Read', 'CRUD + per-member rights + an XPath row constraint', 'Only page navigation', 'Only microflow execution'], correct: 1, why: 'Access rules combine object rights, member rights and an XPath constraint.' },
          { q: 'An XPath access constraint provides…', options: ['Column formatting', 'Row-level security (which objects a role can access); persistable entities only', 'Faster pages', 'Translation'], correct: 1, why: 'It filters which rows a role can see and runs against the database.' },
          { q: 'To let users in without an account, you…', options: ['Turn security Off', 'Enable anonymous users and assign a user role', 'Give everyone Administrator', 'Delete access rules'], correct: 1, why: 'Anonymous access is enabled in App Security with an assigned role.' },
          { q: 'Which security level is required for a licensed production deployment?', options: ['Off', 'Prototype/Demo', 'Production', 'Any level'], correct: 2, why: 'Only Production enforces full security for licensed cloud nodes.' },
        ],
      },
      {
        id: 'i-pages',
        title: 'Pages & UI',
        icon: '🖼️',
        accent: 'purple',
        blurb: 'Data widgets, snippets, layouts, visibility & Atlas UI.',
        lessons: [
          {
            id: 'i-pages-1',
            title: 'Data widgets & data sources',
            depth: 'full',
            tech: 'A <b>data view</b> shows one object; a <b>list view</b> shows a list with a custom template; a <b>data grid</b> shows a list in a searchable column table. Data widgets accept several <b>data sources</b>: <b>database</b>, <b>association</b>, <b>microflow</b> or <b>nanoflow</b>. A microflow data source must return the object (data view) or list (list view/grid) the widget expects.',
            simple: 'One object → data view (a profile card). Many objects → list view (a styled feed) or data grid (a table with search). Where does the data come from? Straight from the database, via an association, or computed by a microflow/nanoflow.',
            terms: ['Data view', 'List view', 'Data grid', 'Data source'],
          },
          {
            id: 'i-pages-2',
            title: 'Snippets vs building blocks',
            depth: 'card',
            tech: 'A <b>snippet</b> is a single reusable definition — edit it once and every place it’s used updates (a live link). A <b>building block</b> is a template whose widgets are <b>copied</b> onto the page and then edited independently (no live link).',
            simple: 'A snippet is like a shared master slide — change it once, it changes everywhere. A building block is a stamp — it drops a copy you then tweak, and the original doesn’t follow along.',
            terms: ['Snippet', 'Building block', 'Reuse'],
          },
          {
            id: 'i-pages-3',
            title: 'Layouts, placeholders & templates',
            depth: 'card',
            tech: 'A <b>layout</b> provides reusable page structure via <b>placeholders</b> that pages fill in. A layout based on another layout uses that parent as its <b>master layout</b>. <b>Page templates</b> (wizard, list-detail, login) give best-practice starting points you then customise.',
            simple: 'Layouts are picture frames with empty slots (placeholders); pages slot their content in. Templates are pre-built starter pages (like a wizard or login screen) so you don’t start from a blank canvas.',
            terms: ['Layout', 'Placeholder', 'Master layout', 'Page template'],
          },
          {
            id: 'i-pages-4',
            title: 'Conditional visibility & Atlas UI',
            depth: 'card',
            tech: '<b>Conditional visibility</b> shows/hides a widget based on an attribute/expression or on a <b>module role</b>. <b>Atlas UI</b> is the styling framework; the <b>Theme Editor</b> and <b>design properties</b> let you apply predefined classes (colours, spacing) without writing CSS.',
            simple: 'Conditional visibility = show this button only if X (e.g. only to Managers). Atlas UI is the built-in style kit — pick looks from menus instead of writing CSS.',
            terms: ['Conditional visibility', 'Atlas UI', 'Design properties', 'Theme Editor'],
          },
        ],
        quiz: [
          { q: 'Which widget shows exactly one object?', options: ['Data grid', 'List view', 'Data view', 'Template grid'], correct: 2, why: 'A data view is bound to a single object.' },
          { q: 'Which data sources can populate a list view?', options: ['Only database', 'Database, association, microflow and nanoflow', 'Only microflow', 'Only REST'], correct: 1, why: 'Data widgets accept database, association, microflow or nanoflow sources.' },
          { q: 'A snippet differs from a building block because…', options: ['They are identical', 'A snippet keeps a live link (edits propagate); a building block is copied in', 'A building block propagates changes', 'Snippets can’t hold widgets'], correct: 1, why: 'Snippets update everywhere; building blocks are copy-once.' },
          { q: 'The empty area a page fills in a layout is a…', options: ['Snippet', 'Placeholder', 'Building block', 'Region'], correct: 1, why: 'Placeholders are the gaps in a layout that pages fill.' },
          { q: 'To show a widget only to certain roles you use…', options: ['A microflow only', 'Conditional visibility (by module role or expression)', 'The domain model', 'Navigation'], correct: 1, why: 'Conditional visibility can target module roles or an attribute/expression.' },
        ],
      },
      {
        id: 'i-microflows',
        title: 'Microflows',
        icon: '⚙️',
        accent: 'lime',
        blurb: 'Splits, loops, aggregates, error handling, commit/refresh, REST.',
        lessons: [
          {
            id: 'i-microflows-1',
            title: 'Splits, merges & loops',
            depth: 'full',
            tech: 'An <b>exclusive split</b> (decision) follows <b>exactly one</b> outgoing path (Mendix has no inclusive split). A <b>merge</b> recombines paths so a shared activity is modelled once. A <b>loop</b> iterates over a list; the current object is the <b>iterator</b>. Only inside a loop can you use <b>Break</b> (exit early) and <b>Continue</b> (skip to the next item).',
            simple: 'A decision is a single fork — one way only. A merge brings forks back together. A loop repeats a step for each item in a list, one at a time; "break" quits the loop, "continue" jumps to the next item.',
            terms: ['Exclusive split', 'Merge', 'Loop', 'Iterator', 'Break/Continue'],
          },
          {
            id: 'i-microflows-2',
            title: 'Aggregates & list operations',
            depth: 'card',
            tech: 'The <b>Aggregate list</b> activity computes over a list: <b>Count</b> (needs no attribute), and <b>Sum/Average/Minimum/Maximum</b> over a <b>numeric</b> attribute. Other list activities filter, sort, find and change lists.',
            simple: 'Aggregates crunch a list into one number: how many (Count), total, average, biggest, smallest. Count works on anything; Sum/Average need numbers.',
            terms: ['Aggregate list', 'Count', 'Sum/Average'],
          },
          {
            id: 'i-microflows-3',
            title: 'Error handling & rollback',
            depth: 'full',
            tech: 'Error handling settings on an activity: <b>Rollback</b> (revert & stop), <b>Custom with rollback</b> (revert all changes, then follow the error flow), <b>Custom without rollback</b> (keep changes before the error, then follow the error flow), and <b>Continue</b> (keep changes and carry on silently). Docs recommend "custom without rollback" over "continue" so failures stay visible.',
            simple: 'When a step fails you decide what happens: undo everything, undo-then-branch, keep-what-you-did-then-branch, or ignore-and-carry-on. "Ignore" is risky because problems hide; prefer a visible error path.',
            terms: ['Rollback', 'Custom with/without rollback', 'Continue', 'Error flow'],
          },
          {
            id: 'i-microflows-4',
            title: 'Commit, refresh & retrieve',
            depth: 'full',
            tech: '<b>Change object</b> can change members with or without committing and with/without events. To update an open page’s data-source widget, <b>commit</b> the object with <b>Refresh in client = Yes</b>. <b>Retrieve</b> "by association" avoids a database query <b>only if the object is already in memory</b>; use "from database" for XPath constraints/sorting or guaranteed committed values.',
            simple: 'Changing a field isn’t saved until you commit; to make the screen show it, commit with "refresh in client." Getting data: following a link is fast if it’s already loaded, but to filter/sort you go to the database.',
            terms: ['Change object', 'Commit', 'Refresh in client', 'Retrieve'],
          },
          {
            id: 'i-microflows-5',
            title: 'REST & mappings',
            depth: 'card',
            tech: 'The <b>Call REST service</b> activity fetches data from an external API; an <b>import mapping</b> (built on a JSON/XML structure) turns the response into Mendix objects. An <b>export mapping</b> serialises Mendix objects into JSON/XML (and needs a parameter entity).',
            simple: 'To talk to another system: "Call REST service" grabs the data, and an import mapping unpacks that JSON/XML into Mendix objects. Going the other way, an export mapping packs your objects into JSON/XML to send out.',
            terms: ['Call REST service', 'Import mapping', 'Export mapping'],
          },
        ],
        quiz: [
          { q: 'An exclusive split (decision) follows…', options: ['Every true path', 'Exactly one outgoing path', 'At least one path', 'No path'], correct: 1, why: 'Mendix decisions follow exactly one path; there is no inclusive split.' },
          { q: '"Custom with rollback" error handling…', options: ['Keeps all changes', 'Reverts all changes, then follows the error flow', 'Ignores the error', 'Only reverts the last change'], correct: 1, why: 'It rolls back the scope and routes down the custom error path.' },
          { q: 'To make an open page reflect a changed object you…', options: ['Do nothing', 'Commit with Refresh in client = Yes', 'Delete and recreate it', 'Restart the app'], correct: 1, why: 'Commit persists it; refresh-in-client pushes it to the page.' },
          { q: 'Which aggregate needs no attribute selected?', options: ['Sum', 'Average', 'Count', 'Maximum'], correct: 2, why: 'Count just returns the number of objects.' },
          { q: 'True or false: retrieving "by association" always avoids a database query.', options: ['True', 'False'], correct: 1, why: 'If the associated object is not in memory, it is still fetched from the database.' },
          { q: 'An import mapping is used to…', options: ['Turn Mendix objects into JSON', 'Turn incoming JSON/XML into Mendix objects', 'Style a page', 'Define security'], correct: 1, why: 'Import = external data into objects; export = objects into JSON/XML.' },
        ],
      },
      {
        id: 'i-xpath',
        title: 'XPath',
        icon: '🔎',
        accent: 'cyan',
        blurb: 'Tokens, constraints, traversal, operators and functions.',
        lessons: [
          {
            id: 'i-xpath-1',
            title: 'XPath tokens & constraints',
            depth: 'full',
            tech: 'XPath filters data with bracketed constraints. Key tokens: <code>[%CurrentUser%]</code> (GUID of the logged-in user) and <code>[%CurrentObject%]</code> (GUID of the active object). Example: <code>[VacationRequest_Submitter = &#39;[%CurrentUser%]&#39;]</code> returns only the current user’s requests. Use the <b>empty</b> keyword to match attributes/associations with no value.',
            simple: 'XPath is how you say "only show rows where…". Special words fill themselves in: [%CurrentUser%] = whoever is logged in. So "submitter = current user" means "just my stuff." "empty" matches blanks.',
            terms: ['[%CurrentUser%]', '[%CurrentObject%]', 'Constraint', 'empty'],
          },
          {
            id: 'i-xpath-2',
            title: 'Association traversal & operators',
            depth: 'card',
            tech: 'Traverse associations with forward slashes: <code>[Module.Order_Customer/Module.Customer/Name = &#39;Acme&#39;]</code>. Combine constraints with <b>and</b>/<b>or</b>; adjacent brackets <code>[a][b]</code> are an implicit <b>and</b>.',
            simple: 'To filter on a linked thing, follow the chain with slashes: order → its customer → the customer’s name. Stack conditions with and/or; putting two brackets next to each other means "both must be true."',
            terms: ['Association traversal', 'and / or', 'Chained brackets'],
          },
          {
            id: 'i-xpath-3',
            title: 'Functions & where XPath is used',
            depth: 'card',
            tech: 'String functions include <code>contains()</code> (substring anywhere) and <code>starts-with()</code> (begins with). Date tokens like <code>[%BeginOfCurrentDay%]</code> constrain by date ranges. XPath is used in <b>entity access rules</b>, <b>microflow/data-source retrieves</b> and <b>page data sources</b>.',
            simple: 'Handy helpers: contains() finds text anywhere in a field, starts-with() matches the beginning. Date shortcuts let you say "since the start of today." You use XPath in security rules, in retrieves, and on page data sources.',
            terms: ['contains()', 'starts-with()', 'Date tokens'],
          },
        ],
        quiz: [
          { q: 'Which token is the logged-in user?', options: ['[%CurrentObject%]', '[%CurrentUser%]', '[%CurrentDateTime%]', '[%UserRole%]'], correct: 1, why: '[%CurrentUser%] resolves to the logged-in user’s GUID.' },
          { q: 'Which XPath returns the current user’s own requests?', options: ["[Submitter != CurrentUser]", "[VacationRequest_Submitter = '[%CurrentUser%]']", "[%CurrentUser%] = Submitter", "[Status = 'Open']"], correct: 1, why: 'It compares the Submitter association to the current-user token.' },
          { q: 'How do you constrain on an associated entity’s attribute?', options: ['You cannot', 'Traverse the association with slashes, e.g. Order_Customer/Customer/Name', 'Use SQL joins', 'Use a microflow only'], correct: 1, why: 'XPath follows associations with "/" to reach related members.' },
          { q: 'The keyword that matches attributes with no value is…', options: ['null', 'empty', 'blank', 'none'], correct: 1, why: 'The empty keyword matches members with no value.' },
          { q: 'Where can XPath constraints be used?', options: ['Only access rules', 'Access rules, retrieves and page data sources', 'Only pages', 'Only the Marketplace'], correct: 1, why: 'XPath filters data in access rules, retrieves and page data sources.' },
        ],
      },
      {
        id: 'i-agile',
        title: 'Agile & Team Server',
        icon: '🤝',
        accent: 'green',
        blurb: 'Scrum roles, stories, version control, merging & environments.',
        lessons: [
          {
            id: 'i-agile-1',
            title: 'Scrum roles & ceremonies',
            depth: 'full',
            tech: 'Scrum has three roles: <b>Product Owner</b> (owns and prioritises the backlog), <b>Scrum Master</b> (safeguards the process, removes impediments) and the <b>Development Team</b> — in Mendix the developers are called <b>Business Engineers</b>. Ceremonies include sprint planning, the daily scrum (progress/plans/blockers) and the retrospective.',
            simple: 'Three hats: the Product Owner decides what’s most important, the Scrum Master keeps the team unblocked, and the developers (Mendix calls them Business Engineers) build it. Short regular meetings keep everyone in sync.',
            terms: ['Product Owner', 'Scrum Master', 'Business Engineer', 'Daily scrum'],
          },
          {
            id: 'i-agile-2',
            title: 'Stories, sprints & the backlog',
            depth: 'card',
            tech: 'Work is captured as <b>stories</b> in a prioritised <b>product backlog</b> (highest priority at the top) and pulled into time-boxed <b>sprints</b>. <b>Story points</b> estimate complexity/effort (often Fibonacci), not hours.',
            simple: 'Every task is a story on a to-do list sorted by importance. Each sprint (a fixed short period) the team takes the top stories. "Points" rate how hard a story is, not how many hours it takes.',
            terms: ['Story', 'Sprint', 'Backlog', 'Story points'],
          },
          {
            id: 'i-agile-3',
            title: 'Version control: branching & merging',
            depth: 'full',
            tech: 'The <b>Team Server</b> is built-in Git version control (history, branches, merging, rollback). Develop features on a <b>branch line</b> and merge back. <b>Merge feature branch</b> merges an entire branch into the mainline (only offered on the main line); <b>Advanced merge</b> merges selected revisions in either direction. Building a deployment package creates a <b>tagged version</b>.',
            simple: 'Team Server is your save-history and teamwork engine. You work on a side copy (branch) so you don’t disturb the main line, then merge it back. "Merge feature branch" folds a whole branch in; "advanced merge" cherry-picks specific changes.',
            terms: ['Team Server', 'Branch line', 'Merge feature branch', 'Tagged version'],
          },
          {
            id: 'i-agile-4',
            title: 'Feedback & deployment environments',
            depth: 'card',
            tech: 'The <b>Feedback</b> widget lets end-users log items straight into the backlog, attaching context (name, role, active page, browser, screen resolution). A licensed cloud node provides <b>Test → Acceptance → Production</b> environments; a Free App uses a single <b>Sandbox</b>.',
            simple: 'Users can report bugs/ideas from inside the running app, and Mendix attaches useful details automatically. Real apps flow through test → staging → live servers; free apps get one sandbox.',
            terms: ['Feedback widget', 'Test/Acceptance/Production', 'Sandbox'],
          },
        ],
        quiz: [
          { q: 'In Mendix, developers on a Scrum team are called…', options: ['Coders', 'Business Engineers', 'Analysts', 'Architects'], correct: 1, why: 'Mendix labels its app developers Business Engineers.' },
          { q: 'Who prioritises the product backlog?', options: ['Scrum Master', 'Product Owner', 'The whole company', 'The Business Engineer'], correct: 1, why: 'The Product Owner owns and prioritises the backlog.' },
          { q: 'Story points represent…', options: ['Exact hours', 'An estimate of complexity/effort', 'Number of developers', 'Priority'], correct: 1, why: 'Story points estimate relative complexity, not hours.' },
          { q: 'The Team Server provides…', options: ['Only screenshots', 'Built-in Git version control (history, branches, merging)', 'A production database', 'Translation'], correct: 1, why: 'Team Server is the built-in version control for the app model.' },
          { q: '"Merge feature branch" merges…', options: ['Selected revisions only', 'An entire branch into the mainline (offered on the main line)', 'Nothing', 'Only translations'], correct: 1, why: 'It merges the whole branch into main; advanced merge cherry-picks.' },
        ],
      },
      {
        id: 'i-modules',
        title: 'Modules & Marketplace',
        icon: '📦',
        accent: 'amber',
        blurb: 'What a module contains, Marketplace imports and reuse.',
        lessons: [
          {
            id: 'i-modules-1',
            title: 'What a module contains',
            depth: 'card',
            tech: 'A <b>module</b> bundles a <b>domain model</b>, <b>pages</b>, <b>microflows</b>, <b>security (module roles)</b> and resources. Within a module, all security (page/microflow/entity access) is granted per <b>module role</b>. Referencing another module’s entity creates a <b>dependency</b> to manage.',
            simple: 'A module is a self-contained folder holding one feature’s data, screens, logic and permissions. Keeping modules tidy (few cross-links) makes them easy to reuse and maintain.',
            terms: ['Module', 'Module role', 'Dependency'],
          },
          {
            id: 'i-modules-2',
            title: 'Marketplace modules & reuse',
            depth: 'card',
            tech: 'Downloaded <b>Marketplace</b> content appears under the <b>Marketplace modules</b> folder and behaves like your own modules — it ships its own domain model and module roles. At Prototype/Production you must <b>map the imported module roles to user roles</b> in App Security. You can <b>export</b> a module package and import it into another app to reuse it.',
            simple: 'The Marketplace is an app store of ready-made modules. Import one and it slots in like your own work, bringing its own data and permission badges — you just link those badges to your user roles. You can also export your own modules to reuse elsewhere.',
            terms: ['Marketplace module', 'Role mapping', 'Export/import'],
          },
        ],
        quiz: [
          { q: 'A Mendix module can contain…', options: ['Only pages', 'A domain model, pages, microflows, module roles and resources', 'Only microflows', 'Only the domain model'], correct: 1, why: 'A module bundles data, documents and its own module roles.' },
          { q: 'Downloaded Marketplace modules appear…', options: ['In the System module', 'Under the Marketplace modules folder, behaving like your own', 'In a hidden temp folder', 'Merged into your main module'], correct: 1, why: 'They live in the Marketplace-modules folder and work like normal modules.' },
          { q: 'After importing a module with its own module roles (Prototype/Production), you must…', options: ['Nothing', 'Map its module roles to your user roles in App Security', 'Delete your user roles', 'Set security Off'], correct: 1, why: 'Every module role must be mapped to a user role to take effect.' },
          { q: 'To reuse a module in another app you…', options: ['Copy the database', 'Export the module package and import it', 'Retype it', 'Use anonymous users'], correct: 1, why: 'Modules export as a package for import elsewhere.' },
        ],
      },
      {
        id: 'i-translation',
        title: 'Translation',
        icon: '🌐',
        accent: 'magenta',
        blurb: 'Languages, batch translate, the selector and system texts.',
        lessons: [
          {
            id: 'i-translation-1',
            title: 'Adding languages & the default language',
            depth: 'card',
            tech: 'Add languages under <b>Language Settings</b> (App Settings); a new language starts with an empty dictionary and must be enabled. The <b>default language</b> is the fallback shown when a text has no translation in the user’s language; its initial value is <b>English (US)</b>.',
            simple: 'Turn on extra languages in settings; each one starts blank until you translate. The default language is the safety net — if something isn’t translated, users see the default text instead.',
            terms: ['Language Settings', 'Default language', 'Fallback'],
          },
          {
            id: 'i-translation-2',
            title: 'Batch translate, selector & system texts',
            depth: 'card',
            tech: '<b>Batch translate</b> shows the complete list of translatable texts for a <b>source</b> and <b>destination</b> language so you can fill many at once (optionally per module). The <b>Language Selector</b> widget (data source <code>System.Language</code>) lets users switch language at runtime. <b>System texts</b> are standard UI messages you can translate per language; missing ones fall back to the default.',
            simple: 'Batch translate lists everything needing translation side by side so you power through it. The Language Selector is a dropdown users pick their language from. System texts are the built-in messages (like validation popups) you can also translate.',
            terms: ['Batch translate', 'Language Selector', 'System texts'],
          },
        ],
        quiz: [
          { q: 'Which feature lists all translatable texts of a source and destination language together?', options: ['System texts', 'Batch translate', 'Language selector', 'The domain model'], correct: 1, why: 'Batch translate shows every translatable text side by side.' },
          { q: 'The default language is…', options: ['Always Dutch', 'The fallback when a text isn’t translated; initially English (US)', 'The anonymous user’s language', 'Disabled by default'], correct: 1, why: 'It is the fallback, starting as English (US).' },
          { q: 'Users switch language at runtime with…', options: ['A reinstall', 'The Language Selector widget', 'The domain model', 'They cannot'], correct: 1, why: 'The Language Selector widget switches among enabled languages.' },
          { q: 'You add a new language in…', options: ['App Security', 'Language Settings (App Settings)', 'The domain model', 'Navigation'], correct: 1, why: 'Languages are managed under Language Settings.' },
        ],
      },
    ],
  },

  /* ========================================================= ADVANCED */
  {
    id: 'advanced',
    name: 'Advanced Developer',
    tagline: 'Integration, extensibility, workflows, performance & ALM.',
    color: '#f59e0b',
    icon: '🧠',
    status: 'preview',
    modules: [
      {
        id: 'a-integration',
        title: 'Integration: REST, SOAP & OData',
        icon: '🔌',
        accent: 'cyan',
        blurb: 'Connect Mendix to other systems in every direction.',
        lessons: [
          {
            id: 'a-integration-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'Consuming and publishing <b>REST</b> and <b>SOAP</b> services, <b>OData</b> and the <b>Data Hub</b>, <b>published/consumed</b> services, request/response <b>mappings</b>, authentication, and integration patterns (sync vs async, batching, error handling).',
            simple: 'This is the "make Mendix talk to everything" module — pulling data in and pushing it out through the common web standards, safely and reliably. Full lessons + quiz land in a later update.',
            terms: ['REST', 'SOAP', 'OData', 'Data Hub'],
          },
        ],
        quiz: [],
      },
      {
        id: 'a-java',
        title: 'Java Actions & Extensibility',
        icon: '☕',
        accent: 'purple',
        blurb: 'Drop to code when low-code needs a hand.',
        lessons: [
          {
            id: 'a-java-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'Writing <b>Java actions</b> and using the <b>Mendix Runtime API</b>, custom <b>JavaScript actions</b> for nanoflows, building <b>pluggable widgets</b>, and knowing when custom code is (and isn’t) the right call.',
            simple: 'When the visual tools can’t do something, you extend Mendix with a little real code. This module shows how to do that cleanly. Full lessons + quiz coming in a later update.',
            terms: ['Java action', 'JavaScript action', 'Pluggable widget'],
          },
        ],
        quiz: [],
      },
      {
        id: 'a-workflows',
        title: 'Workflows',
        icon: '🔀',
        accent: 'lime',
        blurb: 'Long-running, human-in-the-loop business processes.',
        lessons: [
          {
            id: 'a-workflows-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'The <b>Workflow</b> engine: user tasks, decisions, parallel paths, the workflow context entity, the Workflow Commons module, and building admin/end-user task interfaces.',
            simple: 'Workflows model real business processes that span days and people — approvals, onboarding, reviews — with human steps built in. Full lessons + quiz coming soon.',
            terms: ['Workflow', 'User task', 'Workflow context'],
          },
        ],
        quiz: [],
      },
      {
        id: 'a-performance',
        title: 'Performance & Scalability',
        icon: '⚡',
        accent: 'amber',
        blurb: 'Fast apps that scale — and how to find bottlenecks.',
        lessons: [
          {
            id: 'a-performance-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'Retrieve/XPath optimisation, indexes, avoiding N+1 retrieves, caching, pagination, microflow profiling, horizontal scaling, and reading APM/metrics.',
            simple: 'How to keep your app snappy as data and users grow — spotting slow spots and fixing them. Full lessons + quiz coming soon.',
            terms: ['Optimisation', 'Indexes', 'Profiling', 'Scaling'],
          },
        ],
        quiz: [],
      },
      {
        id: 'a-security',
        title: 'Advanced Security',
        icon: '🛡️',
        accent: 'pink',
        blurb: 'SSO, encryption, and hardening for production.',
        lessons: [
          {
            id: 'a-security-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'SSO/<b>SAML</b>/<b>OIDC</b>, the MendixSSO module, encryption &amp; secrets, secure deployment, entity-access design patterns, and security review/testing.',
            simple: 'Enterprise-grade security: single sign-on, encryption, and locking an app down for real-world production use. Full lessons + quiz coming soon.',
            terms: ['SSO', 'SAML', 'OIDC', 'Encryption'],
          },
        ],
        quiz: [],
      },
      {
        id: 'a-almcicd',
        title: 'CI/CD & ALM',
        icon: '🏗️',
        accent: 'blue',
        blurb: 'Automated pipelines and application lifecycle management.',
        lessons: [
          {
            id: 'a-almcicd-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'Application lifecycle management, automated build/test/deploy pipelines, the Mendix APIs for CI/CD, environments &amp; branching strategy, and quality gates.',
            simple: 'How teams ship changes automatically and safely, over and over, without manual steps. Full lessons + quiz coming soon.',
            terms: ['ALM', 'CI/CD', 'Pipeline', 'Quality gate'],
          },
        ],
        quiz: [],
      },
    ],
  },

  /* =========================================================== EXPERT */
  {
    id: 'expert',
    name: 'Expert Developer',
    tagline: 'Architecture, patterns and the platform SDK — earned by experience.',
    color: '#ec4899',
    icon: '👑',
    status: 'preview',
    modules: [
      {
        id: 'e-architecture',
        title: 'Solution Architecture',
        icon: '🏛️',
        accent: 'purple',
        blurb: 'Designing large, multi-app Mendix solutions.',
        lessons: [
          {
            id: 'e-architecture-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'Multi-app landscapes, microservices vs monolith trade-offs, shared services &amp; the Data Hub, module/app boundaries, and non-functional requirements at scale.',
            simple: 'Expert-level design thinking: how to structure big systems made of many Mendix apps that work together. Expert certification is experience/portfolio-based; this track is guidance. Full content later.',
            terms: ['Architecture', 'Microservices', 'Data Hub'],
          },
        ],
        quiz: [],
      },
      {
        id: 'e-patterns',
        title: 'Best-Practice Patterns',
        icon: '📐',
        accent: 'cyan',
        blurb: 'Proven patterns and anti-patterns.',
        lessons: [
          {
            id: 'e-patterns-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'Reusable modelling patterns, naming/structure conventions, error &amp; logging strategies, the Mendix best-practice guidelines, and recognising anti-patterns in reviews.',
            simple: 'The accumulated wisdom of doing Mendix well — the patterns experts reach for and the traps they avoid. Full content later.',
            terms: ['Patterns', 'Conventions', 'Anti-patterns'],
          },
        ],
        quiz: [],
      },
      {
        id: 'e-sdk',
        title: 'Platform SDK & APIs',
        icon: '🧩',
        accent: 'lime',
        blurb: 'Automate and extend the platform itself.',
        lessons: [
          {
            id: 'e-sdk-1',
            title: 'What this module covers',
            depth: 'card',
            tech: 'The <b>Mendix Platform SDK</b> and <b>Model SDK</b> for programmatic model changes, the Platform APIs (Deploy, Build, Projects), and automation use-cases.',
            simple: 'At the top end you can script Mendix itself — generating or changing app models with code and automating platform tasks. Full content later.',
            terms: ['Platform SDK', 'Model SDK', 'Platform APIs'],
          },
        ],
        quiz: [],
      },
    ],
  },
]

/* ---------------- derived helpers ---------------- */
export const LEVEL_BY_ID = Object.fromEntries(COURSES.map((l) => [l.id, l]))

export function findModule(levelId: string, moduleId: string) {
  const level = LEVEL_BY_ID[levelId]
  const module = level?.modules.find((m) => m.id === moduleId)
  return { level, module }
}

export function allModules() {
  return COURSES.flatMap((l) => l.modules.map((m) => ({ level: l, module: m })))
}

/** total lessons across gradable (available) levels */
export function totalGradableLessons() {
  return COURSES.filter((l) => l.status === 'available').reduce(
    (sum, l) => sum + l.modules.reduce((s, m) => s + m.lessons.length, 0),
    0,
  )
}

/** module ids that have a quiz, per available level */
export function gradableModuleIds(levelId?: string) {
  return COURSES.filter((l) => l.status === 'available' && (!levelId || l.id === levelId))
    .flatMap((l) => l.modules)
    .filter((m) => m.quiz.length > 0)
    .map((m) => m.id)
}
