import { describe, it, expect } from 'vitest'
import { searchParamsSchema } from './searchParamsSchema'

describe('searchParamsSchema', () => {
  it('should validate an object with all valid fields', () => {
    const validData = {
      questionnaire: 'survey123',
      data: 'responseData',
      nomenclature: { key1: 'value1', key2: 'value2' },
      readonly: true,
    }

    const result = searchParamsSchema.safeParse(validData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validData)
  })

  it('should validate an object with partial fields', () => {
    const partialData = {
      readonly: false,
    }

    const result = searchParamsSchema.safeParse(partialData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(partialData)
  })

  it('should fail validation when readonly is not a boolean', () => {
    const invalidData = {
      readonly: 'notABoolean',
    }

    const result = searchParamsSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Expected boolean')
    }
  })

  it('should fail validation when nomenclature has non-string values', () => {
    const invalidData = {
      nomenclature: { key1: 123 },
    }

    const result = searchParamsSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Expected string')
    }
  })

  it('should validate an empty object', () => {
    const emptyData = {}

    const result = searchParamsSchema.safeParse(emptyData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(emptyData)
  })
})
