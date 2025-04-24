import type { LunaticError } from '@inseefr/lunatic'
import { describe, expect, it } from 'vitest'

import { isBlocking, isWarning } from './controls'

describe('isBlocking', () => {
  it('return true when at least an error is a critical error', () => {
    const controls: Record<string, LunaticError[]> = {
      a: [{ id: 'err1', criticality: 'ERROR', errorMessage: 'an error' }],
    }
    expect(isBlocking(controls)).toBeTruthy()
  })
  it('return false when no error is a critical error', () => {
    const controls: Record<string, LunaticError[]> = {
      a: [{ id: 'err1', criticality: 'WARN', errorMessage: 'an error' }],
    }
    expect(isBlocking(controls)).toBeFalsy()
  })
})

describe('isWarning', () => {
  it('return true when at least an error is a warning', () => {
    const controls: Record<string, LunaticError[]> = {
      a: [{ id: 'err1', criticality: 'WARN', errorMessage: 'an error' }],
    }
    expect(isWarning(controls)).toBeTruthy()
  })
  it('return false when no error is a warning', () => {
    const controls: Record<string, LunaticError[]> = {
      a: [{ id: 'err1', criticality: 'INFO', errorMessage: 'an error' }],
    }
    expect(isWarning(controls)).toBeFalsy()
  })
})
