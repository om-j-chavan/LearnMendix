import type { Badge } from '../types'
import { gradableModuleIds, totalGradableLessons } from '../data/courses'

export const PASS = 75
export const XP_LESSON = 15
export const XP_QUIZ_MAX = 90 // best-possible XP for a 100% quiz

/* ----------------------------- dates / streak ----------------------------- */
export function todayStr(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export interface Streak {
  count: number
  last: string | null
}

export function nextStreak(prev: Streak, today = todayStr()): Streak {
  if (prev.last === today) return prev
  const yesterday = todayStr(new Date(Date.now() - 86_400_000))
  if (prev.last === yesterday) return { count: prev.count + 1, last: today }
  return { count: 1, last: today }
}

/** Has the streak lapsed (i.e. last activity before yesterday)? */
export function streakAlive(s: Streak, today = todayStr()): boolean {
  if (!s.last) return false
  const yesterday = todayStr(new Date(Date.now() - 86_400_000))
  return s.last === today || s.last === yesterday
}

/* --------------------------------- levels --------------------------------- */
export interface LevelInfo {
  level: number
  intoLevel: number
  needForNext: number
  pct: number
}

export function levelInfo(xp: number): LevelInfo {
  let level = 1
  let remaining = Math.max(0, Math.floor(xp))
  let need = 120
  while (remaining >= need) {
    remaining -= need
    level += 1
    need = Math.round(need * 1.28)
  }
  return { level, intoLevel: remaining, needForNext: need, pct: remaining / need }
}

export function rankTitle(level: number): string {
  if (level >= 20) return 'Mendix Legend'
  if (level >= 15) return 'Grandmaster'
  if (level >= 11) return 'Architect'
  if (level >= 8) return 'Expert'
  if (level >= 5) return 'Engineer'
  if (level >= 3) return 'Builder'
  return 'Apprentice'
}

export function quizXpFor(pct: number): number {
  return Math.round((Math.max(0, Math.min(100, pct)) / 100) * XP_QUIZ_MAX)
}

/* --------------------------------- snapshot ------------------------------- */
export interface ProgressSnapshot {
  xp: number
  streak: Streak
  doneLessons: Record<string, true>
  quizBest: Record<string, number>
  badges: Record<string, true>
}

export interface Stats {
  doneCount: number
  passedSet: Set<string>
  passedCount: number
  perfectCount: number
  level: number
  totalLessons: number
  lessonPct: number
  streak: number
}

export function computeStats(s: ProgressSnapshot): Stats {
  const doneCount = Object.keys(s.doneLessons).length
  const passed = Object.entries(s.quizBest).filter(([, v]) => v >= PASS)
  const passedSet = new Set(passed.map(([k]) => k))
  const perfectCount = Object.values(s.quizBest).filter((v) => v >= 100).length
  const level = levelInfo(s.xp).level
  const totalLessons = totalGradableLessons()
  return {
    doneCount,
    passedSet,
    passedCount: passedSet.size,
    perfectCount,
    level,
    totalLessons,
    lessonPct: totalLessons ? doneCount / totalLessons : 0,
    streak: s.streak.count,
  }
}

/* --------------------------------- badges --------------------------------- */
interface BadgeDef extends Badge {
  earned: (st: Stats) => boolean
}

const RAPID_QUIZZES = gradableModuleIds('rapid')
const INTER_QUIZZES = gradableModuleIds('intermediate')

export const BADGES: BadgeDef[] = [
  { id: 'first-step', name: 'First Step', desc: 'Complete your first lesson', icon: '👣', accent: 'cyan', earned: (s) => s.doneCount >= 1 },
  { id: 'quick-study', name: 'Quick Study', desc: 'Complete 10 lessons', icon: '📘', accent: 'blue', earned: (s) => s.doneCount >= 10 },
  { id: 'scholar', name: 'Scholar', desc: 'Complete 25 lessons', icon: '🎓', accent: 'purple', earned: (s) => s.doneCount >= 25 },
  { id: 'halfway', name: 'Halfway Hero', desc: 'Finish 50% of all lessons', icon: '🧗', accent: 'lime', earned: (s) => s.lessonPct >= 0.5 },
  { id: 'perfectionist', name: 'Perfectionist', desc: 'Score 100% on any quiz', icon: '💯', accent: 'pink', earned: (s) => s.perfectCount >= 1 },
  { id: 'quiz-machine', name: 'Quiz Machine', desc: 'Pass 5 module quizzes', icon: '🤖', accent: 'green', earned: (s) => s.passedCount >= 5 },
  { id: 'domain-master', name: 'Domain Master', desc: 'Pass the Domain Model quiz', icon: '🗄️', accent: 'blue', earned: (s) => s.passedSet.has('i-domain') },
  { id: 'security-ace', name: 'Security Ace', desc: 'Pass the Security quiz', icon: '🛡️', accent: 'pink', earned: (s) => s.passedSet.has('i-security') },
  { id: 'rapid-grad', name: 'Rapid Graduate', desc: 'Pass every Rapid quiz', icon: '🚀', accent: 'cyan', earned: (s) => RAPID_QUIZZES.every((id) => s.passedSet.has(id)) },
  { id: 'inter-grad', name: 'Intermediate Graduate', desc: 'Pass every Intermediate quiz', icon: '🏅', accent: 'amber', earned: (s) => INTER_QUIZZES.every((id) => s.passedSet.has(id)) },
  { id: 'flame-3', name: 'Warming Up', desc: 'Reach a 3-day streak', icon: '🔥', accent: 'amber', earned: (s) => s.streak >= 3 },
  { id: 'flame-7', name: 'On Fire', desc: 'Reach a 7-day streak', icon: '🔥', accent: 'pink', earned: (s) => s.streak >= 7 },
  { id: 'flame-14', name: 'Unstoppable', desc: 'Reach a 14-day streak', icon: '⚡', accent: 'magenta', earned: (s) => s.streak >= 14 },
  { id: 'level-5', name: 'Engineer', desc: 'Reach level 5', icon: '⭐', accent: 'cyan', earned: (s) => s.level >= 5 },
  { id: 'level-10', name: 'Architect', desc: 'Reach level 10', icon: '🌟', accent: 'purple', earned: (s) => s.level >= 10 },
]

export const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b])) as Record<string, BadgeDef>

/** Return badge defs newly earned by this snapshot that aren't already owned. */
export function newlyEarnedBadges(s: ProgressSnapshot): Badge[] {
  const st = computeStats(s)
  return BADGES.filter((b) => b.earned(st) && !s.badges[b.id]).map(({ earned, ...rest }) => rest)
}
