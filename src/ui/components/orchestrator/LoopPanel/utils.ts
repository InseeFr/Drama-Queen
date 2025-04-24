import type { PageTag } from '@/core/model'

/** Check if the first subPage of an iteration is before lastReachedPage. */
export function isIterationReachable(
  currentPage: number,
  lastReachedPage: PageTag,
  iteration: number,
) {
  const maxPage = parseInt(lastReachedPage.split('.')[0])
  const maxIteration = parseInt(lastReachedPage.split('#')[1]) - 1
  if (currentPage < maxPage) {
    // no need to check iteration or subPage because we already reached the next page (out of the loop)
    return true
  }
  // currentPage = maxPage , so we check if we already reached the iteration
  if (iteration <= maxIteration) {
    // no need to check subPage beacause we just want to reach the first subPage of the iteration
    return true
  }
  return false
}
