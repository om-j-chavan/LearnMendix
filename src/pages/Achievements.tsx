import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { BADGES, computeStats, levelInfo, rankTitle } from '../lib/gamification'
import { useProgress } from '../store/useProgress'
import { COURSES } from '../data/courses'
import { levelProgress } from '../lib/selectors'
import { accentHex } from '../lib/ui'

export default function Achievements() {
  const { xp, streak, doneLessons, quizBest, badges } = useProgress()
  const stats = computeStats({ xp, streak, doneLessons, quizBest, badges })
  const info = levelInfo(xp)
  const earned = BADGES.filter((b) => badges[b.id]).length

  return (
    <div>
      <h1 className="font-display font-black text-3xl mb-1">Achievements</h1>
      <p className="text-white/55 mb-6">
        You’re a <b style={{ color: '#22d3ee' }}>{rankTitle(info.level)}</b> at level {info.level} · {earned}/{BADGES.length} badges unlocked.
      </p>

      {/* overall stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total XP', value: xp, color: '#22d3ee' },
          { label: 'Lessons done', value: `${stats.doneCount}/${stats.totalLessons}`, color: '#a855f7' },
          { label: 'Quizzes passed', value: stats.passedCount, color: '#a3e635' },
          { label: 'Best streak', value: `${streak.count}d`, color: '#ec4899' },
        ].map((s) => (
          <div key={s.label} className="glass p-4 text-center">
            <div className="font-display font-black text-2xl tabular-nums" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] text-white/50 uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* track progress */}
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-3">Track progress</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {COURSES.map((level) => {
          const p = levelProgress(level, doneLessons, quizBest)
          return (
            <Link key={level.id} to={`/track/${level.id}`} className="glass card-hover p-4 flex items-center gap-3" style={{ display: 'flex' }}>
              <div className="text-2xl">{level.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-bold" style={{ color: level.color }}>{level.name}</span>
                  <span className="text-xs text-white/50">{Math.round(p.pct * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden mt-1.5">
                  <div className="h-full rounded-full" style={{ width: `${Math.round(p.pct * 100)}%`, background: `linear-gradient(90deg,${level.color},#ec4899)` }} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* badges */}
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-3">Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {BADGES.map((b, i) => {
          const has = !!badges[b.id]
          const accent = accentHex(b.accent)
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="glass p-4 text-center relative"
              style={{ boxShadow: has ? `0 0 20px ${accent}33` : 'none', borderColor: has ? `${accent}66` : undefined }}
            >
              <div
                className="text-4xl mx-auto mb-2 grid place-items-center rounded-2xl w-16 h-16"
                style={{
                  background: 'rgba(255,255,255,.04)',
                  border: `1px solid ${has ? accent : 'rgba(255,255,255,.1)'}`,
                  filter: has ? 'none' : 'grayscale(1)',
                  opacity: has ? 1 : 0.4,
                }}
              >
                {has ? b.icon : <Lock size={22} className="text-white/40" />}
              </div>
              <div className="font-display font-bold text-sm" style={{ color: has ? accent : 'rgba(255,255,255,.5)' }}>{b.name}</div>
              <div className="text-[11px] text-white/45 mt-0.5 leading-tight">{b.desc}</div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
