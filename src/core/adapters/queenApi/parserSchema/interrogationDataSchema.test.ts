import { describe, expect, it } from 'vitest'

import { interrogationDataSchema } from './interrogationDataSchema'

describe('interrogationDataSchema', () => {
  it('should validate a correct structure', () => {
    const validData = {
      CALCULATED: {
        variable1: 'stringValue',
        variable2: 123,
        variable3: [null, 456, 'anotherValue'],
      },
      EXTERNAL: {
        variable1: true,
        variable2: [false, null, 'arrayValue'],
      },
      COLLECTED: {
        variable1: {
          COLLECTED: 'value',
          EDITED: [null, 'string', true],
          FORCED: null,
          INPUTED: [123, 456],
          PREVIOUS: null,
        },
      },
    }

    const result = interrogationDataSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(validData)
  })

  it('should reject invalid CALCULATED field', () => {
    const invalidData = {
      CALCULATED: {
        variable1: { notAllowed: 'object' },
      },
      EXTERNAL: {},
      COLLECTED: {},
    }

    const result = interrogationDataSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should reject invalid EXTERNAL field', () => {
    const invalidData = {
      CALCULATED: {},
      EXTERNAL: {
        invalidKey: undefined,
      },
      COLLECTED: {},
    }

    const result = interrogationDataSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should reject invalid COLLECTED field', () => {
    const invalidData = {
      CALCULATED: {},
      EXTERNAL: {},
      COLLECTED: {
        invalidKey: {
          COLLECTED: () => {},
        },
      },
    }

    const result = interrogationDataSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should allow partial data', () => {
    const partialData = {
      CALCULATED: {
        variable1: 'partialValue',
      },
    }

    const result = interrogationDataSchema.safeParse(partialData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(partialData)
  })

  it('should allow null or empty objects', () => {
    const emptyData = {}

    const result = interrogationDataSchema.safeParse(emptyData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(emptyData)
  })
})
