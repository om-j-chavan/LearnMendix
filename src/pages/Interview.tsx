import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Check, Circle, BookOpen, Wrench, Mic, ClipboardCheck,
  Sparkles, MessageSquare, Star, HelpCircle, Briefcase,
} from 'lucide-react'
import { PREP_DAYS, PREP_TOTAL, WEEKS, TOPIC_BANK, BEHAVIORAL, EDGE, ASK } from '../data/interviewPlan'
import { useProgress } from '../store/useProgress'
import { useCelebrate } from '../lib/useCelebrate'

type Tab = 'plan' | 'topics' | 'behavioral' | 'edge'

export default function Interview() {
  const prepDays = useProgress((s) => s.prepDays ?? {})
  const togglePrepDay = useProgress((s) => s.togglePrepDay)
  const celebrate = useCelebrate()
  const [tab, setTab] = useState<Tab>('plan')

  const done = Object.keys(prepDays).length
  const pct = Math.round((done / PREP_TOTAL) * 100)

  function toggle(day: number) {
    const res = togglePrepDay(day)
    if (res.done) celebrate(res, { xpLabel: `day ${day} done` })
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4">
        <ArrowLeft size={16} /> Dashboard
      </Link>

      {/* header */}
      <header className="glass p-6 mb-5 relative overflow-hidden" style={{ boxShadow: '0 0 34px rgba(236,72,153,.18)' }}>
        <div className="absolute -right-8 -top-10 w-52 h-52 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle,rgba(236,72,153,.35),transparent 70%)' }} />
        <div className="relative flex items-center gap-4">
          <div className="text-4xl grid place-items-center rounded-2xl w-16 h-16" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(236,72,153,.5)' }}>💼</div>
          <div className="flex-1">
            <h1 className="font-display font-black text-2xl md:text-3xl">Interview Prep</h1>
            <p className="text-white/60">A 30-day plan to walk into any Mendix interview confident. Tick off a day as you finish it.</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-white/8 overflow-hidden max-w-sm">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#ec4899,#a855f7)' }} />
              </div>
              <span className="text-sm text-white/60 tabular-nums">{done}/{PREP_TOTAL} days · {pct}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <TabBtn active={tab === 'plan'} onClick={() => setTab('plan')} icon={<ClipboardCheck size={15} />}>30-Day Plan</TabBtn>
        <TabBtn active={tab === 'topics'} onClick={() => setTab('topics')} icon={<BookOpen size={15} />}>Topic Bank</TabBtn>
        <TabBtn active={tab === 'behavioral'} onClick={() => setTab('behavioral')} icon={<MessageSquare size={15} />}>Behavioral</TabBtn>
        <TabBtn active={tab === 'edge'} onClick={() => setTab('edge')} icon={<Star size={15} />}>Your Edge</TabBtn>
      </div>

      {/* PLAN */}
      {tab === 'plan' && (
        <div className="space-y-6">
          {WEEKS.map((wk) => (
            <section key={wk.n}>
              <div className="flex items-center gap-2 mb-2">
                <span className="chip" style={{ background: `${wk.color}22`, color: wk.color, border: `1px solid ${wk.color}55` }}>Week {wk.n}</span>
                <h2 className="font-display font-bold" style={{ color: wk.color }}>{wk.title}</h2>
                <span className="text-white/40 text-sm">· {wk.days}</span>
              </div>
              <div className="space-y-2">
                {PREP_DAYS.filter((d) => d.week === wk.n).map((d, i) => {
                  const isDone = !!prepDays[d.day]
                  return (
                    <motion.div key={d.day} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="glass p-3 flex items-start gap-3">
                      <button
                        onClick={() => toggle(d.day)}
                        title={isDone ? 'Mark not done' : 'Mark done'}
                        className="grid place-items-center rounded-full w-8 h-8 shrink-0 mt-0.5 transition-all"
                        style={{ background: isDone ? wk.color : 'rgba(255,255,255,.05)', border: `1px solid ${isDone ? wk.color : 'rgba(255,255,255,.15)'}`, color: isDone ? '#05050c' : '#9fb0d0' }}
                      >
                        {isDone ? <Check size={17} /> : <Circle size={15} />}
                      </button>
                      <details className="flex-1 min-w-0 group">
                        <summary className="cursor-pointer list-none flex items-center gap-2 flex-wrap">
                          <span className="font-display font-bold text-sm" style={{ color: isDone ? 'rgba(255,255,255,.5)' : '#e7e9f5', textDecoration: isDone ? 'line-through' : 'none' }}>
                            Day {d.day} · {d.title}
                          </span>
                          {d.light && <span className="chip bg-white/8 text-white/55 border border-white/15 text-[10px]">easy start</span>}
                          <span className="chip bg-white/6 text-white/50 border border-white/10 text-[10px]">{d.hours}</span>
                          <span className="ml-auto text-white/30 text-xs group-open:rotate-180 transition-transform">▾</span>
                        </summary>
                        <div className="mt-3 space-y-3 text-sm">
                          <Row icon={<BookOpen size={14} />} label="Learn" color="#22d3ee">{d.learn}</Row>
                          <Row icon={<Wrench size={14} />} label="Build" color="#a3e635">{d.build}</Row>
                          <div className="flex gap-2">
                            <span className="grid place-items-center rounded-md w-6 h-6 shrink-0 mt-0.5 text-neon-amber" style={{ background: 'rgba(245,158,11,.12)', border: '1px solid rgba(245,158,11,.35)' }}><Mic size={13} /></span>
                            <div>
                              <div className="text-[11px] uppercase tracking-widest text-neon-amber font-semibold mb-1">Drill (say out loud)</div>
                              <ul className="list-disc pl-4 space-y-0.5 text-white/70">
                                {d.drill.map((q, k) => <li key={k}>{q}</li>)}
                              </ul>
                            </div>
                          </div>
                          {d.selfTest && (
                            <div className="flex items-center gap-2 text-neon-lime bg-neon-lime/10 border border-neon-lime/25 rounded-lg px-3 py-2">
                              <Sparkles size={14} className="shrink-0" /> Self-test: {d.selfTest}
                            </div>
                          )}
                        </div>
                      </details>
                    </motion.div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* TOPIC BANK */}
      {tab === 'topics' && (
        <div className="grid md:grid-cols-2 gap-3">
          {TOPIC_BANK.map((t, i) => (
            <motion.div key={t.area} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="glass p-4">
              <div className="font-display font-bold text-neon-cyan mb-2 flex items-center gap-2"><BookOpen size={15} /> {t.area}</div>
              <ul className="list-disc pl-4 space-y-1 text-sm text-white/75">
                {t.items.map((it, k) => <li key={k}>{it}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      )}

      {/* BEHAVIORAL */}
      {tab === 'behavioral' && (
        <div className="glass p-5">
          <div className="font-display font-bold text-neon-purple mb-3 flex items-center gap-2"><MessageSquare size={16} /> Behavioral / HR questions</div>
          <ul className="space-y-2 text-sm text-white/80">
            {BEHAVIORAL.map((q, i) => (
              <li key={i} className="flex gap-2"><span className="text-neon-purple mt-0.5">›</span><span>{q}</span></li>
            ))}
          </ul>
          <p className="text-white/45 text-xs mt-4">Tip: prepare each answer in the STAR format (Situation, Task, Action, Result) and keep it under ~90 seconds.</p>
        </div>
      )}

      {/* YOUR EDGE */}
      {tab === 'edge' && (
        <div className="space-y-4">
          <div className="glass p-5">
            <div className="font-display font-bold text-neon-pink mb-3 flex items-center gap-2"><Star size={16} /> Your differentiators — lean on these</div>
            <ul className="space-y-2 text-sm text-white/80">
              {EDGE.map((e, i) => <li key={i} className="flex gap-2"><Sparkles size={14} className="text-neon-pink shrink-0 mt-0.5" /><span>{e}</span></li>)}
            </ul>
          </div>
          <div className="glass p-5">
            <div className="font-display font-bold text-neon-cyan mb-3 flex items-center gap-2"><HelpCircle size={16} /> Questions to ask the interviewer</div>
            <ul className="space-y-2 text-sm text-white/80">
              {ASK.map((q, i) => <li key={i} className="flex gap-2"><span className="text-neon-cyan mt-0.5">?</span><span>{q}</span></li>)}
            </ul>
          </div>
          <div className="glass p-4 text-sm text-white/55 flex items-center gap-2">
            <Briefcase size={16} className="text-neon-pink shrink-0" />
            Full write-up also lives at <span className="font-mono text-white/70">Interview_Prep/Mendix_Interview_1Month_Plan.md</span>.
          </div>
        </div>
      )}
    </div>
  )
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: ReactNode; children: ReactNode }) {
  return (
    <button onClick={onClick} className={`chip !px-3.5 !py-2 border ${active ? 'bg-white/15 border-white/25 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}>
      {icon} {children}
    </button>
  )
}

function Row({ icon, label, color, children }: { icon: ReactNode; label: string; color: string; children: ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="grid place-items-center rounded-md w-6 h-6 shrink-0 mt-0.5" style={{ color, background: `${color}18`, border: `1px solid ${color}44` }}>{icon}</span>
      <div>
        <div className="text-[11px] uppercase tracking-widest font-semibold mb-0.5" style={{ color }}>{label}</div>
        <div className="text-white/75">{children}</div>
      </div>
    </div>
  )
}
