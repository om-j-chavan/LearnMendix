/**
 * Mock-exam engine for the Mendix Intermediate Developer certification.
 *
 * IMPORTANT: these are ORIGINAL practice questions written to mirror the real
 * exam's format, topic weighting and difficulty — they are NOT copied from the
 * actual (confidential) certification. Every answer is aligned with the public
 * Mendix documentation (docs.mendix.com). Treat this as realistic practice.
 *
 * Distractors are written to be PLAUSIBLE near-misses (same length/register as
 * the correct answer, representing common misconceptions) so the answer can't be
 * guessed by shape. The teaching detail lives in `why`, shown after you answer.
 *
 * Real exam parameters replicated below: 50 questions, 90 minutes, 75% to pass,
 * weighted by the community-reported module blueprint.
 */

export type ExamModule =
  | 'Domain Model'
  | 'Security'
  | 'Pages'
  | 'Microflows'
  | 'Agile'
  | 'XPath'
  | 'Modules'
  | 'Translation'

/** How many questions of each module appear on a 50-question exam. */
export const BLUEPRINT: Record<ExamModule, number> = {
  'Domain Model': 10,
  Security: 8,
  Pages: 7,
  Microflows: 7,
  Agile: 6,
  XPath: 5,
  Modules: 4,
  Translation: 3,
}

export const EXAM = { count: 50, minutes: 90, passPct: 75 }

/** A pool seed: correct answer `a` + three distractors `d`. Options get shuffled at runtime. */
interface Seed {
  m: ExamModule
  q: string
  a: string
  d: [string, string, string]
  why: string
}

