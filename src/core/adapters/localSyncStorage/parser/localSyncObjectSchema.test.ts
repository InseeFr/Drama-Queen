import { describe, expect, it } from 'vitest'

import { localStorageObjectSchema } from './localSyncObjectSchema'

describe('localStorageObjectSchema', () => {
  it('should validate a valid object', () => {
    const validData = {
      error: false,
      interrogationsSuccess: ['unit1', 'unit2'],
      interrogationsInTempZone: ['unit3', 'unit4'],
    }

    const result = localStorageObjectSchema.safeParse(validData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validData)
  })

  it('should fail validation when "error" is not a boolean', () => {
    const invalidData = {
      error: 'notABoolean',
      interrogationsSuccess: ['unit1'],
      interrogationsInTempZone: ['unit2'],
    }

    const result = localStorageObjectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation when "interrogationsSuccess" is not an array of strings', () => {
    const invalidData = {
      error: true,
      interrogationsSuccess: [123],
      interrogationsInTempZone: ['unit2'],
    }

    const result = localStorageObjectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation when "interrogationsInTempZone" is missing', () => {
    const invalidData = {
      error: false,
      interrogationsSuccess: ['unit1', 'unit2'],
    }

    const result = localStorageObjectSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
