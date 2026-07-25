import type { Accent } from '../types'

export const ACCENT_HEX: Record<Accent, string> = {
  cyan: '#22d3ee',
  blue: '#3b82f6',
  purple: '#a855f7',
  pink: '#ec4899',
  magenta: '#d946ef',
  lime: '#a3e635',
  green: '#22c55e',
  amber: '#f59e0b',
}

export function accentHex(a: Accent): string {
  return ACCENT_HEX[a] ?? '#22d3ee'
}

/** hex (#rrggbb) + alpha (0..1) -> rgba() string */
export function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function glow(hex: string, strength = 0.5): string {
  return `0 0 24px ${hexA(hex, strength)}, 0 0 6px ${hexA(hex, Math.min(1, strength + 0.25))}`
}

export function clamp(n: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, n))
}