const POOL: Seed[] = [
  /* ------------------------------ Domain Model ------------------------------ */
  { m: 'Domain Model', q: 'Which association multiplicities can you model between two entities?', a: 'One-to-one, one-to-many and many-to-many', d: ['One-to-many and many-to-many only', 'One-to-one and one-to-many only', 'Many-to-one and many-to-many only'], why: 'Mendix supports all three; the type derives from Reference vs Reference set plus the Owner property.' },
  { m: 'Domain Model', q: 'What is the difference between a Reference and a Reference set association?', a: 'A Reference holds at most one object on the owner side; a Reference set holds many (many-to-many)', d: ['A Reference set holds one object; a Reference holds many', 'A Reference is one-directional; a Reference set is bidirectional', 'A Reference is stored in the database; a Reference set lives in memory'], why: 'Reference = single-valued end; Reference set = the multi-valued many-to-many end.' },
  { m: 'Domain Model', q: 'In a one-to-many association, on which entity is the reference (foreign key) stored?', a: 'On the "many" side, which owns the association', d: ['On the "one" side, which owns the association', 'In a separate join table generated for the pair', 'On whichever entity is created first at runtime'], why: 'For 1-* the many side owns the reference; only many-to-many uses a join table.' },
  { m: 'Domain Model', q: 'How does generalization differ from an association?', a: 'Generalization is inheritance ("is-a"); an association links two independent entities ("has-a")', d: ['Generalization links two independent entities; an association is inheritance', 'Generalization works only within a module; associations only span modules', 'Generalization is resolved at runtime; associations are design-time only'], why: 'A specialization inherits from its generalization; an association connects separate entities.' },
  { m: 'Domain Model', q: 'A specialization inherits which of these from its generalization?', a: 'Attributes, associations and validation rules, but not access rules', d: ['Attributes, associations, validation rules and access rules', 'Only attributes and associations, not validation rules', 'Only access rules and validation rules, not members'], why: 'Members and validation inherit; entity access rules must be defined per entity.' },
  { m: 'Domain Model', q: 'What are the three delete-behavior options on an association?', a: 'Keep the associated objects, delete them too, or block the delete if still associated', d: ['Keep, archive, or overwrite the associated objects', 'Cascade, restrict, or set-null the associated objects', 'Delete on commit, delete on rollback, or delete on retrieve'], why: 'The options are keep (default), cascade delete, or prevent-with-error.' },
  { m: 'Domain Model', q: 'To automatically delete a Customer’s Orders when the Customer is deleted, set delete behavior to…', a: 'Delete the Customer and its associated Order objects as well', d: ['Delete the Customer but keep its Order objects', 'Delete the Customer only if it has no Order objects', 'Delete the Order objects but keep the Customer'], why: 'Cascading delete propagates the delete to associated objects.' },
  { m: 'Domain Model', q: 'Which delete behavior stops a Customer being deleted while it still has Orders?', a: 'Delete the Customer only if it is not associated with an Order (show an error)', d: ['Delete the Customer and cascade to its Orders', 'Delete the Customer and keep its Orders', 'Roll back the transaction and retry the delete'], why: 'Prevent-delete blocks the action and shows the configured message.' },
  { m: 'Domain Model', q: 'What characterises a non-persistable entity?', a: 'Its objects live in memory for the session and are not stored in a database table', d: ['Its objects are stored in the database but cleared each night', 'Its objects are stored only on the client device', 'Its objects are stored in a separate in-memory database table'], why: 'Non-persistable entities have no table; their values live in memory.' },
  { m: 'Domain Model', q: 'Which is a genuine limitation of non-persistable entities?', a: 'You cannot define an index on them', d: ['They cannot have associations to other entities', 'They cannot be shown in a data view', 'They cannot be created inside a microflow'], why: 'With no database table there are no indexes (and no stored validation); the others are all possible.' },
  { m: 'Domain Model', q: 'How does an AutoNumber attribute get its value?', a: 'The database assigns the next incrementing whole number automatically', d: ['A microflow computes it each time the object is retrieved', 'The user types it in when creating the object', 'The runtime generates a random unique value'], why: 'AutoNumber is database-generated, incrementing, and stored — not user-editable.' },
  { m: 'Domain Model', q: 'What does an Enumeration attribute store?', a: 'One value chosen from a fixed, developer-defined list', d: ['Several of the predefined values selected at once', 'A reference to a related object', 'Free text validated against a pattern'], why: 'An enumeration constrains the attribute to one predefined option.' },
  { m: 'Domain Model', q: 'How does a calculated attribute differ from a stored attribute?', a: 'A microflow recomputes it on every retrieve; it is not saved and cannot be sorted on', d: ['It is cached in the database and refreshed on each commit', 'It is stored but hidden from pages by default', 'It is computed once at creation and then stored'], why: 'Calculated attributes run a microflow on read and are not persisted.' },
  { m: 'Domain Model', q: 'What is the effect of adding an index to an attribute?', a: 'Faster searching on it, but slower inserts, updates and deletes', d: ['Faster searching and faster writes across the board', 'Slower searching but faster writes', 'It makes the attribute unique and required'], why: 'Indexes trade faster reads for slower writes, and only exist on persistable entities.' },
  { m: 'Domain Model', q: 'To store an uploaded image, which system entity should your entity generalize from?', a: 'System.Image', d: ['System.FileDocument', 'System.FileBlob', 'System.User'], why: 'System.Image specialises FileDocument and adds thumbnail handling for images.' },
  { m: 'Domain Model', q: 'If two access rules for the same module role apply to an entity, how are the rights combined?', a: 'The rights of all applicable rules are added together', d: ['Only the most restrictive rule’s rights apply', 'Only the first rule in the list applies', 'The rules conflict and none apply until resolved'], why: 'Mendix unions the granted rights across all matching rules.' },

  /* --------------------------------- Security -------------------------------- */
  { m: 'Security', q: 'Which are the three application security levels?', a: 'Off, Prototype/Demo, and Production', d: ['Off, Development, and Production', 'Basic, Standard, and Production', 'Prototype, Acceptance, and Production'], why: 'The three security levels are Off, Prototype/Demo and Production.' },
  { m: 'Security', q: 'At Prototype/Demo security, what is enforced?', a: 'Sign-in, page and microflow access — but not entity (data) access', d: ['Sign-in only; pages and microflows stay open', 'Sign-in, page, microflow and entity access — everything', 'Entity access only; pages and microflows stay open'], why: 'Prototype checks sign-in/page/microflow; data access is only enforced at Production.' },
  { m: 'Security', q: 'Where is the "Off" security level allowed to run?', a: 'Locally and on Free Apps only', d: ['On any environment, including licensed Production', 'On Acceptance and Production, but not locally', 'Only on licensed Production nodes'], why: 'With no security enforced, Off cannot be used for licensed production deployments.' },
  { m: 'Security', q: 'Moving to Production security makes which configuration mandatory that Prototype does not?', a: 'Entity (data) access rules', d: ['Page access', 'Microflow access', 'A configured sign-in page'], why: 'The others are already enforced at Prototype; Production adds entity/dataset access.' },
  { m: 'Security', q: 'How do user roles relate to module roles?', a: 'A user role groups one or more module roles; end-users are assigned user roles', d: ['A module role groups one or more user roles; end-users are assigned module roles', 'User roles and module roles are the same thing under different names', 'End-users are assigned both user roles and module roles directly'], why: 'User roles bundle module roles, which carry the actual access rights.' },
  { m: 'Security', q: 'Why does Mendix keep module roles separate from user roles?', a: 'So a module stays self-contained and reusable across apps', d: ['So end-users can see and choose their own module roles', 'So each module can have its own sign-in page', 'So security can be switched off per module'], why: 'Module roles keep a module independent of the app it lives in.' },
  { m: 'Security', q: 'Where do you connect user roles to module roles?', a: 'In App Security, on the User roles tab', d: ['In each module’s own settings', 'In the Navigation document', 'In System administration at runtime'], why: 'The user-role to module-role mapping is configured in App Security.' },
  { m: 'Security', q: 'What can a single entity access rule define?', a: 'Create/read/write/delete rights, per-member access, and an XPath row constraint', d: ['Only which module roles may read the entity', 'Only the pages on which the entity may appear', 'Only whether the entity is persistable'], why: 'Access rules combine object CRUD, per-member access and an XPath row constraint.' },
  { m: 'Security', q: 'What does an XPath constraint on an access rule limit, and where does it work?', a: 'The rows a role can access; on persistable entities only', d: ['The columns a role can read; on any entity', 'The pages a role can open; on any entity', 'The microflows a role can run; on persistable entities only'], why: 'It filters rows against the database, so it works on persistable entities only.' },
  { m: 'Security', q: 'How is attribute-level (member) security set?', a: 'By choosing Read or Read+Write per member inside the access rule', d: ['By writing a microflow that checks each attribute', 'By hiding the attribute with conditional visibility', 'By marking the attribute as private in the domain model'], why: 'Member checkboxes in the access rule control read/write per attribute and association.' },
  { m: 'Security', q: 'Which statement about page access is correct?', a: 'It is set per module role and controls navigation/buttons, but data still needs entity access', d: ['It fully protects a page’s data, even from deep links', 'It is set per user role directly on the page', 'It is only checked at the Production security level'], why: 'Page access controls visibility; entity access is what actually protects the data.' },
  { m: 'Security', q: 'With Production security, how do you let people use the app without an account?', a: 'Turn on anonymous access in App Security and give it a user role', d: ['Lower the security level to Prototype/Demo', 'Grant the Administrator role to everyone', 'Share a demo user’s login publicly'], why: 'Anonymous access is enabled in App Security with an assigned (tightly-scoped) role.' },
  { m: 'Security', q: 'What are demo users for?', a: 'Signing in as each user role to test the app locally or on a Free App', d: ['Seeding realistic sample data into Production', 'Giving external users temporary Production access', 'Load-testing the app with many concurrent logins'], why: 'Mendix creates one demo user per role (local/Free App only) to test each role.' },

  /* ---------------------------------- Pages ---------------------------------- */
  { m: 'Pages', q: 'Which widget is designed to show a single object?', a: 'Data view', d: ['List view', 'Data grid', 'Template grid'], why: 'A data view is bound to one object; the others display lists.' },
  { m: 'Pages', q: 'Which widget shows a list where you design the template for each item?', a: 'List view', d: ['Data grid', 'Data view', 'Reference set selector'], why: 'A list view renders each object with a template you build in its drop zone.' },
  { m: 'Pages', q: 'Which widget shows objects as rows in a table with built-in search and sorting?', a: 'Data grid', d: ['List view', 'Template grid', 'Gallery'], why: 'A data grid shows objects in columns with search, sort and paging.' },
  { m: 'Pages', q: 'Which data sources can fill a list view?', a: 'Database, association, microflow or nanoflow', d: ['Database or association only', 'Microflow or REST call only', 'Database, REST or a static list literal'], why: 'Data widgets accept database, association, microflow or nanoflow sources.' },
  { m: 'Pages', q: 'How does a snippet differ from a building block?', a: 'A snippet is one reusable definition that updates everywhere; a building block is copied onto the page', d: ['A building block updates everywhere; a snippet is copied onto the page', 'Both are copied onto the page and then edited independently', 'Both stay linked so edits always propagate everywhere'], why: 'Editing a snippet updates every use; a building block is a one-time copy.' },
  { m: 'Pages', q: 'What is the empty area of a layout that a page fills in called?', a: 'A placeholder', d: ['A snippet', 'A building block', 'A content region'], why: 'Placeholders are the gaps in a layout that pages fill.' },
  { m: 'Pages', q: 'When one layout is based on another, what is the underlying one called?', a: 'The master layout', d: ['The base snippet', 'The parent profile', 'The root template'], why: 'The master layout is the layout another layout is based on.' },
  { m: 'Pages', q: 'How do you show a widget only to certain module roles?', a: 'Set its conditional visibility for those roles', d: ['Move it into a role-specific layout', 'Wrap it in a security microflow', 'Give it an XPath constraint'], why: 'Conditional visibility can target module roles (or an attribute/expression).' },
  { m: 'Pages', q: 'Which page template gives you a multi-step form with a progress indicator?', a: 'A wizard template', d: ['A list-detail template', 'A dashboard template', 'A master-detail grid template'], why: 'Wizard templates lay out multi-step forms with a progress bar.' },
  { m: 'Pages', q: 'Where do you change global colours and fonts without writing CSS?', a: 'The Theme Editor / design properties', d: ['The Navigation document', 'The App Security settings', 'Each page’s inline styles'], why: 'The Theme Editor and design properties apply Atlas styling through the UI.' },
  { m: 'Pages', q: 'A user opens a web app on a tablet, but there is no Tablet navigation profile. Which is used?', a: 'The Responsive profile', d: ['The Phone profile', 'The Native mobile profile', 'None — access is refused'], why: 'Devices fall back to the Responsive profile, which cannot be deleted.' },

  /* -------------------------------- Microflows ------------------------------- */
  { m: 'Microflows', q: 'At runtime, how many outgoing paths does an exclusive split (decision) take?', a: 'Exactly one', d: ['Every path whose condition is true', 'One path per enumeration value, together', 'None until it reaches a merge'], why: 'A decision takes one and only one outgoing path; Mendix has no inclusive split.' },
  { m: 'Microflows', q: 'Which element joins several paths so a shared activity is modelled only once?', a: 'A merge', d: ['An exclusive split', 'A loop', 'An end event'], why: 'A merge recombines multiple sequence flows into one.' },
  { m: 'Microflows', q: 'Inside a loop, what represents the current object of each pass?', a: 'The iterator', d: ['The input parameter', 'The change variable', 'The list activity'], why: 'The iterator is the current list object on each pass.' },
  { m: 'Microflows', q: 'Which two events can be used only inside a loop?', a: 'Break and Continue', d: ['Start and End', 'Merge and Split', 'Retrieve and Commit'], why: 'Break exits the loop; Continue skips to the next object.' },
  { m: 'Microflows', q: 'Which aggregate function needs no attribute selected?', a: 'Count', d: ['Sum', 'Average', 'Maximum'], why: 'Count returns the number of objects; the others need a numeric attribute.' },
  { m: 'Microflows', q: 'Sum and Average can aggregate over which attribute type?', a: 'Numeric (Integer, Long or Decimal)', d: ['String', 'Boolean', 'Enumeration'], why: 'Sum, Average, Minimum and Maximum work on numeric values only.' },
  { m: 'Microflows', q: 'An activity set to "Custom without rollback" fails. What happens?', a: 'Changes made before the error are kept, and the error path is followed', d: ['All changes are rolled back, and the error path is followed', 'All changes are rolled back, and the microflow stops', 'The error is ignored and the normal path continues'], why: 'It keeps prior changes and routes execution down the error path.' },
  { m: 'Microflows', q: 'An activity set to "Custom with rollback" fails. What happens to the changes?', a: 'All changes are rolled back, then the error path is followed', d: ['All changes are kept, then the error path is followed', 'Only the failed activity’s change is rolled back', 'Changes are kept and the microflow stops'], why: 'It reverts the scope, then follows the custom error path.' },
  { m: 'Microflows', q: 'You changed an object in a microflow, but an open page still shows the old value. What updates it?', a: 'Committing the object with "Refresh in client" set to Yes', d: ['Changing the object again with events enabled', 'Retrieving the object from the database afterwards', 'Adding a Close page then Show page activity'], why: 'Commit persists the change; Refresh in client pushes it to open pages.' },
  { m: 'Microflows', q: 'Does retrieving "by association" always avoid a database query?', a: 'No — if the associated object is not already in memory, the database is queried', d: ['Yes — association retrieves never touch the database', 'Yes — but only inside nanoflows', 'No — association retrieves always query the database'], why: 'It skips the database only when the object is already loaded.' },
  { m: 'Microflows', q: 'Which activity fetches data from an external REST API?', a: 'Call REST service', d: ['Import mapping', 'Retrieve object', 'Consume web service'], why: 'Call REST service makes the request; an import mapping then parses the response.' },
  { m: 'Microflows', q: 'What is the difference between an import mapping and an export mapping?', a: 'Import turns incoming JSON/XML into objects; export turns objects into JSON/XML', d: ['Import turns objects into JSON/XML; export turns JSON/XML into objects', 'Import reads from the database; export writes to it', 'Import is for REST; export is for SOAP'], why: 'Import = data in to objects; export = objects out to JSON/XML.' },

  /* ---------------------------------- Agile ---------------------------------- */
  { m: 'Agile', q: 'What does Mendix call the developers on a Scrum team?', a: 'Business Engineers', d: ['Solution Consultants', 'Low-code Analysts', 'Platform Administrators'], why: 'Mendix labels its app developers Business Engineers.' },
  { m: 'Agile', q: 'What is the Scrum Master mainly responsible for?', a: 'Facilitating the process and removing the team’s impediments', d: ['Owning and prioritising the product backlog', 'Signing off each release for production', 'Assigning tasks to individual developers'], why: 'The Scrum Master serves the team and clears blockers.' },
  { m: 'Agile', q: 'What is the Product Owner mainly responsible for?', a: 'Prioritising the backlog to maximise delivered value', d: ['Removing the team’s impediments', 'Running the daily stand-up as a status report', 'Estimating each story in hours'], why: 'The Product Owner owns and prioritises the backlog.' },
  { m: 'Agile', q: 'How is the product backlog ordered?', a: 'Most important items at the top, descending by priority', d: ['Oldest items at the top, by creation date', 'Smallest items at the top, by story points', 'Grouped by developer, then alphabetically'], why: 'The backlog is a prioritised list, highest value first.' },
  { m: 'Agile', q: 'What do story points estimate?', a: 'The relative complexity/effort of a story', d: ['The exact number of hours a story will take', 'The number of developers a story needs', 'The business priority of a story'], why: 'Story points are a relative estimate of complexity, not hours.' },
  { m: 'Agile', q: 'What does the Mendix Team Server provide?', a: 'Git-based version control with history, branches and merging', d: ['Managed hosting for the Production app', 'A shared database across all environments', 'Automated build and deploy pipelines'], why: 'Team Server is the built-in version control for the app model.' },
  { m: 'Agile', q: 'Which option merges an entire branch back into the main line?', a: 'Merge feature branch (offered on the main line)', d: ['Advanced merge (offered on the branch line)', 'Reverse-integrate (offered on any line)', 'Fast-forward commit (offered on the main line)'], why: 'Merge feature branch folds a whole branch into main; advanced merge cherry-picks revisions.' },
  { m: 'Agile', q: 'What is a "tagged version" in the Team Server?', a: 'A revision that was used to build a deployment package', d: ['A revision marked as the current sprint goal', 'The most recent commit on the main line', 'A branch created to hold a hotfix'], why: 'Building a deployment package tags the underlying revision.' },
  { m: 'Agile', q: 'What are the standard environments on a licensed Mendix Cloud node?', a: 'Test, Acceptance and Production', d: ['Development, Staging and Production', 'Sandbox, Test and Live', 'Local, Acceptance and Production'], why: 'Licensed nodes provide a Test → Acceptance → Production pipeline.' },

  /* ---------------------------------- XPath ---------------------------------- */
  { m: 'XPath', q: 'Which token represents the currently logged-in user?', a: '[%CurrentUser%]', d: ['[%CurrentObject%]', '[%CurrentSession%]', '[%CurrentAccount%]'], why: 'It resolves to the logged-in user’s object GUID.' },
  { m: 'XPath', q: 'Which constraint returns only the current user’s own submitted requests?', a: "[Module.Request_Submitter = '[%CurrentUser%]']", d: ["[Module.Request_Submitter != '[%CurrentUser%]']", "[Module.Request_Submitter = '[%CurrentObject%]']", "[Submitter/Name = '[%CurrentUser%]']"], why: 'It compares the Submitter association to the current-user token.' },
  { m: 'XPath', q: 'How do you constrain on an attribute of an associated entity?', a: 'Traverse the association with slashes: association/entity/attribute', d: ['Reference the attribute directly by its name', 'Use a dot path: association.entity.attribute', 'Join the entities in an OQL sub-select'], why: 'XPath follows associations with "/".' },
  { m: 'XPath', q: 'Which keyword matches attributes that have no value?', a: 'empty', d: ['null', 'nil', 'default'], why: 'The empty keyword matches members with no value.' },
  { m: 'XPath', q: 'What do the XPath functions contains() and starts-with() test?', a: 'Whether a string contains, or begins with, a given substring', d: ['Whether a list contains, or begins with, a given object', 'Whether a number is within, or above, a given range', 'Whether an association points to, or from, an object'], why: 'They are string constraint functions for substring matching.' },
  { m: 'XPath', q: 'What do [%CurrentUser%] and [%CurrentObject%] resolve to?', a: 'The GUID of the logged-in user, and the GUID of the object in context', d: ['The name of the logged-in user, and the name of the object', 'Both resolve to the current session id', 'The user’s role, and the object’s entity type'], why: 'Both are system variables that resolve to object GUIDs.' },
  { m: 'XPath', q: 'How do you require two constraints to both be true on the same entity?', a: 'Chain the brackets, [a][b] (equivalent to using "and")', d: ['Separate them with a comma, [a, b]', 'Put a slash between them, [a]/[b]', 'Nest them, [[a][b]]'], why: 'Adjacent bracket constraints are implicitly AND-ed.' },
  { m: 'XPath', q: 'Where can XPath constraints be used?', a: 'In access rules, microflow/data-source retrieves and page data sources', d: ['In access rules only', 'In microflows only, not on pages', 'In nanoflows and Java actions only'], why: 'XPath filters data in access rules, retrieves and page data sources.' },

  /* --------------------------------- Modules --------------------------------- */
  { m: 'Modules', q: 'Which of these can a Mendix module contain?', a: 'A domain model, pages, microflows, module roles and resources', d: ['Only pages and microflows', 'Only a domain model and its data', 'Only user roles and navigation'], why: 'A module bundles a domain model, documents and its own module roles.' },
  { m: 'Modules', q: 'Where does a module downloaded from the Marketplace appear?', a: 'In the App Explorer, under the Marketplace modules folder', d: ['Inside the System module', 'Merged into your main module', 'In a read-only external references list'], why: 'Marketplace content lands in the Marketplace-modules folder and behaves like your own modules.' },
  { m: 'Modules', q: 'After importing a module that has its own module roles (Prototype/Production), what must you do?', a: 'Map its module roles to your app’s user roles in App Security', d: ['Recreate its module roles as user roles', 'Nothing — imported roles work automatically', 'Delete your existing user roles first'], why: 'Every module role must be mapped to a user role to take effect.' },
  { m: 'Modules', q: 'Module roles grant access to which of these?', a: 'The pages, microflows and entities within that module', d: ['Every module across the whole app', 'Only the entities, not pages or microflows', 'Only Marketplace-downloaded content'], why: 'All in-module security is granted per module role.' },
  { m: 'Modules', q: 'How do you reuse a module you built in another app?', a: 'Export it as a module package and import that into the other app', d: ['Copy its database tables across', 'Reference it by URL from the other app', 'Recreate it by hand in the other app'], why: 'Modules export as a package for import elsewhere.' },
  { m: 'Modules', q: 'What does referencing another module’s entity create?', a: 'A dependency between the two modules that you should manage', d: ['A private copy of the entity in your module', 'A cross-module security hole', 'Nothing — modules are always independent'], why: 'Cross-module references couple the modules; keep the dependency clean.' },

  /* -------------------------------- Translation ------------------------------ */
  { m: 'Translation', q: 'Which feature lists all translatable texts for a source and destination language together?', a: 'Batch translate', d: ['System texts', 'The Language Selector', 'Export to Excel'], why: 'Batch translate lists every translatable text side by side.' },
  { m: 'Translation', q: 'What is the default language used for?', a: 'The fallback text shown when a translation is missing (initially English US)', d: ['The only language available in Studio Pro', 'The language forced on anonymous users', 'The language used for the server logs'], why: 'The default language is the fallback, starting as English (US).' },
  { m: 'Translation', q: 'How can an end-user switch the app’s language at runtime?', a: 'With the Language Selector widget', d: ['By changing the default language in Studio Pro', 'By editing their account’s locale in the database', 'They cannot — language is fixed at deploy time'], why: 'The Language Selector widget switches among the enabled languages.' },
  { m: 'Translation', q: 'Where do you add a new language to an app?', a: 'In Language Settings (App Settings)', d: ['In App Security', 'In the Navigation document', 'In each page’s properties'], why: 'Languages are managed under Language Settings.' },
  { m: 'Translation', q: 'What are "system texts"?', a: 'The platform’s built-in UI messages, which you can translate per language', d: ['Texts entered by end-users and stored in entities', 'The captions you type on your own pages', 'Log and error messages written to the console'], why: 'System texts are standard UI strings; missing translations fall back to the default language.' },
]

