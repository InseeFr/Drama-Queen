import { describe, expect, it } from 'vitest'

import {
  nomenclatureSchema,
  requiredNomenclaturesSchema,
} from './nomenclatureSchema'

describe('nomenclatureSchema', () => {
  it('should validate a valid array of nomenclature objects', () => {
    const validData = [
      { id: 'n1', label: 'Label 1', extraField: 'extraValue1' },
      { id: 'n2', label: 'Label 2', anotherExtra: 'extraValue2' },
    ]

    const result = nomenclatureSchema.safeParse(validData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validData)
  })

  it('should fail validation when "id" is missing in one object', () => {
    const invalidData = [
      { label: 'Label 1', extraField: 'extraValue1' },
      { id: 'n2', label: 'Label 2' },
    ]

    const result = nomenclatureSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation when "label" is missing in one object', () => {
    const invalidData = [
      { id: 'n1', extraField: 'extraValue1' },
      { id: 'n2', label: 'Label 2' },
    ]

    const result = nomenclatureSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation when an object is not valid', () => {
    const invalidData = [{ id: 'n1', label: 123 }]

    const result = nomenclatureSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('requiredNomenclaturesSchema', () => {
  it('should validate a valid array of strings', () => {
    const validData = ['n1', 'n2', 'n3']

    const result = requiredNomenclaturesSchema.safeParse(validData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validData)
  })

  it('should fail validation when an element is not a string', () => {
    const invalidData = ['n1', 123, 'n3']

    const result = requiredNomenclaturesSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation when the value is not an array', () => {
    const invalidData = 'notAnArray'

    const result = requiredNomenclaturesSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
