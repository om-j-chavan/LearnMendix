import { AnimatePresence, motion } from 'framer-motion'
import { useFx } from '../store/useFx'

export default function Toasts() {
  const toasts = useFx((s) => s.toasts)
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            className="glass px-4 py-2.5 flex items-center gap-2 text-sm font-semibold shadow-glow-soft"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {t.icon && <span className="text-lg">{t.icon}</span>}
            <span className="text-white/90">{t.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
