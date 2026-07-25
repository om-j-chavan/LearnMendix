import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TopBar from './TopBar'
import Toasts from './Toasts'
import { BadgeModal, LevelUpModal } from './Celebrations'

export default function AppShell() {
  const loc = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <div className="app-bg" />
      <div className="app-grid" />
      <TopBar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={loc.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="mx-auto w-full max-w-6xl px-4 py-6 text-center text-xs text-white/35">
        LearnMendix · a personal, gamified study companion · content aligned with{' '}
        <a href="https://docs.mendix.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-neon-cyan">
          docs.mendix.com
        </a>{' '}
        · not affiliated with Mendix/Siemens
      </footer>
      <LevelUpModal />
      <BadgeModal />
      <Toasts />
    </div>
  )
}
