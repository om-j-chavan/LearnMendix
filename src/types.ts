export type LevelId = 'rapid' | 'intermediate' | 'advanced' | 'expert'

export type Accent =
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'magenta'
  | 'lime'
  | 'green'
  | 'amber'

export interface Lesson {
  id: string
  title: string
  /** 'card' = tight revision card, 'full' = teach-from-scratch lesson */
  depth: 'card' | 'full'
  /** Technical, precise explanation (HTML string) */
  tech: string
  /** Plain-English / analogy explanation (HTML string) */
  simple: string
  /** Optional "Try it in Studio Pro" tip (HTML string) */
  tryit?: string
  /** Key terms to remember */
  terms?: string[]
}

export interface QuizQuestion {
  q: string
  options: string[]
  /** index into options of the correct answer */
  correct: number
  why: string
}

export interface Module {
  id: string
  title: string
  icon: string
  blurb: string
  accent: Accent
  lessons: Lesson[]
  quiz: QuizQuestion[]
}

export interface Level {
  id: LevelId
  name: string
  tagline: string
  /** hex accent for the track */
  color: string
  icon: string
  /** available = full content + gating; preview = browsable outline */
  status: 'available' | 'preview'
  modules: Module[]
}

export interface Badge {
  id: string
  name: string
  desc: string
  icon: string
  accent: Accent
}
