import type { Interrogation, LocalInterrogation } from '@/core/model'

export function interrogationFromLocalInterrogation(
  localInterrogation: LocalInterrogation,
): Interrogation {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasBeenUpdated, ...interrogation } = localInterrogation

  return interrogation
}
