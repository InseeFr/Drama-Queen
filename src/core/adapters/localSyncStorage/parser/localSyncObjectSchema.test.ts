import { describe, expect, it } from 'vitest'

import { localStorageObjectSchema } from './localSyncObjectSchema'

describe('localStorageObjectSchema', () => {
  it('should validate a valid object', () => {
    const validData = {
      error: false,
      surveyUnitsSuccess: ['unit1', 'unit2'],
      surveyUnitsInTempZone: ['unit3', 'unit4'],
    }

    const result = localStorageObjectSchema.safeParse(validData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validData)
  })

  it('should fail validation when "error" is not a boolean', () => {
    const invalidData = {
      error: 'notABoolean',
      surveyUnitsSuccess: ['unit1'],
      surveyUnitsInTempZone: ['unit2'],
    }

    const result = localStorageObjectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Expected boolean')
    }
  })

  it('should fail validation when "surveyUnitsSuccess" is not an array of strings', () => {
    const invalidData = {
      error: true,
      surveyUnitsSuccess: [123],
      surveyUnitsInTempZone: ['unit2'],
    }

    const result = localStorageObjectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Expected string')
    }
  })

  it('should fail validation when "surveyUnitsInTempZone" is missing', () => {
    const invalidData = {
      error: false,
      surveyUnitsSuccess: ['unit1', 'unit2'],
    }

    const result = localStorageObjectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Required')
    }
  })
})
