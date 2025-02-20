import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Questionnaire, SurveyUnit } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import type { DataStore } from '@/core/ports/DataStore'
import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'

import {
  sendCloseEvent,
  sendQuestionnaireStateChangedEvent,
} from './eventSender'
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

vi.mock('./eventSender', () => ({
  sendCloseEvent: vi.fn(),
  sendQuestionnaireStateChangedEvent: vi.fn(),
}))

const mockDispatch = vi.fn()
const mockGetState = vi.fn()

const mockDataStore = {
  getSurveyUnit: vi.fn(),
  updateSurveyUnit: vi.fn(),
} as any as DataStore

const mockQueenApi = {
  getQuestionnaire: vi.fn(),
  getNomenclature: vi.fn(),
}

const mockContext = {
  dataStore: mockDataStore,
  queenApi: mockQueenApi,
}

describe('retrieveQuestionnaireId', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return questionnaireId if surveyUnit exists', async () => {
    vi.mocked(mockDataStore.getSurveyUnit).mockResolvedValue({
      questionnaireId: 'Q123',
    } as SurveyUnit)

    const result = await thunks.retrieveQuestionnaireId({
      surveyUnitId: 'SU001',
    })(mockDispatch, mockGetState, mockContext as any)

    expect(result).toBe('Q123')
    expect(mockDataStore.getSurveyUnit).toHaveBeenCalledWith('SU001')
  })

  it('should reject if surveyUnit does not exist', async () => {
    vi.mocked(mockDataStore.getSurveyUnit).mockResolvedValue(undefined)

    await expect(
      thunks.retrieveQuestionnaireId({ surveyUnitId: 'SU002' })(
        mockDispatch,
        mockGetState,
        mockContext as any,
      ),
    ).rejects.toThrow('surveyUnitQuestionnaireNotFound SU002')
  })
})

describe('loader', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return surveyUnit and questionnaire when both are valid', async () => {
    const surveyUnit = { id: 'SU001', questionnaireId: 'Q123' } as SurveyUnit
    const questionnaire = { id: 'Q123' } as Questionnaire

    vi.mocked(mockDataStore.getSurveyUnit).mockResolvedValue(surveyUnit)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue(questionnaire)
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({
      questionnaireId: 'Q123',
      surveyUnitId: 'SU001',
    })(mockDispatch, mockGetState, mockContext as any)

    expect(result).toEqual({ surveyUnit, questionnaire })
  })

  it('should throw error when questionnaire is not compatible', async () => {
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(false)
    const surveyUnit = { questionnaireId: 'Q123' } as SurveyUnit

    vi.mocked(mockDataStore.getSurveyUnit).mockResolvedValue(surveyUnit)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue({
      id: 'Q123',
    })

    await expect(
      thunks.loader({ questionnaireId: 'Q123', surveyUnitId: 'SU001' })(
        mockDispatch,
        mockGetState,
        mockContext as any,
      ),
    ).rejects.toThrow('questionnaireNotCompatible')
  })

  it('should throw error when surveyUnit and questionnaire mismatch', async () => {
    const surveyUnit = { id: 'SU001', questionnaireId: 'Q124' } as SurveyUnit
    const questionnaire = { id: 'Q123' } as Questionnaire

    vi.mocked(mockDataStore.getSurveyUnit).mockResolvedValue(surveyUnit)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue(questionnaire)
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    await expect(
      thunks.loader({ questionnaireId: 'Q123', surveyUnitId: 'SU001' })(
        mockDispatch,
        mockGetState,
        mockContext as any,
      ),
    ).rejects.toThrow('wrongQuestionnaire')
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

describe('changePage', () => {
  beforeEach(() => {
    // mock console.error to avoid useless logs during tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call updateSurveyUnit with the correct surveyUnit', async () => {
    const surveyUnit = { id: 'SU001', questionnaireId: 'Q123' } as SurveyUnit

    // Mock successful updateSurveyUnit response
    vi.mocked(mockDataStore.updateSurveyUnit).mockResolvedValue('SU001')

    thunks.changePage(surveyUnit)(
      mockDispatch,
      mockGetState,
      mockContext as any,
    )

    expect(mockDataStore.updateSurveyUnit).toHaveBeenCalledWith(surveyUnit)
  })
})

describe('changeSurveyUnitState', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should send STARTED state event if new state is INIT', () => {
    const surveyUnitId = 'SU001'
    const newState = 'INIT'

    thunks.changeSurveyUnitState({ surveyUnitId, newState })()

    expect(sendQuestionnaireStateChangedEvent).toHaveBeenCalledWith(
      surveyUnitId,
      'STARTED',
    )
  })

  it('should send COMPLETED state event if new state is COMPLETED', () => {
    const surveyUnitId = 'SU001'
    const newState = 'COMPLETED'

    thunks.changeSurveyUnitState({ surveyUnitId, newState })()

    expect(sendQuestionnaireStateChangedEvent).toHaveBeenCalledWith(
      surveyUnitId,
      'COMPLETED',
    )
  })

  it('should send VALIDATED state event if new state is VALIDATED', () => {
    const surveyUnitId = 'SU001'
    const newState = 'VALIDATED'

    thunks.changeSurveyUnitState({ surveyUnitId, newState })()

    expect(sendQuestionnaireStateChangedEvent).toHaveBeenCalledWith(
      surveyUnitId,
      'VALIDATED',
    )
  })

  it('should not send state event for other states : TOEXTRACT, EXTRACTED, null', () => {
    const surveyUnitId = 'SU001'

    const statesList: QuestionnaireState[] = ['TOEXTRACT', 'EXTRACTED', null]

    statesList.forEach((state) => {
      thunks.changeSurveyUnitState({ surveyUnitId, newState: state })()

      expect(sendQuestionnaireStateChangedEvent).not.toHaveBeenCalled()
    })
  })
})

describe('quit', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch changePage with the correct surveyUnit', () => {
    const surveyUnit = { id: 'SU001', questionnaireId: 'Q123' } as SurveyUnit
    const mockChangePage = vi.fn()
    thunks.changePage = mockChangePage

    const mockChangePageResult = vi.fn()
    mockChangePage.mockReturnValue(mockChangePageResult)

    thunks.quit(surveyUnit)(mockDispatch, mockGetState, mockContext as any)

    expect(mockChangePage).toHaveBeenCalledWith(surveyUnit)
    expect(mockDispatch).toHaveBeenCalledWith(mockChangePageResult)
  })

  it('should send a close event with the correct surveyUnit id', () => {
    const surveyUnit = { id: 'SU001', questionnaireId: 'Q123' } as SurveyUnit

    thunks.quit(surveyUnit)(mockDispatch, mockGetState, mockContext as any)

    expect(sendCloseEvent).toHaveBeenCalledWith(surveyUnit.id)
  })
})
