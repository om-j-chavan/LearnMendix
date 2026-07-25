import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, GraduationCap, Lightbulb, Wrench, Zap, BookOpen } from 'lucide-react'
import { findModule } from '../data/courses'
import { useProgress } from '../store/useProgress'
import { useCelebrate } from '../lib/useCelebrate'
import { accentHex } from '../lib/ui'

export default function Lesson() {
  const { levelId, moduleId, lessonId } = useParams()
  const nav = useNavigate()
  const { level, module } = findModule(levelId ?? '', moduleId ?? '')
  const doneLessons = useProgress((s) => s.doneLessons)
  const completeLesson = useProgress((s) => s.completeLesson)
  const celebrate = useCelebrate()

  if (!level || !module) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-white/70">Lesson not found.</p>
        <Link to="/" className="btn-primary mt-4 inline-flex">Back home</Link>
      </div>
    )
  }

  const idx = module.lessons.findIndex((l) => l.id === lessonId)
  const lesson = module.lessons[idx]
  if (!lesson) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-white/70">Lesson not found.</p>
        <Link to={`/module/${level.id}/${module.id}`} className="btn-primary mt-4 inline-flex">Back to module</Link>
      </div>
    )
  }

  const accent = accentHex(module.accent)
  const done = !!doneLessons[lesson.id]
  const prev = module.lessons[idx - 1]
  const next = module.lessons[idx + 1]

  const goNextTarget = next
    ? `/lesson/${level.id}/${module.id}/${next.id}`
    : module.quiz.length > 0
      ? `/quiz/${level.id}/${module.id}`
      : `/module/${level.id}/${module.id}`

  const nextLabel = next ? 'Next lesson' : module.quiz.length > 0 ? 'Take the quiz' : 'Back to module'

  function completeAndGo() {
    const res = completeLesson(lesson.id)
    celebrate(res, { xpLabel: 'lesson done' })
    nav(goNextTarget)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link to={`/module/${level.id}/${module.id}`} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> {module.title}
        </Link>
        <span className="text-xs text-white/40">Lesson {idx + 1} of {module.lessons.length}</span>
      </div>

      <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="chip" style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}66` }}>
            {module.icon} {module.title}
          </span>
          <span className="chip bg-white/8 text-white/60 border border-white/15">
            {lesson.depth === 'full' ? <><Zap size={11} /> Full lesson</> : <><BookOpen size={11} /> Revision card</>}
          </span>
          {done && <span className="chip bg-neon-lime/15 text-neon-lime border border-neon-lime/30"><Check size={11} /> Completed</span>}
        </div>
        <h1 className="font-display font-black text-3xl">{lesson.title}</h1>
      </motion.header>

      {/* Dual panels */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass p-5" style={{ boxShadow: '0 0 24px rgba(34,211,238,.12)' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="grid place-items-center rounded-lg w-8 h-8 text-neon-cyan" style={{ background: 'rgba(34,211,238,.12)', border: '1px solid rgba(34,211,238,.4)' }}>
              <GraduationCap size={17} />
            </div>
            <h2 className="font-display font-bold text-neon-cyan tracking-wide">In depth</h2>
          </div>
          <div className="lesson-prose text-[15px] leading-relaxed text-white/85" dangerouslySetInnerHTML={{ __html: lesson.tech }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass p-5" style={{ boxShadow: '0 0 24px rgba(245,158,11,.12)' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="grid place-items-center rounded-lg w-8 h-8 text-neon-amber" style={{ background: 'rgba(245,158,11,.12)', border: '1px solid rgba(245,158,11,.4)' }}>
              <Lightbulb size={17} />
            </div>
            <h2 className="font-display font-bold text-neon-amber tracking-wide">In plain English</h2>
          </div>
          <div className="lesson-prose text-[15px] leading-relaxed text-white/85" dangerouslySetInnerHTML={{ __html: lesson.simple }} />
        </motion.div>
      </div>

      {lesson.tryit && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 mt-4 flex gap-3" style={{ borderColor: 'rgba(163,230,53,.3)' }}>
          <div className="grid place-items-center rounded-lg w-9 h-9 shrink-0 text-neon-lime self-start" style={{ background: 'rgba(163,230,53,.12)', border: '1px solid rgba(163,230,53,.4)' }}>
            <Wrench size={17} />
          </div>
          <div>
            <div className="font-display font-bold text-neon-lime text-sm tracking-wide mb-0.5">Try it in Studio Pro</div>
            <div className="text-white/75 text-sm lesson-prose" dangerouslySetInnerHTML={{ __html: lesson.tryit }} />
          </div>
        </motion.div>
      )}

      {lesson.terms && lesson.terms.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Key terms</div>
          <div className="flex flex-wrap gap-2">
            {lesson.terms.map((t) => (
              <span key={t} className="chip bg-white/6 border border-white/12 text-white/75 font-mono">{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-3 mt-8">
        {prev ? (
          <Link to={`/lesson/${level.id}/${module.id}/${prev.id}`} className="btn-ghost">
            <ArrowLeft size={16} /> Previous
          </Link>
        ) : (
          <span />
        )}
        <button className="btn-primary text-base !px-6 !py-3" onClick={completeAndGo}>
          {done ? nextLabel : 'Complete & continue'} <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}
