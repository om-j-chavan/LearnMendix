import { create } from 'zustand'
import type { Badge } from '../types'

interface Toast {
  id: number
  text: string
  icon?: string
}

interface FxState {
  levelUp: number | null
  badgeQueue: Badge[]
  toasts: Toast[]
  showLevelUp: (level: number) => void
  clearLevelUp: () => void
  queueBadges: (badges: Badge[]) => void
  dismissBadge: () => void
  toast: (text: string, icon?: string) => void
  dropToast: (id: number) => void
}

let toastId = 0

export const useFx = create<FxState>((set) => ({
  levelUp: null,
  badgeQueue: [],
  toasts: [],
  showLevelUp: (level) => set({ levelUp: level }),
  clearLevelUp: () => set({ levelUp: null }),
  queueBadges: (badges) => set((s) => ({ badgeQueue: [...s.badgeQueue, ...badges] })),
  dismissBadge: () => set((s) => ({ badgeQueue: s.badgeQueue.slice(1) })),
  toast: (text, icon) =>
    set((s) => {
      const id = ++toastId
      setTimeout(() => useFx.getState().dropToast(id), 3200)
      return { toasts: [...s.toasts, { id, text, icon }] }
    }),
  dropToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
