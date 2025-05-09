import type { LunaticError } from '@inseefr/lunatic'

export enum ErrorType {
  BLOCKING,
  WARNING,
}

export function computeErrorType(
  controls?: Record<string, LunaticError[]>,
): ErrorType | undefined {
  if (!controls) return undefined

  let isWarning = false
  for (const control of Object.values(controls)) {
    for (const error of control) {
      if (error.criticality === 'ERROR') {
        return ErrorType.BLOCKING
      }
      if (error.criticality === 'WARN') {
        isWarning = true
      }
    }
  }

  if (isWarning) {
    return ErrorType.WARNING
  }

  return undefined
}

export function isSameErrors(
  errorsA: Record<string, LunaticError[]>,
  errorsB: Record<string, LunaticError[]>,
) {
  const idsA = []
  const idsB = []

  for (const control of Object.values(errorsA)) {
    for (const error of control) {
      idsA.push(error.id)
    }
  }
  for (const control of Object.values(errorsB)) {
    for (const error of control) {
      idsB.push(error.id)
    }
  }

  return idsA.toString() === idsB.toString()
}
