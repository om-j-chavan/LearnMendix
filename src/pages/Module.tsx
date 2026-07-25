import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, BookOpen, Zap, ClipboardCheck, Award, ChevronRight } from 'lucide-react'
import { findModule } from '../data/courses'
import { useProgress } from '../store/useProgress'
import { moduleLessonProgress } from '../lib/selectors'
import { PASS } from '../lib/gamification'
import { accentHex } from '../lib/ui'
import type { LevelId } from '../types'

export default function ModulePage() {
  const { levelId, moduleId } = useParams()
  const { level, module } = findModule(levelId ?? '', moduleId ?? '')
  const { doneLessons, quizBest, setLastVisited } = useProgress()

  useEffect(() => {
    if (level && module) setLastVisited(level.id as LevelId, module.id)
  }, [level, module, setLastVisited])

  if (!level || !module) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-white/70">Module not found.</p>
        <Link to="/" className="btn-primary mt-4 inline-flex">Back home</Link>
      </div>
    )
  }

  const accent = accentHex(module.accent)
  const prog = moduleLessonProgress(module, doneLessons)
  const best = quizBest[module.id]
  const passed = best != null && best >= PASS
  const hasQuiz = module.quiz.length > 0

  return (
    <div>
      <Link to={`/track/${level.id}`} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4">
        <ArrowLeft size={16} /> {level.name}
      </Link>

      <header className="glass p-6 mb-5 relative overflow-hidden" style={{ boxShadow: `0 0 30px ${accent}22` }}>
        <div className="absolute -right-8 -top-10 w-44 h-44 rounded-full blur-3xl" style={{ background: `radial-gradient(circle,${accent}44,transparent 70%)` }} />
        <div className="relative flex items-center gap-4">
          <div className="text-4xl grid place-items-center rounded-2xl w-16 h-16" style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${accent}66` }}>
            {module.icon}
          </div>
          <div className="flex-1">
            <h1 className="font-display font-black text-2xl" style={{ color: accent }}>{module.title}</h1>
            <p className="text-white/60">{module.blurb}</p>
          </div>
          <div className="hidden sm:block text-right">
            <div className="font-display font-black text-2xl tabular-nums">{Math.round(prog.pct * 100)}%</div>
            <div className="text-[11px] text-white/45">{prog.done}/{prog.total} lessons</div>
          </div>
        </div>
      </header>

      {/* Lessons */}
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2">
        <BookOpen size={15} /> Lessons
      </h2>
      <div className="space-y-2.5 mb-6">
        {module.lessons.map((lesson, i) => {
          const done = !!doneLessons[lesson.id]
          return (
            <motion.div key={lesson.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link to={`/lesson/${level.id}/${module.id}/${lesson.id}`} className="glass card-hover p-4 flex items-center gap-3 group" style={{ display: 'flex' }}>
                <div
                  className="grid place-items-center rounded-full w-9 h-9 shrink-0"
                  style={{ background: done ? accent : 'rgba(255,255,255,.05)', border: `1px solid ${done ? accent : 'rgba(255,255,255,.15)'}`, color: done ? '#05050c' : accent }}
                >
                  {done ? <Check size={18} /> : <span className="font-display font-bold text-sm">{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold group-hover:text-white truncate">{lesson.title}</div>
                  <div className="text-[11px] text-white/45 flex items-center gap-1.5">
                    {lesson.depth === 'full' ? <><Zap size={11} /> Full lesson</> : <><BookOpen size={11} /> Revision card</>}
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Quiz */}
      {hasQuiz ? (
        <Link
          to={`/quiz/${level.id}/${module.id}`}
          className="glass card-hover p-5 flex items-center gap-4 group"
          style={{ display: 'flex', boxShadow: passed ? '0 0 24px rgba(163,230,53,.2)' : `0 0 24px ${accent}22`, borderColor: passed ? 'rgba(163,230,53,.4)' : undefined }}
        >
          <div className="grid place-items-center rounded-2xl w-14 h-14 shrink-0" style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${passed ? 'rgba(163,230,53,.5)' : accent + '66'}`, color: passed ? '#a3e635' : accent }}>
            {passed ? <Award size={26} /> : <ClipboardCheck size={26} />}
          </div>
          <div className="flex-1">
            <div className="font-display font-bold text-lg">{passed ? 'Quiz passed 🎉' : 'Module Quiz'}</div>
            <div className="text-white/55 text-sm">
              {module.quiz.length} questions · need {PASS}% to pass
              {best != null && <> · best score <b style={{ color: passed ? '#a3e635' : '#f59e0b' }}>{best}%</b></>}
            </div>
          </div>
          <span className="btn-primary shrink-0">{best != null ? 'Retake' : 'Start quiz'} →</span>
        </Link>
      ) : (
        <div className="glass p-5 text-white/50 text-sm text-center">
          This is a preview module — the quiz arrives with the full lessons in a later update.
        </div>
      )}
    </div>
  )
}
