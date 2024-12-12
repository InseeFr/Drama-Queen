import { describe, expect, it } from 'vitest'
import {
  idAndQuestionnaireIdSchema,
  surveyUnitSchema,
} from './surveyUnitSchema'

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

describe('surveyUnitSchema', () => {
  it('should validate a valid survey unit object', () => {
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

    const result = surveyUnitSchema.safeParse(validData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(validData)
  })

  it('should reject invalid survey unit objects', () => {
    const invalidData = {
      id: 12345,
      questionnaireId: '67890',
      personalization: 'not-an-array',
      data: {},
    }

    const result = surveyUnitSchema.safeParse(invalidData)

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

    const result = surveyUnitSchema.safeParse(partialData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(partialData)
  })

  it('should reject invalid stateData format', () => {
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
        currentPage: 'invalidPageFormat',
      },
    }

    const result = surveyUnitSchema.safeParse(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})
