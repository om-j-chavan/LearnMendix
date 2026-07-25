import { COURSES } from '../data/courses'
import { PASS } from './gamification'
import type { Level, LevelId, Module } from '../types'

type Done = Record<string, true>
type Best = Record<string, number>

export function isModuleUnlocked(level: Level, idx: number, quizBest: Best): boolean {
  if (level.status === 'preview') return true
  if (idx === 0) return true
  const prev = level.modules[idx - 1]
  if (!prev || prev.quiz.length === 0) return true
  return (quizBest[prev.id] ?? 0) >= PASS
}

export function moduleLessonProgress(module: Module, doneLessons: Done) {
  const done = module.lessons.filter((l) => doneLessons[l.id]).length
  const total = module.lessons.length
  return { done, total, pct: total ? done / total : 0 }
}

export function quizPassed(module: Module, quizBest: Best): boolean {
  return module.quiz.length === 0 || (quizBest[module.id] ?? 0) >= PASS
}

export function moduleComplete(module: Module, doneLessons: Done, quizBest: Best): boolean {
  const lessonsDone = module.lessons.every((l) => doneLessons[l.id])
  return lessonsDone && quizPassed(module, quizBest)
}

export function levelProgress(level: Level, doneLessons: Done, quizBest: Best) {
  const totalLessons = level.modules.reduce((s, m) => s + m.lessons.length, 0)
  const doneLessonsCount = level.modules.reduce(
    (s, m) => s + m.lessons.filter((l) => doneLessons[l.id]).length,
    0,
  )
  const quizzes = level.modules.filter((m) => m.quiz.length > 0)
  const passed = quizzes.filter((m) => (quizBest[m.id] ?? 0) >= PASS).length
  const totalUnits = totalLessons + quizzes.length
  const doneUnits = doneLessonsCount + passed
  return {
    totalLessons,
    doneLessonsCount,
    quizzes: quizzes.length,
    passed,
    modules: level.modules.length,
    completedModules: level.modules.filter((m) => moduleComplete(m, doneLessons, quizBest)).length,
    pct: totalUnits ? doneUnits / totalUnits : 0,
  }
}

export interface ContinueTarget {
  levelId: LevelId
  moduleId: string
  label: string
}

/** Where the "Continue" button should send the user. */
export function continueTarget(
  doneLessons: Done,
  quizBest: Best,
  lastVisited: { levelId: LevelId; moduleId: string } | null,
): ContinueTarget {
  // 1) last visited, if still incomplete
  if (lastVisited) {
    const lvl = COURSES.find((l) => l.id === lastVisited.levelId)
    const mod = lvl?.modules.find((m) => m.id === lastVisited.moduleId)
    if (lvl && mod && !moduleComplete(mod, doneLessons, quizBest)) {
      return { levelId: lvl.id, moduleId: mod.id, label: `Continue: ${mod.title}` }
    }
  }
  // 2) first incomplete module in an available level
  for (const lvl of COURSES.filter((l) => l.status === 'available')) {
    for (let i = 0; i < lvl.modules.length; i++) {
      const mod = lvl.modules[i]
      if (isModuleUnlocked(lvl, i, quizBest) && !moduleComplete(mod, doneLessons, quizBest)) {
        return { levelId: lvl.id, moduleId: mod.id, label: `Continue: ${mod.title}` }
      }
    }
  }
  // 3) everything done — go to the first module
  const first = COURSES[0]
  return { levelId: first.id, moduleId: first.modules[0].id, label: 'Review from the start' }
}
