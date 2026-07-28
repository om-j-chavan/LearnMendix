import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, X, Clock, Flag, Send, RotateCcw,
  GraduationCap, AlertTriangle, ListChecks,
} from 'lucide-react'
import { generateExam, BLUEPRINT, EXAM, type ExamModule, type ExamQuestion } from '../data/examPool'
import { useProgress } from '../store/useProgress'
import { useCelebrate } from '../lib/useCelebrate'
import { bigCelebrate } from '../lib/fx'
import { play } from '../lib/sound'

interface Result {
  pct: number
  correct: number
  total: number
  passed: boolean
  xp: number
  best: number
  timeUsed: number
  byModule: Record<string, { correct: number; total: number }>
}

const MODS = Object.keys(BLUEPRINT) as ExamModule[]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

/** exact-match: selected set equals the correct set (all-or-nothing) */
function setEq(a: number[], b: number[]) {
  return a.length === b.length && a.every((x) => b.includes(x))
}

export default function Exam() {
  const nav = useNavigate()
  const recordExam = useProgress((s) => s.recordExam)
  const examBest = useProgress((s) => s.examBest)
  const sound = useProgress((s) => s.sound)
  const celebrate = useCelebrate()

  const [phase, setPhase] = useState<'intro' | 'running' | 'results'>('intro')
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [answers, setAnswers] = useState<number[][]>([])
  const [marked, setMarked] = useState<Set<number>>(new Set())
  const [current, setCurrent] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(EXAM.minutes * 60)
  const [result, setResult] = useState<Result | null>(null)
  const submittedRef = useRef(false)

  const answeredCount = answers.filter((a) => a && a.length > 0).length

  const submit = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    let correct = 0
    const byModule: Record<string, { correct: number; total: number }> = {}
    questions.forEach((q, i) => {
      const ok = setEq(answers[i] || [], q.correct)
      byModule[q.m] = byModule[q.m] || { correct: 0, total: 0 }
      byModule[q.m].total++
      if (ok) {
        correct++
        byModule[q.m].correct++
      }
    })
    const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0
    const timeUsed = EXAM.minutes * 60 - secondsLeft
    const r = recordExam(pct)
    setResult({ pct, correct, total: questions.length, passed: r.passed, xp: r.xpGained, best: r.best, timeUsed, byModule })
    setPhase('results')
    if (r.passed) bigCelebrate()
    play(r.passed ? 'complete' : 'wrong', sound)
    celebrate(r, { xpLabel: 'mock exam' })
  }, [questions, answers, secondsLeft, recordExam, sound, celebrate])

  // countdown timer
  useEffect(() => {
    if (phase !== 'running') return
    if (secondsLeft <= 0) {
      submit()
      return
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [phase, secondsLeft, submit])

  function start() {
    const qs = generateExam()
    setQuestions(qs)
    setAnswers(qs.map(() => []))
    setMarked(new Set())
    setCurrent(0)
    setSecondsLeft(EXAM.minutes * 60)
    submittedRef.current = false
    setResult(null)
    setPhase('running')
  }

  function choose(optIdx: number) {
    setAnswers((a) => {
      const next = a.map((x) => x.slice())
      const cur = next[current] || []
      if (questions[current].multi) {
        const at = cur.indexOf(optIdx)
        if (at >= 0) cur.splice(at, 1)
        else cur.push(optIdx)
        next[current] = cur
      } else {
        next[current] = [optIdx]
      }
      return next
    })
  }
  function toggleMark() {
    setMarked((m) => {
      const next = new Set(m)
      next.has(current) ? next.delete(current) : next.add(current)
      return next
    })
  }
  function trySubmit() {
    const unanswered = questions.length - answeredCount
    if (unanswered > 0 && !window.confirm(`You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Submit anyway?`)) return
    submit()
  }

  /* --------------------------------- INTRO --------------------------------- */
  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <motion.div className="glass p-8 text-center relative overflow-hidden" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ boxShadow: '0 0 40px rgba(168,85,247,.18)' }}>
          <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle,rgba(168,85,247,.35),transparent 70%)' }} />
          <div className="relative">
            <div className="text-6xl mb-3">🎓</div>
            <h1 className="font-display font-black text-3xl">Mock Exam</h1>
            <p className="text-white/60 mt-2 max-w-lg mx-auto">
              A full simulation of the Mendix Intermediate Developer exam — same format, timing and topic weighting as the real thing.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <Stat big={`${EXAM.count}`} label="questions" />
              <Stat big={`${EXAM.minutes} min`} label="time limit" />
              <Stat big={`${EXAM.passPct}%`} label="to pass" />
            </div>

            <div className="text-left text-sm text-white/70 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-6 space-y-1.5">
              <div className="flex gap-2"><ListChecks size={16} className="text-neon-cyan shrink-0 mt-0.5" /><span>Weighted by the real blueprint (Domain Model &amp; Security carry the most), with a mix of single-answer and <b>multi-select</b> (“select all that apply”) questions.</span></div>
              <div className="flex gap-2"><Clock size={16} className="text-neon-amber shrink-0 mt-0.5" /><span>A 90-minute timer counts down and auto-submits at zero. You can revisit and change answers, and flag questions for review.</span></div>
              <div className="flex gap-2"><AlertTriangle size={16} className="text-neon-pink shrink-0 mt-0.5" /><span>These are original practice questions that mirror the exam — not the confidential real items. Don’t refresh mid-exam or your progress resets.</span></div>
            </div>

            {examBest > 0 && (
              <div className="mt-4 text-sm text-white/60">Your best mock score so far: <b style={{ color: examBest >= EXAM.passPct ? '#a3e635' : '#f59e0b' }}>{examBest}%</b></div>
            )}

            <button className="btn-primary text-base !px-8 !py-3 mt-6" onClick={start}>
              <GraduationCap size={18} /> Start the exam
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  /* -------------------------------- RESULTS -------------------------------- */
  if (phase === 'results' && result) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div className="glass p-8 text-center relative overflow-hidden" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ boxShadow: result.passed ? '0 0 40px rgba(163,230,53,.25)' : '0 0 30px rgba(239,68,68,.15)' }}>
          <div className="text-6xl mb-2">{result.passed ? '🏆' : '📚'}</div>
          <div className="font-display tracking-[0.3em] text-sm" style={{ color: result.passed ? '#a3e635' : '#f59e0b' }}>
            {result.passed ? 'PASSED' : 'NOT YET'}
          </div>
          <div className="font-display font-black text-6xl my-2" style={{ color: result.passed ? '#a3e635' : '#f59e0b' }}>{result.pct}%</div>
          <p className="text-white/65">
            {result.correct} / {result.total} correct · you needed {EXAM.passPct}% · time used {fmt(result.timeUsed)}
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-sm flex-wrap">
            {result.xp > 0 && <span className="chip bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">⚡ +{result.xp} XP</span>}
            <span className="chip bg-white/8 text-white/70 border border-white/15">Best: {result.best}%</span>
          </div>

          {/* per-module breakdown */}
          <div className="text-left mt-6">
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">By module</div>
            <div className="space-y-2">
              {MODS.map((m) => {
                const b = result.byModule[m] || { correct: 0, total: 0 }
                const pct = b.total ? Math.round((b.correct / b.total) * 100) : 0
                const good = pct >= EXAM.passPct
                return (
                  <div key={m} className="flex items-center gap-3 text-sm">
                    <span className="w-32 shrink-0 text-white/70">{m}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: good ? '#a3e635' : '#f59e0b' }} />
                    </div>
                    <span className="tabular-nums text-white/60 w-14 text-right">{b.correct}/{b.total}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <button className="btn-ghost flex-1" onClick={() => nav('/')}>Back to dashboard</button>
            <button className="btn-primary flex-1" onClick={start}><RotateCcw size={16} /> New exam</button>
          </div>
        </motion.div>

        {/* review */}
        <div className="mt-5 space-y-2">
          <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Review — {result.total} questions</div>
          {questions.map((q, i) => {
            const yours = answers[i] || []
            const ok = setEq(yours, q.correct)
            const correctText = q.correct.map((ci) => q.options[ci]).join('  ·  ')
            return (
              <div key={i} className="glass p-3.5 text-sm">
                <div className="flex items-start gap-2">
                  <span className={`grid place-items-center rounded-full w-5 h-5 shrink-0 mt-0.5 ${ok ? 'bg-neon-lime/20 text-neon-lime' : 'bg-neon-red/20 text-neon-red'}`}>
                    {ok ? <Check size={13} /> : <X size={13} />}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-white/85">
                      <span className="text-white/40 mr-1">{i + 1}.</span>{q.q}
                      {q.multi && <span className="ml-2 text-[10px] uppercase tracking-wide text-neon-amber">multi</span>}
                    </div>
                    {!ok && yours.length > 0 && <div className="text-neon-red/90 mt-1">Your answer: {yours.map((yi) => q.options[yi]).join(', ')}</div>}
                    {!ok && yours.length === 0 && <div className="text-white/40 mt-1">Not answered</div>}
                    <div className="text-white/60 mt-0.5"><b style={{ color: '#a3e635' }}>{correctText}</b> — {q.why}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  /* -------------------------------- RUNNING -------------------------------- */
  const q = questions[current]
  const lowTime = secondsLeft < 300
  return (
    <div className="max-w-3xl mx-auto">
      {/* sticky exam bar */}
      <div className="glass p-3 mb-4 flex items-center gap-3 sticky top-[68px] z-20">
        <div className="flex items-center gap-2 font-display font-bold text-lg tabular-nums px-2" style={{ color: lowTime ? '#ef4444' : '#22d3ee' }}>
          <Clock size={18} className={lowTime ? 'animate-pulse' : ''} /> {fmt(secondsLeft)}
        </div>
        <div className="text-sm text-white/55 hidden sm:block">{answeredCount}/{questions.length} answered</div>
        <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden max-w-[200px] hidden sm:block">
          <div className="h-full rounded-full" style={{ width: `${(answeredCount / questions.length) * 100}%`, background: 'linear-gradient(90deg,#22d3ee,#a855f7)' }} />
        </div>
        <button className="btn-primary ml-auto !py-2" onClick={trySubmit}><Send size={16} /> Submit</button>
      </div>

      {/* question */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="chip bg-neon-purple/15 text-neon-purple border border-neon-purple/30">{q.m}</span>
              <span className="text-xs text-white/45">Question {current + 1} of {questions.length}</span>
            </div>
            <h2 className="font-display font-bold text-xl mb-1">{q.q}</h2>
            {q.multi ? (
              <div className="text-xs text-neon-amber mb-3 flex items-center gap-1.5"><ListChecks size={13} /> Select all that apply</div>
            ) : (
              <div className="mb-3" />
            )}
            <div className="space-y-2.5">
              {q.options.map((opt, i) => {
                const chosen = (answers[current] || []).includes(i)
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    className="w-full text-left rounded-xl px-4 py-3 flex items-center gap-3 transition-all"
                    style={{ border: `1.5px solid ${chosen ? '#a855f7' : 'rgba(255,255,255,.12)'}`, background: chosen ? 'rgba(168,85,247,.12)' : 'rgba(255,255,255,.03)' }}
                  >
                    <span
                      className={`grid place-items-center w-7 h-7 shrink-0 font-display font-bold text-sm ${q.multi ? 'rounded-md' : 'rounded-lg'}`}
                      style={{ background: chosen ? 'rgba(168,85,247,.28)' : 'rgba(255,255,255,.06)', color: chosen ? '#c99dff' : '#9fb0d0' }}
                    >
                      {chosen && q.multi ? <Check size={15} /> : String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-[15px] text-white/85">{opt}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button className="btn-ghost" disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
              <ArrowLeft size={16} /> Prev
            </button>
            <button className={`btn-ghost ${marked.has(current) ? '!text-neon-amber !border-neon-amber/50' : ''}`} onClick={toggleMark}>
              <Flag size={15} /> {marked.has(current) ? 'Flagged' : 'Flag'}
            </button>
            {current < questions.length - 1 ? (
              <button className="btn-primary ml-auto" onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}>
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button className="btn-primary ml-auto" onClick={trySubmit}><Send size={16} /> Submit exam</button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* palette */}
      <div className="glass p-3 mt-4">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2 px-1">Question navigator</div>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => {
            const answered = (answers[i] || []).length > 0
            const isMarked = marked.has(i)
            const isCurrent = i === current
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-8 h-8 rounded-lg text-xs font-bold grid place-items-center transition-all relative"
                style={{
                  background: answered ? 'rgba(34,211,238,.18)' : 'rgba(255,255,255,.05)',
                  border: `1.5px solid ${isCurrent ? '#a855f7' : answered ? 'rgba(34,211,238,.5)' : 'rgba(255,255,255,.1)'}`,
                  color: answered ? '#22d3ee' : '#9fb0d0',
                }}
                title={isMarked ? 'Flagged for review' : answered ? 'Answered' : 'Not answered'}
              >
                {i + 1}
                {isMarked && <span className="absolute -top-1 -right-1 text-[9px]">🚩</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Stat({ big, label }: { big: string; label: string }) {
  return (
    <div className="glass p-3">
      <div className="font-display font-black text-2xl text-neon-cyan">{big}</div>
      <div className="text-[11px] text-white/50 uppercase tracking-wide">{label}</div>
    </div>
  )
}
