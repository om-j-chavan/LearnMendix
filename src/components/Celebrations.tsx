import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFx } from '../store/useFx'
import { useProgress } from '../store/useProgress'
import { rankTitle } from '../lib/gamification'
import { bigCelebrate, burst } from '../lib/fx'
import { play } from '../lib/sound'
import { accentHex, glow } from '../lib/ui'

export function LevelUpModal() {
  const levelUp = useFx((s) => s.levelUp)
  const clear = useFx((s) => s.clearLevelUp)
  const sound = useProgress((s) => s.sound)

  useEffect(() => {
    if (levelUp != null) {
      bigCelebrate()
      play('levelup', sound)
    }
  }, [levelUp, sound])

  return (
    <AnimatePresence>
      {levelUp != null && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-6"
          style={{ background: 'rgba(3,3,10,.72)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={clear}
        >
          <motion.div
            className="glass text-center px-10 py-9 max-w-sm"
            style={{ boxShadow: glow('#a855f7', 0.5) }}
            initial={{ scale: 0.7, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-2 animate-floaty">🎉</div>
            <div className="font-display text-sm tracking-[0.3em] text-neon-cyan neon-text">LEVEL UP</div>
            <div
              className="font-display font-black my-2 text-6xl"
              style={{ background: 'linear-gradient(135deg,#22d3ee,#a855f7,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {levelUp}
            </div>
            <div className="text-white/80 font-semibold text-lg">You are now a {rankTitle(levelUp)}</div>
            <button className="btn-primary mt-6 w-full" onClick={clear}>
              Keep going →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function BadgeModal() {
  const badge = useFx((s) => s.badgeQueue[0])
  const levelUp = useFx((s) => s.levelUp)
  const dismiss = useFx((s) => s.dismissBadge)
  const sound = useProgress((s) => s.sound)
  const visible = !!badge && levelUp == null

  useEffect(() => {
    if (visible) {
      burst()
      play('badge', sound)
    }
  }, [visible, sound])

  return (
    <AnimatePresence mode="wait">
      {badge && levelUp == null && (
        <motion.div
          key={badge.id}
          className="fixed inset-0 z-50 grid place-items-center p-6"
          style={{ background: 'rgba(3,3,10,.72)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="glass text-center px-10 py-9 max-w-sm"
            style={{ boxShadow: glow(accentHex(badge.accent), 0.5) }}
            initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-display text-xs tracking-[0.3em] text-neon-amber neon-text mb-3">BADGE UNLOCKED</div>
            <div
              className="text-7xl mx-auto mb-3 grid place-items-center rounded-3xl animate-floaty"
              style={{ width: 118, height: 118, background: 'rgba(255,255,255,.05)', border: `1px solid ${accentHex(badge.accent)}`, boxShadow: glow(accentHex(badge.accent), 0.4) }}
            >
              {badge.icon}
            </div>
            <div className="font-display font-bold text-2xl" style={{ color: accentHex(badge.accent) }}>
              {badge.name}
            </div>
            <div className="text-white/70 mt-1">{badge.desc}</div>
            <button className="btn-ghost mt-6 w-full" onClick={dismiss}>
              Nice!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
