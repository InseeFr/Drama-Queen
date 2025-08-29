import { describe, expect, it } from 'vitest'

import { paradataSchema } from './paradataSchema'

describe('eventSchema', () => {
  const eventSchema = paradataSchema.shape.event.element
  const validEvent = {
    type: 'click',
    timestamp: 1634567890,
    userAgent: 'Mozilla/5.0',
    idSurveyUnit: 'su123',
    idOrchestrator: 'orchestrator-collect',
    idQuestionnaire: 'q123',
    idParadataObject: 'po123',
    typeParadataObject: 'orchestrator',
    page: null,
  }

  it('should validate a valid event object', () => {
    const result = eventSchema.safeParse(validEvent)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validEvent)
  })

  it('should fail validation for invalid "type"', () => {
    const invalidEvent = {
      ...validEvent,
      type: 'invalid-type',
    }

    const result = eventSchema.safeParse(invalidEvent)
    expect(result.success).toBe(false)
  })

  it('should fail validation for negative timestamp', () => {
    const invalidEvent = {
      ...validEvent,
      timestamp: -1,
    }

    const result = eventSchema.safeParse(invalidEvent)
    expect(result.success).toBe(false)
  })

  it('should fail validation for missing required properties', () => {
    const invalidEvent = {
      type: 'click',
      timestamp: 1634567890,
      userAgent: 'Mozilla/5.0',
    }

    const result = eventSchema.safeParse(invalidEvent)
    expect(result.success).toBe(false)
  })
})

describe('paradataSchema', () => {
  it('should validate a valid paradata object', () => {
    const validParadata = {
      idSu: 'su123',
      event: [
        {
          type: 'click',
          timestamp: 1634567890,
          userAgent: 'Mozilla/5.0',
          idSurveyUnit: 'su123',
          idOrchestrator: 'orchestrator-collect',
          idQuestionnaire: 'q123',
          idParadataObject: 'po123',
          typeParadataObject: 'orchestrator',
          page: null,
        },
      ],
    }

    const result = paradataSchema.safeParse(validParadata)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validParadata)
  })

  it('should fail validation for missing "idSu"', () => {
    const invalidParadata = {
      event: [
        {
          type: 'click',
          timestamp: 1634567890,
          userAgent: 'Mozilla/5.0',
          idSurveyUnit: 'su123',
          idOrchestrator: 'orchestrator-collect',
          idQuestionnaire: 'q123',
          idParadataObject: 'po123',
          typeParadataObject: 'orchestrator',
          page: null,
        },
      ],
    }

    const result = paradataSchema.safeParse(invalidParadata)
    expect(result.success).toBe(false)
  })

  it('should fail validation for invalid event array', () => {
    const invalidParadata = {
      idSu: 'su123',
      event: [
        {
          type: 'invalid-type',
          timestamp: -1,
        },
      ],
    }

    const result = paradataSchema.safeParse(invalidParadata)
    expect(result.success).toBe(false)
  })
})
