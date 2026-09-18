import { describe, expect, it } from 'vitest'

import {
  idAndQuestionnaireIdSchema,
  interrogationSchema,
} from './interrogationSchema'

describe('idAndQuestionnaireIdSchema', () => {
  it('should validate a valid id and questionnaireId', () => {
    const validData = {
      id: '12345',
      questionnaireId: '67890',
    }

    const result = idAndQuestionnaireIdSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(validData)
  })

  it('should reject invalid id or questionnaireId', () => {
    const invalidData = {
      id: 12345,
      questionnaireId: null,
    }

    const result = idAndQuestionnaireIdSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})

describe('interrogationSchema', () => {
  it('should validate a valid interrogation object', () => {
    const validData = {
      id: '12345',
      questionnaireId: '67890',
      personalization: [
        { name: 'age', value: '30' },
        { name: 'gender', value: 'male' },
      ],
      data: {
        CALCULATED: { variable1: 'value1' },
        EXTERNAL: { variable2: 42 },
        COLLECTED: {
          collectedKey: {
            COLLECTED: 'value',
            EDITED: null,
          },
        },
      },
      comment: {},
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '12.3#4',
      },
    }

    const result = interrogationSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(validData)
  })

  it('should reject invalid interrogation objects', () => {
    const invalidData = {
      id: 12345,
      questionnaireId: '67890',
      personalization: 'not-an-array',
      data: {},
    }

    const result = interrogationSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should allow optional fields to be omitted', () => {
    const partialData = {
      id: '12345',
      questionnaireId: '67890',
      data: {
        CALCULATED: {},
        EXTERNAL: {},
        COLLECTED: {},
      },
    }

    const result = interrogationSchema.safeParse(partialData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(partialData)
  })

  it('should reject an unknown stateData state', () => {
    const invalidData = {
      id: '12345',
      questionnaireId: '67890',
      data: {
        CALCULATED: {},
        EXTERNAL: {},
        COLLECTED: {},
      },
      stateData: {
        state: 'INVALID_STATE',
        date: 1633036800,
        currentPage: '1',
      },
    }

    const result = interrogationSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})

describe('interrogationSchema stateData coming from the web (stromae)', () => {
  const webInterrogation = (stateData: Record<string, unknown>) => ({
    id: 'PROTO10',
    questionnaireId: '67890',
    data: { CALCULATED: {}, EXTERNAL: {}, COLLECTED: {} },
    stateData,
  })

  it.each(['welcomePage', 'validationPage', 'endPage'])(
    'should fall back to the first page when currentPage is the stromae page "%s"',
    (currentPage) => {
      const result = interrogationSchema.safeParse(
        webInterrogation({ state: 'INIT', date: 1633036800, currentPage }),
      )

      expect(result.success).toBe(true)
      expect(result.data?.stateData?.currentPage).toBe('1')
    },
  )

  it('should map the IS_MOVED state to null', () => {
    const result = interrogationSchema.safeParse(
      webInterrogation({
        state: 'IS_MOVED',
        date: 1633036800,
        currentPage: '1',
      }),
    )

    expect(result.success).toBe(true)
    expect(result.data?.stateData?.state).toBe(null)
  })
})
