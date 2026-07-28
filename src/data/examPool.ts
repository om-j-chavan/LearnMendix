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

  /* ===================== Scenario & deeper questions (expansion) ===================== */

  /* Domain Model */
  { m: 'Domain Model', q: 'A multi-step wizard needs working data that must never be saved to the database. Which entity type fits?', a: 'A non-persistable entity', d: ['A persistable entity you delete at the end', 'A calculated attribute on a persistable entity', 'A System.Session specialization'], why: 'Non-persistable entities hold in-memory data for the session and are never stored.' },
  { m: 'Domain Model', q: 'A Manager has every Employee field plus a bonus, and should be usable wherever an Employee is. Best modelling?', a: 'Make Manager a specialization of Employee (generalization)', d: ['Link Manager to Employee with a one-to-one association', 'Copy the Employee attributes onto a separate Manager entity', 'Add a Boolean "isManager" attribute to Employee'], why: 'Generalization gives Manager all Employee members and "is-a" substitutability.' },
  { m: 'Domain Model', q: 'You must add fields to an imported Marketplace entity without changing the Marketplace module. Best approach?', a: 'Create your own entity with a one-to-one association to the Marketplace entity', d: ['Make your entity a specialization of the Marketplace entity', 'Edit the Marketplace entity and add the attributes', 'Duplicate the Marketplace entity into your module'], why: 'A one-to-one association extends it without editing the imported module (which an upgrade would overwrite).' },
  { m: 'Domain Model', q: 'Deleting a Project should delete its Tasks, but deleting a Task must never delete its Project. How?', a: 'Set cascade on the Project→Task end and keep on the Task→Project end', d: ['Set cascade on both ends of the association', 'Set keep on both ends and handle it in a microflow', 'Set prevent-delete on the Task→Project end'], why: 'Delete behavior is configured independently on each association end.' },
  { m: 'Domain Model', q: 'A grid users open constantly searches on an attribute; writes to it are rare. What improves search speed?', a: 'Add an index on that attribute', d: ['Make the attribute calculated', 'Move the attribute to a non-persistable entity', 'Mark the attribute as the entity’s key'], why: 'Indexes speed searches, and the rare writes make the write-cost trade-off worthwhile.' },
  { m: 'Domain Model', q: 'Each Employee has exactly one Badge and each Badge belongs to exactly one Employee. Which multiplicity?', a: 'One-to-one', d: ['One-to-many', 'Many-to-many', 'Many-to-one'], why: 'Exactly one object on each side is a one-to-one association.' },
  { m: 'Domain Model', q: 'An Order’s status is always one of Open, In Progress or Closed. Best attribute type?', a: 'Enumeration', d: ['String with validation', 'Integer status code', 'A Boolean per status'], why: 'An enumeration constrains the value to a fixed, predefined set.' },
  { m: 'Domain Model', q: 'You put a calculated attribute as a sortable data grid column and sorting fails. Why?', a: 'Calculated attributes are not stored, so the database cannot sort on them', d: ['Calculated attributes are always text and cannot be ordered', 'Data grids can only sort on associations', 'Sorting needs an index, which grids add automatically'], why: 'Only stored attributes can be sorted by the database.' },
  { m: 'Domain Model', q: 'A Student can enrol in many Courses and a Course has many Students. Multiplicity and type?', a: 'Many-to-many, using a Reference set', d: ['One-to-many, using a Reference', 'One-to-one, using a Reference', 'Many-to-one, using a Reference set'], why: 'Many-to-many is modelled with a Reference set.' },
  { m: 'Domain Model', q: 'In a one-to-many Customer–Order association, from which object do you set the link in a microflow?', a: 'From the Order (the many/owner side), setting its Customer', d: ['From the Customer, setting its single Order', 'From either side; there is no owner', 'From a separate association object you create'], why: 'The many side owns the reference, so you set the association on the Order.' },
  { m: 'Domain Model', q: 'Does cascade/prevent delete behavior also apply to associated objects that are only in memory (not committed)?', a: 'Yes — delete behavior is evaluated in memory too', d: ['No — only committed objects are affected', 'Only for non-persistable entities', 'Only inside a microflow with events enabled'], why: 'Mendix evaluates the association in memory, so delete behavior fires for uncommitted objects.' },

  /* Security */
  { m: 'Security', q: 'Anonymous visitors may submit a form but must only see their own submissions. What do you configure?', a: 'An anonymous user role with an XPath instance constraint limiting rows to their own', d: ['An anonymous role with full read access to the entity', 'Page access only, with no entity access rule', 'The Administrator role for anonymous users'], why: 'Instance (XPath) access keeps anonymous users to records they created.' },
  { m: 'Security', q: 'A role can open a page, but one field raises a security error for that role. Best fix?', a: 'Grant that role read access to the attribute (or hide it via conditional visibility)', d: ['Delete the field from the page', 'Lower the app to Prototype security', 'Give the role the Administrator module role'], why: 'The consistency error means the member lacks access for that role — grant it or hide it.' },
  { m: 'Security', q: 'A role should be able to trigger a microflow but must not open a certain page. How?', a: 'Grant the role microflow access and do not grant it page access', d: ['Grant page access but disable the page’s widgets', 'Move the microflow into a different module', 'Put an XPath constraint on the page'], why: 'Page and microflow access are granted independently per module role.' },
  { m: 'Security', q: 'A user reaches a restricted page via a saved URL. Why can their data still be protected?', a: 'Entity access rules still apply, however the page was reached', d: ['Deep links are blocked automatically at Production', 'Page access re-checks on every URL load', 'The session expires when a URL is pasted'], why: 'Page access is UI-level; entity access is the real data guard.' },
  { m: 'Security', q: 'A Sales role must read all Orders but edit only its own. How do you model this?', a: 'A read rule with no constraint plus a write rule constrained by XPath to the owner', d: ['One rule with read+write and an owner constraint', 'Two user roles, one read-only and one read-write', 'Member security set to read-only for everyone'], why: 'Rules are additive: a broad read rule plus a constrained write rule.' },
  { m: 'Security', q: 'You switch to Production security and an entity has no access rules. Who can access its objects?', a: 'No one, until you add a rule granting the needed roles', d: ['Everyone, until you restrict it', 'Only administrators, by default', 'Anonymous users only'], why: 'At Production nothing is granted unless an access rule allows it.' },
  { m: 'Security', q: 'What actually stops a user reading an attribute they should not see?', a: 'An entity access rule that does not grant read on that member', d: ['Removing the attribute from every page', 'Conditional visibility on the widget', 'A microflow that clears the value'], why: 'Member-level access in the entity rule controls read/write; UI hiding is not security.' },
  { m: 'Security', q: 'You are deploying to a licensed Mendix Cloud Production environment. What is the minimum security level?', a: 'Production', d: ['Prototype/Demo', 'Off', 'Any level is accepted'], why: 'Only Production security is permitted on licensed production nodes.' },
  { m: 'Security', q: 'Where do you enable "Allow anonymous users"?', a: 'In App Security', d: ['In the module’s settings', 'In the Navigation document', 'In the anonymous user’s account'], why: 'Anonymous access is turned on in App Security and assigned a role.' },
  { m: 'Security', q: 'You want to click through the app as each role on your machine. Fastest way?', a: 'Sign in with the demo users Mendix generates per user role', d: ['Create real accounts for every role in the database', 'Temporarily set security to Off', 'Assign yourself every module role'], why: 'Demo users (local/Free App) let you test the app as each role.' },

  /* Pages */
  { m: 'Pages', q: 'One address form is reused on five pages and a change must update all five. What do you use?', a: 'A snippet', d: ['A building block', 'A copied container on each page', 'A page template'], why: 'A snippet is a single definition; editing it updates every usage.' },
  { m: 'Pages', q: 'A data view uses a microflow data source. What must that microflow return?', a: 'A single object of the data view’s entity', d: ['A list of objects of the entity', 'A Boolean indicating success', 'Nothing (void)'], why: 'A data view shows one object, so its microflow must return one object.' },
  { m: 'Pages', q: 'You want the navigation bar and header defined once and shared by every page. What provides this?', a: 'A layout with placeholders that pages fill', d: ['A snippet placed on every page', 'A building block on every page', 'The Navigation document'], why: 'Layouts hold shared structure; pages plug content into placeholders.' },
  { m: 'Pages', q: 'A "Delete all" button must appear only for Administrators. How?', a: 'Set the button’s conditional visibility to the Administrator module role', d: ['Put the button on a separate admin-only page', 'Disable the button for non-admins with a microflow', 'Constrain the button with XPath'], why: 'Conditional visibility can restrict a widget to selected module roles.' },
  { m: 'Pages', q: 'You must display thousands of Products in a searchable, sortable, paged table. Best widget?', a: 'A data grid', d: ['A list view', 'A data view', 'A template grid'], why: 'A data grid gives columns with built-in search, sort and paging.' },
  { m: 'Pages', q: 'A list view must show a filtered set that requires logic to build. Which data source?', a: 'A microflow (or nanoflow) data source', d: ['A database source with no constraint', 'A building block', 'A snippet'], why: 'A microflow/nanoflow source can apply logic and return the list.' },

  /* Microflows */
  { m: 'Microflows', q: 'A microflow loops over 5,000 Orders and retrieves each Order’s Customer inside the loop. Main risk?', a: 'An N+1 pattern — thousands of extra database queries', d: ['A rollback loop that never ends', 'A merge conflict on commit', 'A security error on each retrieve'], why: 'Retrieving inside a loop multiplies queries; retrieve once or over an association.' },
  { m: 'Microflows', q: 'A Change Object activity has Commit = No. When is the change persisted?', a: 'Not until a later Commit activity saves the object', d: ['Immediately — Commit only affects refresh', 'When the microflow ends', 'When the page is closed'], why: 'Without a commit, changes stay in memory and are not persisted.' },
  { m: 'Microflows', q: 'A microflow is triggered by a scheduled event to run nightly. What is true of it?', a: 'It takes no parameters and runs with full rights, without a user', d: ['It takes one object parameter chosen at runtime', 'It runs only while a user is signed in', 'It runs on the client device'], why: 'Scheduled-event microflows have no parameters and run with full rights.' },
  { m: 'Microflows', q: 'A sub-step may fail; if it does, its partial changes must be discarded but the flow should continue down an error path. Setting?', a: 'Custom with rollback on that activity', d: ['Custom without rollback', 'Continue', 'Rollback and stop'], why: 'Custom with rollback reverts the scope’s changes and follows the error path.' },
  { m: 'Microflows', q: 'You must run different logic for each value of an Enumeration. Which element?', a: 'An exclusive split on the enumeration attribute', d: ['A loop over the enumeration values', 'A merge with multiple inputs', 'A parallel split'], why: 'An exclusive split on an enum creates one path per value.' },
  { m: 'Microflows', q: 'You need the total of all invoice-line amounts in a list. Which activity?', a: 'Aggregate list with the Sum function', d: ['Change list with an add operation', 'A loop that concatenates the amounts', 'Retrieve with a Sum in the XPath'], why: 'Aggregate list → Sum totals a numeric attribute across the list.' },
  { m: 'Microflows', q: 'You need Orders matching several XPath conditions, sorted by date. Which retrieve?', a: 'Retrieve from the database (with XPath and sorting)', d: ['Retrieve by association', 'Aggregate list', 'Cast object'], why: 'Database retrieves allow XPath constraints and sorting; association retrieves do not.' },
  { m: 'Microflows', q: 'After an inheritance split shows an object is a specialised type, how do you access its extra members?', a: 'Cast the object to the specialization', d: ['Change the object’s entity type', 'Retrieve it again from the database', 'Create a new specialized object'], why: 'Cast Object converts the generalization reference to its specialization.' },

  /* Agile */
  { m: 'Agile', q: 'Mid-sprint, a stakeholder requests a new feature. Who decides whether and when it is built?', a: 'The Product Owner, by placing and prioritising it on the backlog', d: ['The Scrum Master, by adding it to the current sprint', 'Any developer who has spare time', 'The stakeholder, by escalating to management'], why: 'The Product Owner owns and prioritises the backlog.' },
  { m: 'Agile', q: 'Two Business Engineers changed the same microflow on separate branches. Team Server resolves this by…', a: 'Merging the branches, prompting to resolve any conflicts', d: ['Locking the file so only one edit is kept', 'Overwriting with the newest commit automatically', 'Refusing both commits until one is deleted'], why: 'Version control merges parallel work and asks you to resolve conflicts.' },
  { m: 'Agile', q: 'You must reproduce the exact model a past Acceptance build used. What identifies it?', a: 'The tagged version created when that deployment package was built', d: ['The latest commit on the branch', 'The sprint the build belonged to', 'The environment’s currently running revision'], why: 'Building a package tags the underlying revision for reproducibility.' },
  { m: 'Agile', q: 'End-users should report bugs from inside the running app, with context attached automatically. Use…', a: 'The Feedback widget', d: ['A published REST endpoint they call', 'The Team Server stories page', 'A shared email inbox'], why: 'The Feedback widget logs items to the backlog with role/page/browser context.' },
  { m: 'Agile', q: 'During Sprint Planning, what does the team commit to?', a: 'The set of top backlog stories it will complete this sprint', d: ['The entire remaining backlog', 'The production release date', 'The next quarter’s roadmap'], why: 'The team selects the highest-priority stories it can finish in the sprint.' },

  /* XPath */
  { m: 'XPath', q: 'Show only records created since the start of today. Which token do you compare against?', a: '[%BeginOfCurrentDay%]', d: ['[%CurrentDateTime%]', '[%Today%]', '[%StartOfDay%]'], why: 'Relative date tokens like [%BeginOfCurrentDay%] set date-range boundaries.' },
  { m: 'XPath', q: 'You want records where Status is Open OR Pending. Which constraint?', a: "[Status = 'Open' or Status = 'Pending']", d: ["[Status = 'Open' and Status = 'Pending']", "[Status = 'Open'][Status = 'Pending']", "[Status in ('Open','Pending')]"], why: 'Use "or"; chained brackets mean AND, and XPath has no SQL-style IN.' },
  { m: 'XPath', q: 'An access rule should let users see only the objects they own. Which constraint?', a: "[System.owner = '[%CurrentUser%]']", d: ["[System.owner != '[%CurrentUser%]']", "[System.owner = '[%CurrentObject%]']", "[owner/Name = '[%CurrentUser%]']"], why: 'Comparing the owner association to the current-user token gives row-level "own records".' },
  { m: 'XPath', q: 'Find Customers whose Name begins with "A". Which function?', a: "starts-with(Name, 'A')", d: ["contains(Name, 'A')", "Name = 'A%'", "like(Name, 'A%')"], why: 'starts-with() matches the start of a string; there is no SQL LIKE in XPath.' },

  /* Modules */
  { m: 'Modules', q: 'You want the same Notification module in three separate apps. How do you share it?', a: 'Export it as a module package and import it into each app', d: ['Reference it live from a shared server', 'Copy its database tables into each app', 'Publish it as a REST service each app calls'], why: 'Modules are shared by exporting/importing the module package.' },
  { m: 'Modules', q: 'You import a Marketplace module with its own module roles at Production but skip mapping them. Result?', a: 'Users get no access from that module until its roles are mapped to user roles', d: ['The module’s features work for everyone by default', 'The app refuses to deploy', 'The module runs with security off'], why: 'Unmapped module roles grant nothing; map them in App Security.' },

  /* Translation */
  { m: 'Translation', q: 'You added Dutch, but many screens still show English. Why?', a: 'Untranslated texts fall back to the default language (English US)', d: ['Dutch was added but not enabled', 'The browser overrides the app language', 'System texts cannot be translated'], why: 'Missing translations show the default-language text.' },
  { m: 'Translation', q: 'You have 400 captions to translate into German quickly. Which tool?', a: 'Batch translate', d: ['The Language Selector widget', 'System texts', 'Export the app to Excel and back'], why: 'Batch translate lists all translatable texts so you can fill them in bulk.' },

  /* ===================== Learning-path concept coverage (original) ===================== */

  /* Agile */
  { m: 'Agile', q: 'What are the five Scrum values?', a: 'Focus, Courage, Openness, Commitment, Respect', d: ['Focus, Courage, Openness, Commitment, Communication', 'Focus, Courage, Agility, Commitment, Respect', 'Speed, Courage, Openness, Commitment, Respect'], why: 'The five Scrum values are Focus, Courage, Openness, Commitment and Respect.' },
  { m: 'Agile', q: 'How long is the Daily Scrum time-boxed to?', a: '15 minutes', d: ['As long as the team needs', '2 minutes per team member', '30 minutes'], why: 'The Daily Scrum is time-boxed to 15 minutes.' },
  { m: 'Agile', q: 'The Daily Scrum is also known as the…', a: 'Stand-up', d: ['Sprint Review', 'Retrospective', 'Backlog Refinement'], why: 'The Daily Scrum is commonly called the stand-up.' },
  { m: 'Agile', q: 'Which list contains only Scrum events?', a: 'Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective', d: ['Sprint Planning, Daily Scrum, Sprint Review, Backlog Review', 'Sprint Planning, Daily Scrum, Sprint Review, User Story Session', 'Sprint Planning, Daily Scrum, Sprint Review, Scrum Retrospective'], why: 'The events are Sprint Planning, the Daily Scrum, the Sprint Review and the Sprint Retrospective.' },
  { m: 'Agile', q: 'Who makes up the core Scrum team?', a: 'Product Owner, Scrum Master and Developers', d: ['Product Owner, Scrum Master and Stakeholders', 'Scrum Master, Developers and Business Owner', 'Product Owner, Developers and Subject Matter Experts'], why: 'The Scrum team is the Product Owner, the Scrum Master and the Developers.' },
  { m: 'Agile', q: 'How is a Subject Matter Expert (SME) involved in a Scrum project?', a: 'Engaged for specific expertise when needed, not a core team member', d: ['A permanent member of every Scrum team', 'The person who leads the Daily Scrum', 'The one who prioritises the backlog'], why: 'SMEs are brought in for their expertise as needed; they are not part of the core team.' },
  { m: 'Agile', q: 'Why does a team need a clear Definition of Done?', a: 'So everyone shares the same understanding of when work is truly complete', d: ['So Subject Matter Experts can join the team', 'So the Product Owner need not explain finished work', 'So stakeholders can set the story points'], why: 'The Definition of Done is a shared, agreed meaning of "done" — a potentially shippable increment.' },
  { m: 'Agile', q: 'What is the goal of product-backlog refinement?', a: 'Clarify user stories and break them small enough to finish quickly', d: ['Ensure every story has story points assigned', 'Throw out stories the team thinks it cannot build', 'Rewrite the story text in more formal language'], why: 'Refinement clarifies and right-sizes stories so they are ready to work on.' },

  /* Security */
  { m: 'Security', q: 'What restriction does Mendix place on the name of the anonymous user role?', a: 'None — it can be named anything', d: ['It must be named "Anonymous"', 'It must match the module role used', 'It cannot be named "Administrator"'], why: 'There is no naming restriction on the anonymous user role.' },
  { m: 'Security', q: 'The base User (Account) entity lives in which module?', a: 'System', d: ['Administration', 'MyFirstModule', 'Atlas_UI_Resources'], why: 'System.User is the base user entity; Administration adds account-management UI on top.' },
  { m: 'Security', q: 'When you enable "Allow anonymous users", what must you do?', a: 'Select a user role that is assigned to all anonymous users', d: ['Select the module roles assigned to each anonymous user', 'Define a username and password for background sign-in', 'Enable anonymous users in every module separately'], why: 'You pick a single user role that unauthenticated visitors receive.' },
  { m: 'Security', q: 'Can you use demo users on a licensed Mendix Cloud node?', a: 'No — demo users work only locally or on a Free App', d: ['Yes, on any environment', 'Yes, but only on Acceptance', 'Yes, once security is set to Prototype'], why: 'Demo users are available locally or on Free Apps, not on licensed nodes.' },

  /* Microflows */
  { m: 'Microflows', q: 'Which functions does the Aggregate List activity offer?', a: 'Sum, Average, Count, Minimum, Maximum', d: ['Sum, Average, Square, Minimum, Maximum', 'Sum, Average, Count, Minimum, Mod', 'Sum, Average, Count, Median, Maximum'], why: 'Aggregate List offers Sum, Average, Count, Minimum and Maximum.' },
  { m: 'Microflows', q: 'On a list of 7 objects, what does the Tail list operation return?', a: 'A list of the last 6 objects (all but the first)', d: ['The last object only', 'The first 6 objects', 'The first object only'], why: 'Tail returns all elements except the first; Head returns the first element.' },
  { m: 'Microflows', q: 'Two lists share exactly one common object. What does an Intersect operation return?', a: 'A list containing that one common object', d: ['A single object, not a list', 'Both lists combined without duplicates', 'An empty list'], why: 'Intersect returns the objects that appear in both lists.' },
  { m: 'Microflows', q: 'What is the Object Type Decision used for?', a: 'To branch based on the (specialised) type of an object', d: ['To change the type of an object', 'To read the data type of an attribute', 'To create an object of a chosen type'], why: 'It routes the flow based on an object’s actual entity type.' },
  { m: 'Microflows', q: 'When changing a one-to-one association with a Change activity, which options are available?', a: 'Set and Remove', d: ['Set, Add and Remove', 'Add and Remove', 'Set only'], why: 'A single-valued association supports Set and Remove; Add applies to reference sets.' },
  { m: 'Microflows', q: 'Can you use Start and End events inside a loop in a microflow?', a: 'No — Start and End events cannot be used inside a loop', d: ['Yes, both are required inside a loop', 'Only the End event can', 'Only the Start event can'], why: 'A loop uses Break/Continue and sequence flow, not Start/End events.' },
  { m: 'Microflows', q: 'Which set of activities all interact with the database?', a: 'Create, Commit, Retrieve, Rollback', d: ['Create, Change, Show page, Rollback', 'Commit, Retrieve, Aggregate, Merge', 'Create, Commit, Cast, Close page'], why: 'Create, Commit, Retrieve and Rollback (and Delete) touch the database.' },
  { m: 'Microflows', q: 'What is the Mendix best-practice prefix for an after-startup microflow?', a: 'ASU_', d: ['AFS_', 'ASM_', 'AFT_'], why: 'After-startup microflows are prefixed ASU_.' },
  { m: 'Microflows', q: 'What prefix does Mendix best practice use for a microflow that computes a calculated attribute?', a: 'CAL_', d: ['ACA_', 'CAD_', 'CALC_'], why: 'Calculated-attribute microflows are prefixed CAL_.' },

  /* Pages */
  { m: 'Pages', q: 'The Atlas layout grid is built on which CSS technology?', a: 'Flexbox', d: ['CSS Grid', 'Floats', 'HTML tables'], why: 'The Mendix layout grid is based on flexbox.' },
  { m: 'Pages', q: 'How do you place a snippet on a page?', a: 'By adding a snippet call', d: ['By adding a layout grid', 'By adding a container', 'By adding a scroll container'], why: 'A snippet is shown on a page via a snippet call.' },
  { m: 'Pages', q: 'What is a scroll container used for?', a: 'To make a specific part of the page individually scrollable', d: ['To disable the browser’s scroll bar', 'To let users toggle scroll bars on and off', 'To add scrolling to the whole page'], why: 'A scroll container makes a defined region scroll on its own.' },
  { m: 'Pages', q: 'What is the maximum number of columns in a single row of the layout grid?', a: '12', d: ['6', '16', 'Unlimited'], why: 'The layout grid uses a 12-column system per row.' },
  { m: 'Pages', q: 'Where do widgets downloaded from the Marketplace appear in Studio Pro?', a: 'In the Add-on widgets section of the toolbox', d: ['In the Building blocks section', 'You must import them into a section manually', 'In a separate toolbox tab of their own'], why: 'Downloaded widgets show up under Add-on widgets in the toolbox.' },
  { m: 'Pages', q: 'What is the primary purpose of a snippet?', a: 'To reuse a component across multiple pages', d: ['To divide a page into similar parts', 'To import part of an external site', 'To show an image on a page'], why: 'A snippet is reusable page content used across pages.' },

  /* Domain Model */
  { m: 'Domain Model', q: 'In entity access XPath, what is the difference between "Owner" and "Path to user"?', a: 'Owner is the user who created the object; Path to user is a user reached via association(s)', d: ['Owner is reached via associations; Path to user is the creator', 'They mean the same thing', 'It depends on whether the rule is on a user or module role'], why: 'Owner = creator (System.owner); Path to user follows associations to a related user.' },
  { m: 'Domain Model', q: 'What do you change to make an association many-to-many in the Entity Properties?', a: 'Set Type = Reference set', d: ['Set Owner = Default', 'Set Type = Reference', 'Set Owner = Both'], why: 'A Reference set produces a many-to-many association.' },
  { m: 'Domain Model', q: 'Which of these are all Mendix system members of an entity?', a: 'createdDate, changedDate, owner, changedBy', d: ['createdDate, owner, changedDate, changer', 'createdDate, createdBy, modifiedDate, changedBy', 'createDate, owner, changeDate, changedBy'], why: 'System members include createdDate, changedDate, owner and changedBy.' },
  { m: 'Domain Model', q: 'Can you attach an image to an enumeration value?', a: 'Yes', d: ['No', 'Only for system enumerations', 'Only in native mobile apps'], why: 'Each enumeration value can have an image.' },
  { m: 'Domain Model', q: 'Where are non-persistable entity objects stored?', a: 'In memory', d: ['In a separate database table', 'In the browser’s local storage', 'They are not stored and cannot be used'], why: 'Non-persistable objects live in memory for the session; there is no table.' },

  /* Modules */
  { m: 'Modules', q: 'What is the Mendix best-practice naming convention for modules?', a: 'Capitalise each word and remove spaces (e.g. CustomerManagement)', d: ['Replace spaces with underscores', 'Use all capitals', 'There is no convention'], why: 'Modules use PascalCase with no spaces.' },
  { m: 'Modules', q: 'Where are the Java libraries that modules bring installed?', a: 'In the userlib folder', d: ['In the javasource folder', 'In the resources folder', 'In the theme folder'], why: 'Third-party JARs live in userlib; your Java action source lives in javasource.' },
  { m: 'Modules', q: 'Why add new functionality to a Marketplace module via a separate extension module?', a: 'Because updating the Marketplace module would overwrite your changes', d: ['Because you cannot open the Marketplace module at all', 'To make translation easier', 'Because it is an ISO requirement'], why: 'Keeping changes in a separate module protects them from being overwritten on update.' },
  { m: 'Modules', q: 'Why does Mendix use the concept of modules?', a: 'To encapsulate functionality so it can be reused', d: ['To facilitate translation', 'Because it is an ISO standard', 'To speed up the runtime'], why: 'Modules encapsulate functionality for reuse and organisation.' },
  { m: 'Modules', q: 'How do you add a Marketplace module to your app?', a: 'Download it from the Marketplace within Studio Pro', d: ['Ask Mendix support to add it', 'Import it via a microflow', 'Copy its database into your app'], why: 'You download Marketplace modules directly in Studio Pro.' },

  /* Translation */
  { m: 'Translation', q: 'You want to replace every occurrence of a specific text in your app in one step. Which option?', a: 'Batch Replace', d: ['Batch Translate', 'Bulk Rename', 'Find and Delete'], why: 'Batch Replace replaces all occurrences of a text; Batch Translate is for translating texts.' },
  { m: 'Translation', q: 'Can you run translation on just one module?', a: 'Yes — you can scope batch translate to a single module', d: ['No, translation is always app-wide', 'Only for the default language', 'Only for Marketplace modules'], why: 'Batch translate can be limited to selected modules.' },
  { m: 'Translation', q: 'Which languages can you add to a Mendix app?', a: 'The ISO 639 languages Mendix supports', d: ['Any language, if it is installed in Windows', 'Only English, Dutch and German', 'Any language you type in, including invented ones'], why: 'Languages are chosen from the ISO 639 set Mendix supports.' },

  /* XPath */
  { m: 'XPath', q: 'Can you define your own XPath system variables, like [%CurrentUser%]?', a: 'No — those tokens are provided by the platform and cannot be custom-defined', d: ['Yes, in the project settings', 'Yes, per module', 'Only inside access rules'], why: 'System variables are platform-defined; you cannot create your own.' },
  { m: 'XPath', q: 'Can you use module-role variables in XPath queries?', a: 'No', d: ['Yes, always', 'Yes, but only in access rules', 'Yes, but only in microflows'], why: 'Module roles cannot be referenced as variables in XPath.' },
  { m: 'XPath', q: 'Which character steps between entities, associations and attributes in an XPath path?', a: 'A forward slash ( / )', d: ['A backslash ( \\ )', 'A dot ( . )', 'A double slash ( // )'], why: 'A single "/" traverses to a related entity, association or attribute.' },
  { m: 'XPath', q: 'What does an XPath query start with to select all objects of an entity?', a: '//', d: ['/', '.', '[]'], why: 'A query begins with // followed by the entity, e.g. //Sales.Customer.' },
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
