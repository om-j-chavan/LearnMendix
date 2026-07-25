import { motion } from 'framer-motion'
import { useProgress } from '../store/useProgress'
import { levelInfo, rankTitle } from '../lib/gamification'

export default function XPBar({ width = 220 }: { width?: number }) {
  const xp = useProgress((s) => s.xp)
  const info = levelInfo(xp)
  return (
    <div className="flex items-center gap-3" style={{ minWidth: width }}>
      <div
        className="grid place-items-center rounded-xl font-display font-black text-ink-950 shrink-0"
        style={{
          width: 38,
          height: 38,
          background: 'linear-gradient(135deg,#22d3ee,#a855f7)',
          boxShadow: '0 0 18px rgba(168,85,247,.5)',
        }}
        title={rankTitle(info.level)}
      >
        {info.level}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-[11px] mb-1">
          <span className="font-semibold tracking-wide text-white/70">{rankTitle(info.level)}</span>
          <span className="tabular-nums text-white/45">
            {info.intoLevel}/{info.needForNext} XP
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-white/8 overflow-hidden border border-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)',
              backgroundSize: '200% 100%',
              boxShadow: '0 0 12px rgba(34,211,238,.6)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.round(info.pct * 100)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </div>
  )
}
