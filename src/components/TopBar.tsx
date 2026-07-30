import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Trophy, Volume2, VolumeX, RotateCcw, LogOut, Map, GraduationCap, Briefcase } from 'lucide-react'
import XPBar from './XPBar'
import StreakFlame from './StreakFlame'
import { useProgress } from '../store/useProgress'
import { useFx } from '../store/useFx'
import { useAuth, useCurrentUser } from '../store/useAuth'
import { play } from '../lib/sound'

export default function TopBar() {
  const loc = useLocation()
  const nav = useNavigate()
  const sound = useProgress((s) => s.sound)
  const toggleSound = useProgress((s) => s.toggleSound)
  const resetProgress = useProgress((s) => s.resetProgress)
  const toast = useFx((s) => s.toast)
  const user = useCurrentUser()
  const logout = useAuth((s) => s.logout)

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
            to="/paths"
            className={`btn-ghost !px-2.5 !py-2 ${loc.pathname.startsWith('/paths') ? '!bg-white/15 !text-white' : ''}`}
            title="Mendix Learning Paths"
          >
            <Map size={18} />
          </Link>
          <Link
            to="/exam"
            className={`btn-ghost !px-2.5 !py-2 ${loc.pathname.startsWith('/exam') ? '!bg-white/15 !text-white' : ''}`}
            title="Mock Exam"
          >
            <GraduationCap size={18} />
          </Link>
          <Link
            to="/interview"
            className={`btn-ghost !px-2.5 !py-2 ${loc.pathname.startsWith('/interview') ? '!bg-white/15 !text-white' : ''}`}
            title="Interview Prep"
          >
            <Briefcase size={18} />
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

          {user && (
            <div className="flex items-center gap-1.5 pl-1.5 ml-0.5 border-l border-white/10">
              <div
                className="grid place-items-center rounded-full w-8 h-8 font-display font-bold text-sm text-ink-950 shrink-0"
                style={{ background: 'linear-gradient(135deg,#22d3ee,#a855f7)' }}
                title={`${user.name} · ${user.email}`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden lg:block text-sm text-white/70 font-semibold max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
              <button
                className="btn-ghost !px-2.5 !py-2"
                title="Sign out"
                onClick={() => {
                  logout()
                  nav('/login', { replace: true })
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* mobile XP bar */}
      <div className="md:hidden px-4 pb-2.5">
        <XPBar width={0} />
      </div>
    </header>
  )
}