export interface ExamQuestion {
  m: ExamModule
  q: string
  options: string[]
  correct: number
  why: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function build(seed: Seed): ExamQuestion {
  const options = shuffle([seed.a, ...seed.d])
  return { m: seed.m, q: seed.q, options, correct: options.indexOf(seed.a), why: seed.why }
}

/** Generate a fresh, blueprint-weighted 50-question exam with shuffled options. */
export function generateExam(): ExamQuestion[] {
  const chosen: Seed[] = []
  const used = new Set<Seed>()
  ;(Object.keys(BLUEPRINT) as ExamModule[]).forEach((mod) => {
    const pool = shuffle(POOL.filter((s) => s.m === mod))
    const take = pool.slice(0, BLUEPRINT[mod])
    take.forEach((s) => used.add(s))
    chosen.push(...take)
  })
  // top up if any module pool was short of its blueprint count
  if (chosen.length < EXAM.count) {
    const rest = shuffle(POOL.filter((s) => !used.has(s)))
    chosen.push(...rest.slice(0, EXAM.count - chosen.length))
  }
  return shuffle(chosen).slice(0, EXAM.count).map(build)
}

export function poolCount(): number {
  return POOL.length
}

/** All exam questions as ready-to-render quiz questions (options shuffled). */
export function allExamQuestions(): ExamQuestion[] {
  return POOL.map(build)
}
