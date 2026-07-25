import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame, BookOpen, CheckCircle2, Trophy, Play, Lock, ArrowRight, Map, GraduationCap } from 'lucide-react'
import { COURSES } from '../data/courses'
import { MENDIX_PATHS, totalMendixPaths } from '../data/mendixPaths'
import { useProgress } from '../store/useProgress'
import { levelInfo, rankTitle, computeStats, streakAlive } from '../lib/gamification'
import { levelProgress, continueTarget } from '../lib/selectors'
import ProgressRing from '../components/ProgressRing'

export default function Dashboard() {
  const nav = useNavigate()
  const { xp, streak, doneLessons, quizBest, badges, lastVisited, examBest } = useProgress()
  const stats = computeStats({ xp, streak, doneLessons, quizBest, badges, examBest })
  const info = levelInfo(xp)
  const target = continueTarget(doneLessons, quizBest, lastVisited)
  const badgeCount = Object.keys(badges).length
  const alive = streakAlive(streak)

  const stat = [
    { icon: <BookOpen size={18} />, label: 'Lessons done', value: `${stats.doneCount}/${stats.totalLessons}`, color: '#22d3ee' },
    { icon: <CheckCircle2 size={18} />, label: 'Quizzes passed', value: stats.passedCount, color: '#a3e635' },
    { icon: <Trophy size={18} />, label: 'Badges', value: badgeCount, color: '#f59e0b' },
    { icon: <Flame size={18} />, label: 'Day streak', value: streak.count, color: '#ec4899' },
  ]

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        className="glass p-6 md:p-8 relative overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(59,130,246,.15)' }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle,rgba(168,85,247,.35),transparent 70%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <ProgressRing pct={info.pct} size={96} stroke={9} color="#a855f7">
            <div className="text-center leading-none">
              <div className="font-display font-black text-3xl">{info.level}</div>
              <div className="text-[9px] tracking-widest text-white/50 uppercase">Level</div>
            </div>
          </ProgressRing>
          <div className="flex-1">
            <div className="text-sm text-neon-cyan font-display tracking-widest uppercase">
              {rankTitle(info.level)}
            </div>
            <h1 className="font-display font-black text-2xl md:text-3xl mt-1">
              {streak.count > 0 && alive ? (
                <>You’re on a <span className="text-neon-amber neon-text">{streak.count}-day</span> streak 🔥</>
              ) : (
                <>Ready to level up your Mendix skills?</>
              )}
            </h1>
            <p className="text-white/60 mt-1">
              {stats.doneCount === 0
                ? 'Start with Rapid Developer and work your way to Expert. Earn XP, keep your streak, collect badges.'
                : alive
                  ? 'Do one lesson today to keep the flame alive. Small steps, big streak.'
                  : 'Your streak reset — jump back in and start a new one today!'}
            </p>
          </div>
          <button className="btn-primary text-base !px-6 !py-3 shrink-0" onClick={() => nav(`/module/${target.levelId}/${target.moduleId}`)}>
            <Play size={18} /> {target.label}
          </button>
        </div>
      </motion.section>

      {/* Stat row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stat.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass p-4 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="grid place-items-center rounded-xl w-10 h-10 shrink-0" style={{ color: s.color, background: 'rgba(255,255,255,.05)', border: `1px solid ${s.color}55` }}>
              {s.icon}
            </div>
            <div>
              <div className="font-display font-black text-xl tabular-nums">{s.value}</div>
              <div className="text-[11px] text-white/50 uppercase tracking-wide">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Mendix Learning Paths catalog */}
      <Link to="/paths" className="glass card-hover p-5 flex items-center gap-4 group" style={{ display: 'flex', boxShadow: '0 0 24px rgba(34,211,238,.15)' }}>
        <div className="grid place-items-center rounded-2xl w-14 h-14 shrink-0 text-3xl" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(34,211,238,.5)' }}>🗺️</div>
        <div className="flex-1">
          <div className="font-display font-bold text-lg flex items-center gap-2">
            Mendix Learning Paths
            <span className="chip bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">{totalMendixPaths()} paths</span>
          </div>
          <p className="text-white/55 text-sm">The real Academy journey — {MENDIX_PATHS.length} skill levels mapped end to end, so you always know what to learn next.</p>
        </div>
        <span className="btn-ghost shrink-0"><Map size={16} /> Explore</span>
      </Link>

      {/* Mock exam */}
      <Link to="/exam" className="glass card-hover p-5 flex items-center gap-4 group" style={{ display: 'flex', boxShadow: '0 0 24px rgba(168,85,247,.15)' }}>
        <div className="grid place-items-center rounded-2xl w-14 h-14 shrink-0 text-3xl" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(168,85,247,.5)' }}>🎓</div>
        <div className="flex-1">
          <div className="font-display font-bold text-lg flex items-center gap-2">
            Mock Exam
            {examBest > 0 && <span className="chip border" style={{ background: examBest >= 75 ? 'rgba(163,230,53,.15)' : 'rgba(245,158,11,.15)', color: examBest >= 75 ? '#a3e635' : '#f59e0b', borderColor: examBest >= 75 ? 'rgba(163,230,53,.3)' : 'rgba(245,158,11,.3)' }}>best {examBest}%</span>}
          </div>
          <p className="text-white/55 text-sm">Full exam simulation — 50 questions, 90-minute timer, 75% to pass. Weighted like the real Intermediate exam.</p>
        </div>
        <span className="btn-ghost shrink-0"><GraduationCap size={16} /> Start</span>
      </Link>

      {/* Tracks */}
      <section>
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span className="text-neon-cyan">▚</span> Certification Tracks
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {COURSES.map((level, i) => {
            const p = levelProgress(level, doneLessons, quizBest)
            const preview = level.status === 'preview'
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/track/${level.id}`}
                  className="glass card-hover p-5 flex items-center gap-4 group"
                  style={{ boxShadow: `0 0 0 1px ${level.color}22`, display: 'flex' }}
                >
                  <div
                    className="grid place-items-center rounded-2xl text-3xl shrink-0 group-hover:scale-105 transition-transform"
                    style={{ width: 66, height: 66, background: 'rgba(255,255,255,.04)', border: `1px solid ${level.color}66`, boxShadow: `0 0 20px ${level.color}33` }}
                  >
                    {level.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-lg truncate" style={{ color: level.color }}>
                        {level.name}
                      </h3>
                      {preview && (
                        <span className="chip text-[10px] bg-white/10 text-white/60 border border-white/15">
                          <Lock size={11} /> Preview
                        </span>
                      )}
                    </div>
                    <p className="text-white/55 text-sm truncate">{level.tagline}</p>
                    <div className="mt-2 h-2 rounded-full bg-white/8 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(p.pct * 100)}%`, background: `linear-gradient(90deg,${level.color},#ec4899)` }} />
                    </div>
                    <div className="text-[11px] text-white/45 mt-1">
                      {preview ? `${level.modules.length} modules · coming soon` : `${p.completedModules}/${p.modules} modules · ${p.doneLessonsCount}/${p.totalLessons} lessons`}
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
