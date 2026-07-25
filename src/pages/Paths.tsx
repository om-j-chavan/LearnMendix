import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookMarked, Clock, Layers, Sparkles } from 'lucide-react'
import { MENDIX_PATHS, totalMendixPaths } from '../data/mendixPaths'

export default function Paths() {
  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4">
        <ArrowLeft size={16} /> Dashboard
      </Link>

      <header className="glass p-6 mb-6 relative overflow-hidden" style={{ boxShadow: '0 0 34px rgba(34,211,238,.15)' }}>
        <div className="absolute -right-8 -top-10 w-52 h-52 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle,rgba(168,85,247,.35),transparent 70%)' }} />
        <div className="relative flex items-center gap-3">
          <div className="text-4xl grid place-items-center rounded-2xl w-16 h-16" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(34,211,238,.5)' }}>🗺️</div>
          <div>
            <h1 className="font-display font-black text-2xl md:text-3xl">Mendix Learning Paths</h1>
            <p className="text-white/60">The real Mendix Academy journey — all {totalMendixPaths()} paths across 5 skill levels, mapped here so you always know what’s next.</p>
          </div>
        </div>
        <div className="relative mt-4 text-sm text-white/70 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
          <Sparkles size={14} className="inline mr-1 text-neon-cyan" />
          Paths marked <span className="chip bg-neon-lime/15 text-neon-lime border border-neon-lime/30 mx-1">authored</span> already have LearnMendix lessons; the rest are outlines that link to the official Academy content while we migrate lessons in.
        </div>
      </header>

      <div className="space-y-8">
        {MENDIX_PATHS.map((level, li) => (
          <section key={level.id}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{level.icon}</span>
              <h2 className="font-display font-bold text-lg" style={{ color: level.color }}>{level.name}</h2>
              <span className="text-white/40 text-sm">· {level.blurb}</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {level.paths.map((path, pi) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (li * 3 + pi) * 0.03 }}
                >
                  <Link
                    to={`/paths/${path.id}`}
                    className="glass card-hover p-4 h-full flex flex-col group"
                    style={{ display: 'flex', boxShadow: `0 0 0 1px ${level.color}22` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-base leading-tight group-hover:text-white" style={{ color: level.color }}>{path.name}</h3>
                      {path.authored && <span className="chip bg-neon-lime/15 text-neon-lime border border-neon-lime/30 shrink-0">authored</span>}
                    </div>
                    <p className="text-white/55 text-sm mt-1 flex-1">{path.desc}</p>
                    <div className="flex items-center gap-3 mt-3 text-[11px] text-white/45">
                      <span className="inline-flex items-center gap-1"><Layers size={12} /> {path.modules} modules</span>
                      <span className="inline-flex items-center gap-1"><Clock size={12} /> {path.hours} hrs</span>
                      <ArrowRight size={14} className="ml-auto text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="glass p-4 mt-8 text-sm text-white/55 flex items-center gap-2">
        <BookMarked size={16} className="text-neon-cyan shrink-0" />
        Full, official course content lives on{' '}
        <a href="https://academy.mendix.com/link/explore" target="_blank" rel="noreferrer" className="text-neon-cyan hover:underline">Mendix Academy</a>. LearnMendix mirrors the structure and adds plain-English explanations on top.
      </div>
    </div>
  )
}
