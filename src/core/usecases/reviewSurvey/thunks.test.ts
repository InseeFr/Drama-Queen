import { afterEach, describe, expect, it, vi } from 'vitest'

import type { Questionnaire, SurveyUnit } from '@/core/model'
import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'

import { thunks } from './thunks'

vi.mock('@/i18n', () => ({
  getTranslation: () => ({
    t: (keyMessage: string, params?: Record<string, any>) => {
      if (!params) return keyMessage

      // Create a string by joining the values of params with space
      const paramsString = Object.values(params).join(' ')

      // Return the concatenated string: key + params string
      return `${keyMessage} ${paramsString}`
    },
  }),
}))

vi.mock('@/core/tools/SurveyModelBreaking', () => ({
  isSurveyCompatibleWithQueen: vi.fn(),
}))

const mockDispatch = vi.fn()
const mockGetState = vi.fn()

const mockQueenApi = {
  getQuestionnaire: vi.fn(),
  getNomenclature: vi.fn(),
  getSurveyUnit: vi.fn(),
}

const mockContext = {
  queenApi: mockQueenApi,
}

describe('loader', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return surveyUnit and questionnaire', async () => {
    const surveyUnit = { id: 'SU001', questionnaireId: 'Q123' } as SurveyUnit
    const questionnaire = { id: 'Q123' } as Questionnaire

    vi.mocked(mockQueenApi.getSurveyUnit).mockResolvedValue(surveyUnit)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue(questionnaire)
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({
      surveyUnitId: 'SU001',
    })(mockDispatch, mockGetState, mockContext as any)

    expect(result).toEqual({ surveyUnit, questionnaire })
  })
})

describe('getReferentiel', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return nomenclature correctly', async () => {
    const nomenclature = { id: 'ref1', name: 'my-nomenclature' }

    vi.mocked(mockQueenApi.getNomenclature).mockResolvedValue(nomenclature)

    const result = await thunks.getReferentiel('my-nomenclature')(
      mockDispatch,
      mockGetState,
      mockContext as any,
    )

    expect(result).toEqual(nomenclature)
  })
})
