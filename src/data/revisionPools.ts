import { COURSES } from './courses'
import { allExamQuestions } from './examPool'
import type { QuizQuestion } from '../types'

/**
 * Revision quizzes are generated RANDOMLY each time they are taken, drawing
 * from a pool of that level's questions (all module quizzes, plus the exam pool
 * for Intermediate). Answer positions are re-shuffled per question too, so no
 * two attempts are identical.
 */

export const REVISION_SIZE = 12

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function shuffleOptions(q: QuizQuestion): QuizQuestion {
  const correctText = q.options[q.correct]
  const options = shuffle(q.options)
  return { ...q, options, correct: options.indexOf(correctText) }
}

/** All questions available for a level's revision quiz. */
export function poolForLevel(levelId: string): QuizQuestion[] {
  const level = COURSES.find((l) => l.id === levelId)
  const base: QuizQuestion[] = level ? level.modules.flatMap((m) => m.quiz) : []
  if (levelId === 'intermediate') return [...base, ...allExamQuestions()]
  return base
}

/** Build a fresh, randomised revision quiz for a level. */
export function generateRevisionQuiz(levelId: string, count = REVISION_SIZE): QuizQuestion[] {
  const pool = poolForLevel(levelId)
  const picked = shuffle(pool).slice(0, Math.min(count, pool.length))
  return picked.map(shuffleOptions)
}

export function isRevisionModule(moduleId: string): boolean {
  return moduleId.endsWith('-revision')
}
