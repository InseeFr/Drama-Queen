import { describe, expect, it } from 'vitest'

import { idsSchema } from './idsSchema'

describe('idsSchema', () => {
  it('should validate a valid array of id objects', () => {
    const validData = [{ id: 'a1' }, { id: 'b2' }]

    const result = idsSchema.safeParse(validData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validData)
  })

  it('should validate an empty array', () => {
    const result = idsSchema.safeParse([])
    expect(result.success).toBe(true)
    if (result.success) expect(result.data).toEqual([])
  })

  it('should fail when an item is missing the "id" field', () => {
    const invalidData = [{ id: 'a1' }, {} as any]

    const result = idsSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail when an item has a non-string "id"', () => {
    const invalidData = [{ id: 'a1' }, { id: 123 as any }]

    const result = idsSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail when the value is not an array', () => {
    const notAnArray: any = { id: 'a1' }

    const result = idsSchema.safeParse(notAnArray)
    expect(result.success).toBe(false)
  })
})
