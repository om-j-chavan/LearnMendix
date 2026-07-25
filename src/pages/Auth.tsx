import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User as UserIcon, LogIn, UserPlus, Loader2 } from 'lucide-react'
import { useAuth } from '../store/useAuth'

export default function Auth({ mode }: { mode: 'login' | 'signup' }) {
  const nav = useNavigate()
  const signup = useAuth((s) => s.signup)
  const login = useAuth((s) => s.login)
  const error = useAuth((s) => s.error)
  const busy = useAuth((s) => s.busy)
  const clearError = useAuth((s) => s.clearError)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isSignup = mode === 'signup'

  async function submit(e: FormEvent) {
    e.preventDefault()
    const ok = isSignup ? await signup(name, email, password) : await login(email, password)
    if (ok) nav('/', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="app-bg" />
      <div className="app-grid" />

      <div className="flex-1 grid place-items-center px-4 py-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        >
          {/* Brand */}
          <div className="text-center mb-6">
            <div
              className="mx-auto grid place-items-center rounded-2xl text-3xl mb-3 animate-floaty"
              style={{ width: 64, height: 64, background: 'linear-gradient(135deg,#0a0a16,#12122a)', border: '1px solid rgba(168,85,247,.5)', boxShadow: '0 0 26px rgba(168,85,247,.45)' }}
            >
              🎓
            </div>
            <h1 className="font-display font-black text-2xl">
              Learn<span className="text-neon-cyan">Mendix</span>
            </h1>
            <p className="text-white/50 text-sm mt-1">
              {isSignup ? 'Create an account to start your journey' : 'Welcome back — sign in to continue'}
            </p>
          </div>

          <form onSubmit={submit} className="glass p-6" style={{ boxShadow: '0 0 40px rgba(59,130,246,.18)' }}>
            {isSignup && (
              <Field icon={<UserIcon size={17} />} label="Name">
                <input
                  className="auth-input"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (error) clearError()
                  }}
                />
              </Field>
            )}

            <Field icon={<Mail size={17} />} label="Email">
              <input
                className="auth-input"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) clearError()
                }}
              />
            </Field>

            <Field icon={<Lock size={17} />} label="Password">
              <input
                className="auth-input"
                type="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                placeholder="Your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) clearError()
                }}
              />
            </Field>

            <p className="text-[11px] text-white/35 -mt-1 mb-3">
              Any password works — minimum 1 character. Accounts are stored locally in this browser.
            </p>

            {error && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mb-3 text-sm rounded-lg px-3 py-2" style={{ background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.4)', color: '#ffb4b4' }}>
                {error}
              </motion.div>
            )}

            <button type="submit" className="btn-primary w-full text-base !py-3" disabled={busy}>
              {busy ? <Loader2 size={18} className="animate-spin" /> : isSignup ? <UserPlus size={18} /> : <LogIn size={18} />}
              {isSignup ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <div className="text-center text-sm text-white/55 mt-4">
            {isSignup ? (
              <>Already have an account?{' '}
                <Link to="/login" className="text-neon-cyan font-semibold hover:underline">Sign in</Link>
              </>
            ) : (
              <>New here?{' '}
                <Link to="/signup" className="text-neon-cyan font-semibold hover:underline">Create an account</Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Field({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <label className="block mb-3">
      <span className="text-[11px] uppercase tracking-widest text-white/45 font-semibold flex items-center gap-1.5 mb-1.5">
        <span className="text-neon-cyan">{icon}</span> {label}
      </span>
      {children}
    </label>
  )
}
