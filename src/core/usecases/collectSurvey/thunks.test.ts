import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Interrogation, Questionnaire } from '@/core/model'
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
  getInterrogation: vi.fn(),
  updateInterrogation: vi.fn(),
} as any as DataStore

const mockQueenApi = {
  getQuestionnaire: vi.fn(),
  getNomenclature: vi.fn(),
}

const mockContext = {
  dataStore: mockDataStore,
  queenApi: mockQueenApi,
}

describe('loader', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should return interrogation and questionnaire', async () => {
    const interrogation = {
      id: 'INTERRO001',
      questionnaireId: 'Q123',
    } as Interrogation
    const questionnaire = { id: 'Q123' } as Questionnaire

    vi.mocked(mockDataStore.getInterrogation).mockResolvedValue(interrogation)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue(questionnaire)
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({
      interrogationId: 'INTERRO001',
    })(mockDispatch, mockGetState, mockContext as any)

    expect(result).toEqual({ interrogation, questionnaire })
  })

  it('should throw error when questionnaire is not compatible', async () => {
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(false)
    const interrogation = { questionnaireId: 'Q123' } as Interrogation

    vi.mocked(mockDataStore.getInterrogation).mockResolvedValue(interrogation)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue({
      id: 'Q123',
    })

    await expect(
      thunks.loader({ interrogationId: 'INTERRO001' })(
        mockDispatch,
        mockGetState,
        mockContext as any,
      ),
    ).rejects.toThrow('questionnaireNotCompatible')
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

  it('should call updateInterrogation with the correct interrogation', async () => {
    const interrogation = {
      id: 'INTERRO001',
      questionnaireId: 'Q123',
    } as Interrogation

    // Mock successful updateInterrogation response
    vi.mocked(mockDataStore.updateInterrogation).mockResolvedValue('INTERRO001')

    thunks.changePage(interrogation)(
      mockDispatch,
      mockGetState,
      mockContext as any,
    )

    expect(mockDataStore.updateInterrogation).toHaveBeenCalledWith(
      interrogation,
    )
  })
})

describe('changeInterrogationState', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should send STARTED state event if new state is INIT', () => {
    const interrogationId = 'INTERRO001'
    const newState = 'INIT'

    thunks.changeInterrogationState({ interrogationId, newState })()

    expect(sendQuestionnaireStateChangedEvent).toHaveBeenCalledWith(
      interrogationId,
      'STARTED',
    )
  })

  it('should send COMPLETED state event if new state is COMPLETED', () => {
    const interrogationId = 'INTERRO001'
    const newState = 'COMPLETED'

    thunks.changeInterrogationState({ interrogationId, newState })()

    expect(sendQuestionnaireStateChangedEvent).toHaveBeenCalledWith(
      interrogationId,
      'COMPLETED',
    )
  })

  it('should send VALIDATED state event if new state is VALIDATED', () => {
    const interrogationId = 'INTERRO001'
    const newState = 'VALIDATED'

    thunks.changeInterrogationState({ interrogationId, newState })()

    expect(sendQuestionnaireStateChangedEvent).toHaveBeenCalledWith(
      interrogationId,
      'VALIDATED',
    )
  })

  it('should not send state event for other states : TOEXTRACT, EXTRACTED, null', () => {
    const interrogationId = 'INTERRO001'

    const statesList: QuestionnaireState[] = ['TOEXTRACT', 'EXTRACTED', null]

    statesList.forEach((state) => {
      thunks.changeInterrogationState({ interrogationId, newState: state })()

      expect(sendQuestionnaireStateChangedEvent).not.toHaveBeenCalled()
    })
  })
})

describe('quit', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch changePage with the correct interrogation', () => {
    const interrogation = {
      id: 'INTERRO001',
      questionnaireId: 'Q123',
    } as Interrogation
    const mockChangePage = vi.fn()
    thunks.changePage = mockChangePage

    const mockChangePageResult = vi.fn()
    mockChangePage.mockReturnValue(mockChangePageResult)

    thunks.quit(interrogation)(mockDispatch, mockGetState, mockContext as any)

    expect(mockChangePage).toHaveBeenCalledWith(interrogation)
    expect(mockDispatch).toHaveBeenCalledWith(mockChangePageResult)
  })

  it('should send a close event with the correct interrogation id', () => {
    const interrogation = {
      id: 'INTERRO001',
      questionnaireId: 'Q123',
    } as Interrogation

    thunks.quit(interrogation)(mockDispatch, mockGetState, mockContext as any)

    expect(sendCloseEvent).toHaveBeenCalledWith(interrogation.id)
  })
})
