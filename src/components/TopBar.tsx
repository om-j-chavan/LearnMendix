import { Link, useLocation } from 'react-router-dom'
import { Home, Trophy, Volume2, VolumeX, RotateCcw } from 'lucide-react'
import XPBar from './XPBar'
import StreakFlame from './StreakFlame'
import { useProgress } from '../store/useProgress'
import { useFx } from '../store/useFx'
import { play } from '../lib/sound'

export default function TopBar() {
  const loc = useLocation()
  const sound = useProgress((s) => s.sound)
  const toggleSound = useProgress((s) => s.toggleSound)
  const resetProgress = useProgress((s) => s.resetProgress)
  const toast = useFx((s) => s.toast)

  const onAch = loc.pathname.startsWith('/achievements')

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="grid place-items-center rounded-xl text-lg"
            style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#0a0a16,#12122a)', border: '1px solid rgba(168,85,247,.5)', boxShadow: '0 0 16px rgba(168,85,247,.4)' }}
          >
            🎓
          </div>
          <div className="leading-none">
            <div className="font-display font-black tracking-wide text-white group-hover:text-neon-cyan transition-colors">
              Learn<span className="text-neon-cyan">Mendix</span>
            </div>
            <div className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Level up your skills</div>
          </div>
        </Link>

        <div className="hidden md:flex flex-1 justify-center">
          <XPBar />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <StreakFlame compact />
          <Link
            to="/"
            className={`btn-ghost !px-2.5 !py-2 ${loc.pathname === '/' ? '!bg-white/15 !text-white' : ''}`}
            title="Home"
          >
            <Home size={18} />
          </Link>
          <Link
            to="/achievements"
            className={`btn-ghost !px-2.5 !py-2 ${onAch ? '!bg-white/15 !text-white' : ''}`}
            title="Achievements"
          >
            <Trophy size={18} />
          </Link>
          <button
            className="btn-ghost !px-2.5 !py-2"
            title={sound ? 'Sound on' : 'Sound off'}
            onClick={() => {
              toggleSound()
              play('click', !sound)
            }}
          >
            {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            className="btn-ghost !px-2.5 !py-2"
            title="Reset all progress"
            onClick={() => {
              if (window.confirm('Reset ALL progress — XP, streak, badges and quiz scores? This cannot be undone.')) {
                resetProgress()
                toast('Progress reset', '🧹')
              }
            }}
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* mobile XP bar */}
      <div className="md:hidden px-4 pb-2.5">
        <XPBar width={0} />
      </div>
    </header>
  )
}
