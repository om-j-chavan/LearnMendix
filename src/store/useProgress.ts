import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Badge, LevelId } from '../types'
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
  sound: false,
  lastVisited: null,
}

function snapshot(s: ProgressState): ProgressSnapshot {
  return { xp: s.xp, streak: s.streak, doneLessons: s.doneLessons, quizBest: s.quizBest, badges: s.badges }
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
        const draft: ProgressSnapshot = { xp, streak, doneLessons, quizBest: s.quizBest, badges: s.badges }
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
        const draft: ProgressSnapshot = { xp, streak, doneLessons: s.doneLessons, quizBest, badges: s.badges }
        const newBadges = newlyEarnedBadges(draft)
        const badges = { ...s.badges }
        newBadges.forEach((b) => (badges[b.id] = true))
        const to = levelInfo(xp).level
        set({ xp, quizBest, streak, badges })
        return { xpGained, leveledFrom: from, leveledTo: to, newBadges, passed: pct >= PASS, best }
      },

      setLastVisited: (levelId, moduleId) => set({ lastVisited: { levelId, moduleId } }),
      toggleSound: () => set((s) => ({ sound: !s.sound })),
      resetProgress: () => set({ ...EMPTY, hydrated: true }),
    }),
    {
      name: 'learnmendix-progress-v1',
      partialize: (s) => ({
        xp: s.xp,
        streak: s.streak,
        doneLessons: s.doneLessons,
        quizBest: s.quizBest,
        badges: s.badges,
        sound: s.sound,
        lastVisited: s.lastVisited,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true
      },
    },
  ),
)
