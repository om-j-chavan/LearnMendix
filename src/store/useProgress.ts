import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Badge, LevelId } from '../types'
import { getActiveUserId, onSessionChange } from './session'
import {
  PASS,
  XP_LESSON,
  levelInfo,
  nextStreak,
  newlyEarnedBadges,
  quizXpFor,
  type ProgressSnapshot,
  type Streak,
} from '../lib/gamification'

export interface ActionResult {
  xpGained: number
  leveledFrom: number
  leveledTo: number
  newBadges: Badge[]
}

interface ProgressState extends ProgressSnapshot {
  sound: boolean
  lastVisited: { levelId: LevelId; moduleId: string } | null
  hydrated: boolean

  completeLesson: (lessonId: string) => ActionResult
  submitQuiz: (moduleId: string, pct: number) => ActionResult & { passed: boolean; best: number }
  recordExam: (pct: number) => ActionResult & { passed: boolean; best: number }
  togglePrepDay: (day: number) => ActionResult & { done: boolean }
  setLastVisited: (levelId: LevelId, moduleId: string) => void
  toggleSound: () => void
  resetProgress: () => void
}

const EMPTY: ProgressSnapshot & { sound: boolean; lastVisited: null } = {
  xp: 0,
  streak: { count: 0, last: null } as Streak,
  doneLessons: {},
  quizBest: {},
  badges: {},
  examBest: 0,
  prepDays: {},
  sound: false,
  lastVisited: null,
}

function snapshot(s: ProgressState): ProgressSnapshot {
  return {
    xp: s.xp,
    streak: s.streak,
    doneLessons: s.doneLessons,
    quizBest: s.quizBest,
    badges: s.badges,
    examBest: s.examBest,
    prepDays: s.prepDays,
  }
}

/**
 * Per-user (multi-tenant) storage: every progress key is suffixed with the
 * active account id, so accounts never share XP / streak / badges / scores —
 * even in the same browser. Switching users reloads the correct namespace.
 */
const PROGRESS_KEY = 'learnmendix-progress-v1'
const nsKey = () => `${PROGRESS_KEY}::${getActiveUserId()}`
const namespacedStorage = {
  getItem: () => localStorage.getItem(nsKey()),
  setItem: (_name: string, value: string) => localStorage.setItem(nsKey(), value),
  removeItem: () => localStorage.removeItem(nsKey()),
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...EMPTY,
      hydrated: false,

      completeLesson: (lessonId) => {
        const s = get()
        const from = levelInfo(s.xp).level
        if (s.doneLessons[lessonId]) {
          // already done — still refresh the streak for studying today
          const streak = nextStreak(s.streak)
          const draft: ProgressSnapshot = { ...snapshot(s), streak }
          const newBadges = newlyEarnedBadges(draft)
          const badges = { ...s.badges }
          newBadges.forEach((b) => (badges[b.id] = true))
          set({ streak, badges })
          return { xpGained: 0, leveledFrom: from, leveledTo: from, newBadges }
        }
        const xp = s.xp + XP_LESSON
        const doneLessons = { ...s.doneLessons, [lessonId]: true as const }
        const streak = nextStreak(s.streak)
        const draft: ProgressSnapshot = { xp, streak, doneLessons, quizBest: s.quizBest, badges: s.badges, examBest: s.examBest }
        const newBadges = newlyEarnedBadges(draft)
        const badges = { ...s.badges }
        newBadges.forEach((b) => (badges[b.id] = true))
        const to = levelInfo(xp).level
        set({ xp, doneLessons, streak, badges })
        return { xpGained: XP_LESSON, leveledFrom: from, leveledTo: to, newBadges }
      },

      submitQuiz: (moduleId, pct) => {
        const s = get()
        const from = levelInfo(s.xp).level
        const prevBest = s.quizBest[moduleId] ?? 0
        const best = Math.max(prevBest, pct)
        // award only the improvement in achievable quiz XP
        const xpGained = Math.max(0, quizXpFor(best) - quizXpFor(prevBest))
        const xp = s.xp + xpGained
        const quizBest = { ...s.quizBest, [moduleId]: best }
        const streak = nextStreak(s.streak)
        const draft: ProgressSnapshot = { xp, streak, doneLessons: s.doneLessons, quizBest, badges: s.badges, examBest: s.examBest }
        const newBadges = newlyEarnedBadges(draft)
        const badges = { ...s.badges }
        newBadges.forEach((b) => (badges[b.id] = true))
        const to = levelInfo(xp).level
        set({ xp, quizBest, streak, badges })
        return { xpGained, leveledFrom: from, leveledTo: to, newBadges, passed: pct >= PASS, best }
      },

      recordExam: (pct) => {
        const s = get()
        const from = levelInfo(s.xp).level
        const prevBest = s.examBest
        const best = Math.max(prevBest, pct)
        // exams are big — reward improvement generously
        const xpGained = Math.max(0, Math.round((best - prevBest) * 1.5))
        const xp = s.xp + xpGained
        const streak = nextStreak(s.streak)
        const draft: ProgressSnapshot = {
          xp,
          streak,
          doneLessons: s.doneLessons,
          quizBest: s.quizBest,
          badges: s.badges,
          examBest: best,
        }
        const newBadges = newlyEarnedBadges(draft)
        const badges = { ...s.badges }
        newBadges.forEach((b) => (badges[b.id] = true))
        const to = levelInfo(xp).level
        set({ xp, examBest: best, streak, badges })
        return { xpGained, leveledFrom: from, leveledTo: to, newBadges, passed: pct >= PASS, best }
      },

      togglePrepDay: (day) => {
        const s = get()
        const from = levelInfo(s.xp).level
        const prep = { ...(s.prepDays ?? {}) }
        if (prep[day]) {
          delete prep[day]
          set({ prepDays: prep })
          return { xpGained: 0, leveledFrom: from, leveledTo: from, newBadges: [], done: false }
        }
        prep[day] = true
        const xp = s.xp + XP_LESSON
        const streak = nextStreak(s.streak)
        const draft: ProgressSnapshot = { ...snapshot(s), xp, prepDays: prep, streak }
        const newBadges = newlyEarnedBadges(draft)
        const badges = { ...s.badges }
        newBadges.forEach((b) => (badges[b.id] = true))
        const to = levelInfo(xp).level
        set({ xp, prepDays: prep, streak, badges })
        return { xpGained: XP_LESSON, leveledFrom: from, leveledTo: to, newBadges, done: true }
      },

      setLastVisited: (levelId, moduleId) => set({ lastVisited: { levelId, moduleId } }),
      toggleSound: () => set((s) => ({ sound: !s.sound })),
      resetProgress: () => set({ ...EMPTY, hydrated: true }),
    }),
    {
      name: PROGRESS_KEY,
      storage: createJSONStorage(() => namespacedStorage),
      partialize: (s) => ({
        xp: s.xp,
        streak: s.streak,
        doneLessons: s.doneLessons,
        quizBest: s.quizBest,
        badges: s.badges,
        examBest: s.examBest,
        prepDays: s.prepDays,
        sound: s.sound,
        lastVisited: s.lastVisited,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true
      },
    },
  ),
)

// When the signed-in account changes, load that account's namespace. If the
// account has saved data, rehydrate it (never write empty state first, which
// would clobber it). If it has none yet, reset in-memory state to empty.
onSessionChange(() => {
  const hasSaved = localStorage.getItem(nsKey()) != null
  if (hasSaved) {
    void useProgress.persist.rehydrate()
  } else {
    useProgress.setState({ ...EMPTY, hydrated: true })
  }
})
