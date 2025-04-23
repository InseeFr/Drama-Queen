import type { LunaticError } from '@inseefr/lunatic'

/**
 * Return whether or not the lunatic controls are blocking and should prevent
 * further navigation until they are fixed.
 */
export function isBlocking(controls: Record<string, LunaticError[]>): boolean {
  for (const control of Object.values(controls)) {
    for (const error of control) {
      if (error.criticality === 'ERROR') {
        return true
      }
    }
  }
  return false
}

/**
 * Return whether or not the lunatic controls should display a warning until
 * they are fixed.
 *
 * They should not block navigation.
 */
export function isWarning(controls: Record<string, LunaticError[]>): boolean {
  for (const control of Object.values(controls)) {
    for (const error of control) {
      if (error.criticality === 'WARN') {
        return true
      }
    }
  }
  return false
}
