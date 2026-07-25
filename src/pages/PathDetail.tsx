import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Layers, ExternalLink, PlayCircle, Circle, Sparkles } from 'lucide-react'
import { MX_PATH_BY_ID } from '../data/mendixPaths'

/** Map a Mendix path to the matching authored LearnMendix track, if any. */
function authoredTrack(levelId: string, pathId: string): string | null {
  if (pathId === 'become-rapid-developer') return '/track/rapid'
  if (levelId === 'intermediate') return '/track/intermediate'
  return null
}

export default function PathDetail() {
  const { pathId } = useParams()
  const entry = pathId ? MX_PATH_BY_ID[pathId] : undefined

  if (!entry) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-white/70">That path doesn’t exist.</p>
        <Link to="/paths" className="btn-primary mt-4 inline-flex">Back to paths</Link>
      </div>
    )
  }

  const { level, path } = entry
  const track = authoredTrack(level.id, path.id)

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/paths" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4">
        <ArrowLeft size={16} /> Mendix Learning Paths
      </Link>

      <header className="glass p-6 mb-5 relative overflow-hidden" style={{ boxShadow: `0 0 30px ${level.color}22` }}>
        <div className="absolute -right-8 -top-10 w-44 h-44 rounded-full blur-3xl" style={{ background: `radial-gradient(circle,${level.color}44,transparent 70%)` }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="chip" style={{ background: `${level.color}22`, color: level.color, border: `1px solid ${level.color}66` }}>{level.icon} {level.name}</span>
            {path.authored && <span className="chip bg-neon-lime/15 text-neon-lime border border-neon-lime/30">authored in LearnMendix</span>}
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl" style={{ color: level.color }}>{path.name}</h1>
          <p className="text-white/65 mt-1">{path.desc}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-white/55">
            <span className="inline-flex items-center gap-1.5"><Layers size={14} /> {path.modules} modules</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {path.hours} hrs</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {track && (
              <Link to={track} className="btn-primary">
                <PlayCircle size={17} /> Start the LearnMendix lessons
              </Link>
            )}
            <a href={path.url} target="_blank" rel="noreferrer" className="btn-ghost">
              <ExternalLink size={16} /> Open on Mendix Academy
            </a>
          </div>
        </div>
      </header>

      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
        <Layers size={15} /> Modules
      </h2>

      {path.moduleNames ? (
        <div className="space-y-2">
          {path.moduleNames.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass p-3.5 flex items-center gap-3"
            >
              <span className="grid place-items-center rounded-full w-8 h-8 shrink-0 font-display font-bold text-sm" style={{ background: 'rgba(255,255,255,.05)', border: `1px solid ${level.color}55`, color: level.color }}>
                {i + 1}
              </span>
              <span className="font-semibold text-white/85">{m}</span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass p-5">
          <div className="flex items-center gap-2 text-white/70">
            <Circle size={14} className="text-neon-cyan" />
            <span>This path has <b>{path.modules} modules</b>.</span>
          </div>
          <p className="text-white/50 text-sm mt-2">
            <Sparkles size={13} className="inline mr-1 text-neon-cyan" />
            The detailed module breakdown and LearnMendix lessons for this path are being added (Phase B). For now, open it on Mendix Academy for the full content.
          </p>
        </div>
      )}
    </div>
  )
}
