import type { LunaticError } from '@inseefr/lunatic'

export enum ErrorType {
  BLOCKING,
  WARNING,
}

/** Return the highest criticality of provided controls. */
export function computeErrorType(
  controls?: Record<string, LunaticError[]>,
): ErrorType | undefined {
  if (!controls) return undefined

  let isWarning = false
  for (const control of Object.values(controls)) {
    for (const error of control) {
      switch (error.criticality) {
        case 'ERROR':
          return ErrorType.BLOCKING
        case 'WARN':
          isWarning = true
      }
    }
  }

  if (isWarning) {
    return ErrorType.WARNING
  }

  return undefined
}

/**
 * Remove errors that are not related to mandatory variables.
 *
 * Used to prevent displaying useless errors when the user wants to skip a
 * question.
 */
export function removeNonMandatoryErrors(
  controls?: Record<string, LunaticError[]>,
): Record<string, LunaticError[]> | undefined {
  if (!controls) return undefined

  const newControls: Record<string, LunaticError[]> = {}

  for (const [id, control] of Object.entries(controls)) {
    for (const error of control) {
      if (error.typeOfControl === 'MANDATORY') {
        if (newControls[id]) newControls[id] = [...newControls[id], error]
        else newControls[id] = [error]
      }
    }
  }

  return newControls
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
