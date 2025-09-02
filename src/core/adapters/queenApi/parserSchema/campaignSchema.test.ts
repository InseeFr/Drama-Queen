import { describe, expect, it } from 'vitest'

import { campaignSchema } from './campaignSchema'

describe('campaignSchema', () => {
  it('should validate a valid campaign object', () => {
    const validData = {
      id: 'campaign1',
      questionnaireIds: ['q1', 'q2', 'q3'],
    }

    const result = campaignSchema.safeParse(validData)
    expect(result.success).toBe(true)
    expect(result.success && result.data).toEqual(validData)
  })

  it('should fail validation when "id" is missing', () => {
    const invalidData = {
      questionnaireIds: ['q1', 'q2'],
    }

    const result = campaignSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation when "questionnaireIds" is not an array of strings', () => {
    const invalidData = {
      id: 'campaign2',
      questionnaireIds: [123, 'q2'],
    }

    const result = campaignSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation when "questionnaireIds" is missing', () => {
    const invalidData = {
      id: 'campaign3',
    }

    const result = campaignSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
