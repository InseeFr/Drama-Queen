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

describe('interrogationSchema with leafStates', () => {
  const baseInterrogation = {
    id: '12345',
    questionnaireId: '67890',
    data: { CALCULATED: {}, EXTERNAL: {}, COLLECTED: {} },
  }

  it('should validate a valid leafStates array', () => {
    const validData = {
      ...baseInterrogation,
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '1',
        leafStates: [
          {
            state: 'INIT',
            date: 1633036800,
            cells: [
              { label: 'cell1', value: 'value1' },
              { label: 'cell2', value: 'value2' },
            ],
          },
          {
            state: 'COMPLETED',
            date: 1633036801,
          },
        ],
      },
    }

    const result = interrogationSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data?.stateData?.leafStates).toHaveLength(2)
    expect(result.data?.stateData?.leafStates?.[0].state).toBe('INIT')
    expect(result.data?.stateData?.leafStates?.[1].state).toBe('COMPLETED')
  })

  it('should allow leafStates to be omitted', () => {
    const validData = {
      ...baseInterrogation,
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '1',
      },
    }

    const result = interrogationSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data?.stateData?.leafStates).toBeUndefined()
  })

  it('should validate leafStates with null state', () => {
    const validData = {
      ...baseInterrogation,
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '1',
        leafStates: [
          {
            state: null,
            date: 1633036800,
          },
        ],
      },
    }

    const result = interrogationSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data?.stateData?.leafStates?.[0].state).toBe(null)
  })

  it('should validate leafStates with NOT_INIT state', () => {
    const validData = {
      ...baseInterrogation,
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '1',
        leafStates: [
          {
            state: 'NOT_INIT',
            date: 1633036800,
          },
        ],
      },
    }

    const result = interrogationSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data?.stateData?.leafStates?.[0].state).toBe('NOT_INIT')
  })

  it('should reject invalid leafState state', () => {
    const invalidData = {
      ...baseInterrogation,
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '1',
        leafStates: [
          {
            state: 'INVALID_STATE',
            date: 1633036800,
          },
        ],
      },
    }

    const result = interrogationSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should reject invalid leafState cells', () => {
    const invalidData = {
      ...baseInterrogation,
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '1',
        leafStates: [
          {
            state: 'INIT',
            date: 1633036800,
            cells: [
              { label: 123, value: 'value1' }, // label should be a string
            ],
          },
        ],
      },
    }

    const result = interrogationSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should allow empty cells array in leafState', () => {
    const validData = {
      ...baseInterrogation,
      stateData: {
        state: 'VALIDATED',
        date: 1633036800,
        currentPage: '1',
        leafStates: [
          {
            state: 'INIT',
            date: 1633036800,
            cells: [],
          },
        ],
      },
    }

    const result = interrogationSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data?.stateData?.leafStates?.[0].cells).toEqual([])
  })
})
