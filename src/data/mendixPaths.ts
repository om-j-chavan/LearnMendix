/**
 * The real Mendix Academy learning-path taxonomy (Phase A: catalog).
 *
 * Structure mirrors academy.mendix.com: skill level -> learning path -> modules.
 * Path names and module titles are factual structure captured from the PUBLIC
 * Academy catalog; descriptions here are our own summaries. The full interactive
 * course content lives on Mendix Academy — each path links out to the source.
 *
 * Phased plan: (A) all paths in place as a browsable catalog [this file];
 * (B) migrate our authored dual-explanation lessons into the matching paths;
 * (C) fill remaining module breakdowns.
 */

export interface MxPath {
  id: string
  name: string
  desc: string
  modules: number
  hours: string
  /** Real module titles (captured where crawled); otherwise omitted for now. */
  moduleNames?: string[]
  /** Official Mendix Academy page for this path. */
  url: string
  /** Set when our app already has authored lessons that map to this path. */
  authored?: boolean
}

export interface MxLevel {
  id: string
  name: string
  color: string
  icon: string
  blurb: string
  paths: MxPath[]
}

const EXPLORE = 'https://academy.mendix.com/link/explore'

export const MENDIX_PATHS: MxLevel[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    color: '#22c55e',
    icon: '🌱',
    blurb: 'First steps — build simple apps and learn how delivery works.',
    paths: [
      { id: 'build-with-template', name: 'Build Your App Using a Template', desc: 'Stand up a working app from a Studio Pro template and learn your way around the tool.', modules: 6, hours: '4.0', url: EXPLORE },
      { id: 'app-from-excel', name: 'Build an App from an Excel Spreadsheet', desc: 'Turn a spreadsheet into a real Mendix app — data in, app out.', modules: 3, hours: '0.5', url: EXPLORE },
      { id: 'agile-awareness', name: 'Agile Awareness', desc: 'The core ideas of Agile — business, team and product value — applied to Mendix delivery.', modules: 7, hours: '5.0', url: EXPLORE },
    ],
  },
  {
    id: 'rapid',
    name: 'Rapid',
    color: '#22d3ee',
    icon: '🚀',
    blurb: 'Build real low-code apps end to end.',
    paths: [
      {
        id: 'become-rapid-developer',
        name: 'Become a Rapid Developer',
        desc: 'The flagship path: build low-code apps in Studio Pro from data model to deployment.',
        modules: 10,
        hours: '16.0',
        authored: true,
        url: 'https://academy.mendix.com/link/paths/166/Become-a-Rapid-Developer',
        moduleNames: [
          'Introduction',
          'Collaborate with your Team',
          'Start Building your App',
          'Add Data to your App',
          'Associate Data',
          'Add Custom Logic to your App',
          'Automating Processes within an App',
          'Ensuring your Data is Valid and Consistent',
          'Securing your App',
          'Conclusion',
        ],
      },
      { id: 'crash-course', name: 'Crash Course', desc: 'Mendix from a technical angle — for people who already know how to code.', modules: 11, hours: '16.0', url: EXPLORE },
      { id: 'going-mobile', name: 'Going Mobile', desc: 'Extend your skills to mobile apps and mobile-specific pages.', modules: 3, hours: '2.0', url: EXPLORE },
    ],
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    color: '#a855f7',
    icon: '🎯',
    blurb: 'Collaboration, data constraints and richer UIs — the certification core.',
    paths: [
      { id: 'unlocking-collaboration', name: 'Unlocking True Collaboration', desc: 'Collaborate effectively once you start building real apps for your company.', modules: 5, hours: '2.0', authored: true, url: EXPLORE },
      { id: 'constrain-data-xpath', name: 'Constrain Your Data Using XPath', desc: 'Filter and shape what users see by writing XPath constraints.', modules: 5, hours: '4.0', authored: true, url: EXPLORE },
      { id: 'advanced-page-building', name: 'Create an App with Advanced Page Building', desc: 'Use page templates to craft wizards, reports and custom login pages.', modules: 8, hours: '8.0', authored: true, url: EXPLORE },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    color: '#f59e0b',
    icon: '🧠',
    blurb: 'Stable domain models, data mastery and hardened security.',
    paths: [
      { id: 'advanced-domain-model', name: 'Advanced Domain Model Skills', desc: 'Design stable, high-performance domain models.', modules: 8, hours: '6.0', url: EXPLORE },
      { id: 'win-working-with-data', name: 'Win at Working with Data', desc: 'How Mendix handles data: page data sources, optimization and XPath.', modules: 5, hours: '4.0', url: EXPLORE },
      { id: 'configure-advanced-security', name: 'Configure Advanced Security', desc: 'Key elements and best practices for setting up Mendix security.', modules: 6, hours: '4.0', url: EXPLORE },
    ],
  },
  {
    id: 'expert',
    name: 'Expert',
    color: '#ec4899',
    icon: '👑',
    blurb: 'Platform-depth topics: security, performance and the runtime.',
    paths: [
      { id: 'security-access-management', name: 'Configure Security and Access Management', desc: 'Expert-level security topics on the Mendix platform.', modules: 6, hours: '2.0', url: EXPLORE },
      { id: 'optimize-performance', name: 'Optimize the Performance of your Apps', desc: 'Analyze and resolve performance issues quickly.', modules: 7, hours: '2.0', url: EXPLORE },
      { id: 'runtime-db-interaction', name: 'Manage Mendix Runtime and DB Interaction', desc: 'Transaction management and how the end state is stored in the database.', modules: 7, hours: '2.0', url: EXPLORE },
    ],
  },
]

export const MX_PATH_BY_ID: Record<string, { level: MxLevel; path: MxPath }> = {}
MENDIX_PATHS.forEach((level) => level.paths.forEach((path) => (MX_PATH_BY_ID[path.id] = { level, path })))

export function totalMendixPaths(): number {
  return MENDIX_PATHS.reduce((n, l) => n + l.paths.length, 0)
}
