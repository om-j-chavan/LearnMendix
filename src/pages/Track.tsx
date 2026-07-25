import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Lock, Star } from 'lucide-react'
import { LEVEL_BY_ID } from '../data/courses'
import { useProgress } from '../store/useProgress'
import { isModuleUnlocked, moduleComplete, moduleLessonProgress, quizPassed, levelProgress } from '../lib/selectors'
import { accentHex } from '../lib/ui'

export default function Track() {
  const { levelId } = useParams()
  const nav = useNavigate()
  const level = levelId ? LEVEL_BY_ID[levelId] : undefined
  const { doneLessons, quizBest } = useProgress()

  if (!level) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-white/70">That track doesn’t exist.</p>
        <Link to="/" className="btn-primary mt-4 inline-flex">Back home</Link>
      </div>
    )
  }

  const lp = levelProgress(level, doneLessons, quizBest)
  const preview = level.status === 'preview'

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4">
        <ArrowLeft size={16} /> Dashboard
      </Link>

      <header className="glass p-6 mb-6 relative overflow-hidden" style={{ boxShadow: `0 0 34px ${level.color}22` }}>
        <div className="absolute -right-8 -top-10 w-48 h-48 rounded-full blur-3xl" style={{ background: `radial-gradient(circle,${level.color}44,transparent 70%)` }} />
        <div className="relative flex items-center gap-4">
          <div className="text-5xl grid place-items-center rounded-2xl w-20 h-20" style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${level.color}66`, boxShadow: `0 0 24px ${level.color}33` }}>
            {level.icon}
          </div>
          <div className="flex-1">
            <h1 className="font-display font-black text-2xl md:text-3xl" style={{ color: level.color }}>{level.name}</h1>
            <p className="text-white/60">{level.tagline}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-white/8 overflow-hidden max-w-sm">
                <div className="h-full rounded-full" style={{ width: `${Math.round(lp.pct * 100)}%`, background: `linear-gradient(90deg,${level.color},#ec4899)` }} />
              </div>
              <span className="text-sm text-white/60 tabular-nums">{Math.round(lp.pct * 100)}%</span>
            </div>
          </div>
        </div>
        {preview && (
          <div className="relative mt-4 text-sm text-white/70 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            🔓 <b>Preview track.</b> Each module shows what’s coming. Full lessons and quizzes for {level.name} arrive in a later update — Rapid &amp; Intermediate are complete now.
          </div>
        )}
      </header>

      {/* Module path */}
      <div className="relative pl-4">
        <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-white/10" />
        <div className="space-y-3">
          {level.modules.map((mod, i) => {
            const unlocked = isModuleUnlocked(level, i, quizBest)
            const complete = moduleComplete(mod, doneLessons, quizBest)
            const lprog = moduleLessonProgress(mod, doneLessons)
            const passed = mod.quiz.length > 0 && quizPassed(mod, quizBest)
            const accent = accentHex(mod.accent)
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative flex items-stretch gap-4"
              >
                {/* node */}
                <div className="relative z-10 shrink-0 grid place-items-center">
                  <div
                    className="grid place-items-center rounded-full text-xl"
                    style={{
                      width: 48,
                      height: 48,
                      background: complete ? accent : 'rgba(10,10,22,.9)',
                      border: `2px solid ${unlocked ? accent : 'rgba(255,255,255,.15)'}`,
                      boxShadow: unlocked ? `0 0 16px ${accent}66` : 'none',
                      color: complete ? '#05050c' : undefined,
                    }}
                  >
                    {complete ? <Check size={22} /> : unlocked ? <span>{mod.icon}</span> : <Lock size={16} className="text-white/40" />}
                  </div>
                </div>

                {/* card */}
                {unlocked ? (
                  <Link to={`/module/${level.id}/${mod.id}`} className="glass card-hover flex-1 p-4 flex items-center gap-3 group" style={{ display: 'flex' }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-base group-hover:text-white" style={{ color: accent }}>{mod.title}</h3>
                        {passed && <span className="chip bg-neon-lime/15 text-neon-lime border border-neon-lime/30"><Star size={11} /> Quiz passed</span>}
                        {complete && <span className="chip bg-white/10 text-white/70 border border-white/15"><Check size={11} /> Done</span>}
                      </div>
                      <p className="text-white/55 text-sm truncate">{mod.blurb}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden flex-1 max-w-[240px]">
                          <div className="h-full rounded-full" style={{ width: `${Math.round(lprog.pct * 100)}%`, background: accent }} />
                        </div>
                        <span className="text-[11px] text-white/45">
                          {lprog.done}/{lprog.total} lessons{mod.quiz.length ? ' · quiz' : ''}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <button
                    className="glass flex-1 p-4 flex items-center gap-3 opacity-60 cursor-not-allowed text-left"
                    onClick={() => nav(`/track/${level.id}`)}
                    title="Pass the previous module’s quiz to unlock"
                  >
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-base text-white/50">{mod.title}</h3>
                      <p className="text-white/35 text-sm">🔒 Pass the previous quiz to unlock this module.</p>
                    </div>
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
