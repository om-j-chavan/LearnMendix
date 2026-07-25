import { useCallback } from 'react'
import { useFx } from '../store/useFx'
import { useProgress, type ActionResult } from '../store/useProgress'
import { play } from './sound'

/** Turns an ActionResult into on-screen celebrations (toast, level-up, badges, sound). */
export function useCelebrate() {
  const showLevelUp = useFx((s) => s.showLevelUp)
  const queueBadges = useFx((s) => s.queueBadges)
  const toast = useFx((s) => s.toast)
  const sound = useProgress((s) => s.sound)

  return useCallback(
    (res: ActionResult, opts?: { xpLabel?: string }) => {
      if (res.xpGained > 0) toast(`+${res.xpGained} XP${opts?.xpLabel ? ' · ' + opts.xpLabel : ''}`, '⚡')
      const leveled = res.leveledTo > res.leveledFrom
      if (leveled) showLevelUp(res.leveledTo)
      if (res.newBadges.length) queueBadges(res.newBadges)
      if (!leveled && res.xpGained > 0) play('complete', sound)
    },
    [showLevelUp, queueBadges, toast, sound],
  )
}
