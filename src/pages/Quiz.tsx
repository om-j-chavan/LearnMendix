import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, X, RotateCcw, ArrowRight, Trophy, PartyPopper } from 'lucide-react'
import { findModule, LEVEL_BY_ID } from '../data/courses'
import { useProgress } from '../store/useProgress'
import { useCelebrate } from '../lib/useCelebrate'
import { PASS } from '../lib/gamification'
import { accentHex } from '../lib/ui'
import { bigCelebrate } from '../lib/fx'
import { play } from '../lib/sound'

export default function Quiz() {
  const { levelId, moduleId } = useParams()
  const nav = useNavigate()
  const { level, module } = findModule(levelId ?? '', moduleId ?? '')
  const submitQuiz = useProgress((s) => s.submitQuiz)
  const sound = useProgress((s) => s.sound)
  const celebrate = useCelebrate()

  const total = module?.quiz.length ?? 0
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<(number | null)[]>(() => Array(total).fill(null))
  const [phase, setPhase] = useState<'quiz' | 'results'>('quiz')
  const submittedRef = useRef(false)
  const [result, setResult] = useState<{ pct: number; passed: boolean; xp: number; best: number } | null>(null)

  const correctCount = selected.reduce<number>((n, sel, i) => n + (sel === module?.quiz[i].correct ? 1 : 0), 0)
  const pct = total ? Math.round((correctCount / total) * 100) : 0

  useEffect(() => {
    if (phase === 'results' && !submittedRef.current && module) {
      submittedRef.current = true
      const r = submitQuiz(module.id, pct)
      setResult({ pct, passed: r.passed, xp: r.xpGained, best: r.best })
      if (r.passed) bigCelebrate()
      play(r.passed ? 'complete' : 'wrong', sound)
      celebrate(r, { xpLabel: 'quiz' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (!level || !module || total === 0) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-white/70">No quiz here.</p>
        <Link to="/" className="btn-primary mt-4 inline-flex">Back home</Link>
      </div>
    )
  }

  const accent = accentHex(module.accent)
  const q = module.quiz[current]
  const answered = selected[current] !== null
  const isCorrect = selected[current] === q.correct

  function choose(i: number) {
    if (answered) return
    const nextSel = [...selected]
    nextSel[current] = i
    setSelected(nextSel)
    play(i === q.correct ? 'correct' : 'wrong', sound)
  }

  function advance() {
    if (current + 1 < total) setCurrent((c) => c + 1)
    else setPhase('results')
  }

  function retake() {
    submittedRef.current = false
    setResult(null)
    setSelected(Array(total).fill(null))
    setCurrent(0)
    setPhase('quiz')
  }

  const modIdx = level.modules.findIndex((m) => m.id === module.id)
  const nextMod = level.modules[modIdx + 1]

  /* ------------------------------ results ------------------------------ */
  if (phase === 'results' && result) {
    const passed = result.passed
    return (
      <div className="max-w-xl mx-auto">
        <motion.div className="glass p-8 text-center relative overflow-hidden" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ boxShadow: passed ? '0 0 40px rgba(163,230,53,.25)' : '0 0 30px rgba(239,68,68,.15)' }}>
          <div className="text-6xl mb-2">{passed ? '🏆' : '💪'}</div>
          <div className="font-display tracking-[0.3em] text-sm mb-1" style={{ color: passed ? '#a3e635' : '#f59e0b' }}>
            {passed ? 'QUIZ PASSED' : 'ALMOST THERE'}
          </div>
          <div className="font-display font-black text-6xl my-2" style={{ color: passed ? '#a3e635' : '#f59e0b' }}>
            {result.pct}%
          </div>
          <p className="text-white/65">
            You got <b className="text-white">{correctCount}</b> of <b className="text-white">{total}</b> right.
            {passed ? ` You needed ${PASS}% — nailed it!` : ` You need ${PASS}% to pass — give it another go!`}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            {result.xp > 0 && <span className="chip bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">⚡ +{result.xp} XP</span>}
            <span className="chip bg-white/8 text-white/70 border border-white/15">Best: {result.best}%</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <button className="btn-ghost flex-1" onClick={retake}>
              <RotateCcw size={16} /> Retake
            </button>
            {passed && nextMod ? (
              <button className="btn-primary flex-1" onClick={() => nav(`/module/${level.id}/${nextMod.id}`)}>
                Next module <ArrowRight size={16} />
              </button>
            ) : (
              <button className="btn-primary flex-1" onClick={() => nav(`/track/${level.id}`)}>
                {passed ? <><PartyPopper size={16} /> Back to track</> : <>Back to track</>}
              </button>
            )}
          </div>
          {passed && nextMod && (
            <div className="mt-3 text-xs text-neon-lime">🔓 You unlocked “{nextMod.title}”!</div>
          )}
        </motion.div>

        {/* review */}
        <div className="mt-5 space-y-2">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Review</div>
          {module.quiz.map((qq, i) => {
            const ok = selected[i] === qq.correct
            return (
              <div key={i} className="glass p-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className={`grid place-items-center rounded-full w-5 h-5 shrink-0 mt-0.5 ${ok ? 'bg-neon-lime/20 text-neon-lime' : 'bg-neon-red/20 text-neon-red'}`}>
                    {ok ? <Check size={13} /> : <X size={13} />}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-white/85">{qq.q}</div>
                    <div className="text-white/55 mt-0.5">
                      <b style={{ color: '#a3e635' }}>{qq.options[qq.correct]}</b> — {qq.why}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  /* ------------------------------- quiz -------------------------------- */
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link to={`/module/${level.id}/${module.id}`} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> {module.title}
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
          <Trophy size={13} /> {module.title} quiz
        </span>
      </div>

      {/* progress */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${((current + (answered ? 1 : 0)) / total) * 100}%`, background: `linear-gradient(90deg,${accent},#ec4899)` }} />
        </div>
        <span className="text-xs text-white/50 tabular-nums">{current + 1}/{total}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
          <div className="glass p-6">
            <h2 className="font-display font-bold text-xl mb-4">{q.q}</h2>
            <div className="space-y-2.5">
              {q.options.map((opt, i) => {
                const chosen = selected[current] === i
                const showCorrect = answered && i === q.correct
                const showWrong = answered && chosen && i !== q.correct
                let border = 'rgba(255,255,255,.12)'
                let bg = 'rgba(255,255,255,.03)'
                if (showCorrect) {
                  border = '#a3e635'
                  bg = 'rgba(163,230,53,.12)'
                } else if (showWrong) {
                  border = '#ef4444'
                  bg = 'rgba(239,68,68,.12)'
                } else if (chosen) {
                  border = accent
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={answered}
                    className="w-full text-left rounded-xl px-4 py-3 flex items-center gap-3 transition-all disabled:cursor-default"
                    style={{ border: `1.5px solid ${border}`, background: bg }}
                  >
                    <span className="grid place-items-center rounded-lg w-7 h-7 shrink-0 font-display font-bold text-sm" style={{ background: 'rgba(255,255,255,.06)', color: showCorrect ? '#a3e635' : showWrong ? '#ef4444' : accent }}>
                      {showCorrect ? <Check size={16} /> : showWrong ? <X size={16} /> : String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-[15px] text-white/85">{opt}</span>
                  </button>
                )
              })}
            </div>

            <AnimatePresence>
              {answered && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 overflow-hidden">
                  <div className="rounded-xl px-4 py-3 text-sm" style={{ background: isCorrect ? 'rgba(163,230,53,.1)' : 'rgba(245,158,11,.1)', border: `1px solid ${isCorrect ? 'rgba(163,230,53,.4)' : 'rgba(245,158,11,.4)'}` }}>
                    <b style={{ color: isCorrect ? '#a3e635' : '#f59e0b' }}>{isCorrect ? 'Correct! ' : 'Not quite. '}</b>
                    <span className="text-white/75">{q.why}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-end mt-4">
            <button className="btn-primary text-base !px-6 !py-3 disabled:opacity-40 disabled:cursor-not-allowed" disabled={!answered} onClick={advance}>
              {current + 1 < total ? 'Next question' : 'See results'} <ArrowRight size={17} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
