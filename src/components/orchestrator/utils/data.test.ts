import { describe, expect, it, vi } from 'vitest'

import type { PageTag } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'

import { computeInterrogation } from './data'

describe('computeInterrogation', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  it('should return default structure when no input is provided', () => {
    const result = computeInterrogation()

    expect(result).toEqual({
      id: '',
      questionnaireId: '',
      personalization: undefined,
      data: {
        EXTERNAL: {
          GLOBAL_QUESTIONNAIRE_ID: '',
          GLOBAL_SURVEY_UNIT_ID: '',
        },
      },
      comment: undefined,
      stateData: undefined,
    })
  })

  it('should not add global external variables if there is no external resources url', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
    }))
    // Re-import after mocking
    const { computeInterrogation } = await import('./data')

    const result = computeInterrogation()

    expect(result).toEqual({
      id: '',
      questionnaireId: '',
      personalization: undefined,
      data: {},
      comment: undefined,
      stateData: undefined,
    })
  })

  it('should keep existing data and inject external variables', () => {
    const partial = {
      id: 'INTERRO001',
      questionnaireId: 'Q123',
      data: {
        COLLECTED: {
          age: {
            COLLECTED: 25,
          },
        },
        EXTERNAL: {
          SOURCE: 'manual',
        },
      },
    }

    const result = computeInterrogation(partial)

    expect(result.id).toBe('INTERRO001')
    expect(result.questionnaireId).toBe('Q123')
    expect(result.data).toEqual({
      COLLECTED: {
        age: {
          COLLECTED: 25,
        },
      },
      EXTERNAL: {
        SOURCE: 'manual',
        GLOBAL_QUESTIONNAIRE_ID: 'Q123',
        GLOBAL_SURVEY_UNIT_ID: 'INTERRO001',
      },
    })
  })

  it('should preserve personalization and comment fields', () => {
    const partial = {
      personalization: [{ name: 'name', value: 'John' }],
      comment: { note: 'Important respondent' },
    }

    const result = computeInterrogation(partial)

    expect(result.personalization).toEqual([{ name: 'name', value: 'John' }])
    expect(result.comment).toEqual({ note: 'Important respondent' })
  })

  it('should keep stateData when provided', () => {
    const partial = {
      stateData: {
        state: 'INIT' as QuestionnaireState,
        date: 1710000000000,
        currentPage: '1.1#2' as PageTag,
      },
    }

    const result = computeInterrogation(partial)

    expect(result.stateData).toEqual({
      state: 'INIT',
      date: 1710000000000,
      currentPage: '1.1#2',
    })
  })
})
