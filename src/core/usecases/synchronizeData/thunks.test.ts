import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Interrogation } from '@/core/model'
import type { DataStore } from '@/core/ports/DataStore'
import type { LocalSyncStorage } from '@/core/ports/LocalSyncStorage'

import { type State } from './state'
import { actions } from './state'
import { thunks } from './thunks'

const mockDispatch = vi.fn()
const mockGetState: () => { synchronizeData: State.NotRunning } = () => ({
  synchronizeData: { stateDescription: 'not running' },
})

const mockDataStore = {
  getAllInterrogations: vi.fn(),
  updateInterrogation: vi.fn(),
  deleteInterrogation: vi.fn(),
} as any as DataStore

const mockQueenApi = {
  getCampaigns: vi.fn(),
  getQuestionnaire: vi.fn(),
  getInterrogationsIdsAndQuestionnaireIdsByCampaign: vi.fn(),
  getInterrogation: vi.fn(),
  putInterrogation: vi.fn(),
  postInterrogationInTemp: vi.fn(),
  getNomenclature: vi.fn(),
}

const mockLocalSyncStorage = {
  saveObject: vi.fn(),
  addIdToInterrogationsSuccess: vi.fn(),
  addIdToInterrogationsInTempZone: vi.fn(),
  addError: vi.fn(),
} as any as LocalSyncStorage

const mockContext = {
  dataStore: mockDataStore,
  queenApi: mockQueenApi,
  localSyncStorage: mockLocalSyncStorage,
}

describe('download thunk', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()

    // mock console.error to avoid useless logs during tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully download campaigns, questionnaires and interrogations', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
    }))
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    const campaigns = [{ id: '1', questionnaireIds: ['q1', 'q2'] }]
    vi.mocked(mockQueenApi.getCampaigns).mockResolvedValue(campaigns)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue({ id: 'q1' })
    vi.mocked(
      mockQueenApi.getInterrogationsIdsAndQuestionnaireIdsByCampaign,
    ).mockResolvedValue([
      { id: 'interro1', questionnaireId: 'q1' },
      { id: 'interro2', questionnaireId: 'q2' },
    ])
    vi.mocked(mockQueenApi.getInterrogation)
      .mockResolvedValueOnce({ id: 'interro1', questionnaireId: 'q1' })
      .mockResolvedValueOnce({ id: 'interro2', questionnaireId: 'q2' })

    vi.mocked(mockDispatch).mockResolvedValue(undefined)
    // Mock successful updateInterrogation response
    vi.mocked(mockDataStore.updateInterrogation).mockResolvedValue('interro1')
    vi.mocked(
      mockLocalSyncStorage.addIdToInterrogationsSuccess,
    ).mockResolvedValue(undefined)
    vi.mocked(mockLocalSyncStorage.addError).mockResolvedValue(undefined)

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningDownload())
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setDownloadTotalSurvey({ totalSurvey: 2 }),
    )
    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadSurveyCompleted())
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.updateDownloadTotalInterrogation({ totalInterrogation: 2 }),
    )

    // Check interrogation actions
    const downloadInterrogationCalls = mockDispatch.mock.calls.filter(
      ([action]) =>
        action.type === actions.downloadInterrogationCompleted().type,
    )
    expect(downloadInterrogationCalls).toHaveLength(2)

    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadCompleted())

    // Ensure the local sync storage actions were called
    expect(
      mockLocalSyncStorage.addIdToInterrogationsSuccess,
    ).toHaveBeenCalledWith('interro1')
    expect(
      mockLocalSyncStorage.addIdToInterrogationsSuccess,
    ).toHaveBeenCalledWith('interro2')
  })

  it('should successfully fetch nomenclatures', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
    }))
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    const campaigns = [{ id: '1', questionnaireIds: ['q1'] }]
    const nomenclature = { id: 'nomen1', name: 'Nomenclature 1' }
    vi.mocked(mockQueenApi.getCampaigns).mockResolvedValue(campaigns)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue({
      id: 'q1',
      suggesters: [{ name: 'Nomenclature 1' }],
    })
    vi.mocked(
      mockQueenApi.getInterrogationsIdsAndQuestionnaireIdsByCampaign,
    ).mockResolvedValue([
      { id: 'interro1', questionnaireId: 'q1' },
      { id: 'interro2', questionnaireId: 'q2' },
    ])
    vi.mocked(mockQueenApi.getInterrogation)
      .mockResolvedValueOnce({ id: 'interro1', questionnaireId: 'q1' })
      .mockResolvedValueOnce({ id: 'interro2', questionnaireId: 'q2' })

    vi.mocked(mockDispatch).mockResolvedValue(undefined)

    vi.mocked(mockQueenApi.getNomenclature).mockResolvedValue(nomenclature)
    vi.mocked(mockDispatch).mockResolvedValue(undefined)

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setDownloadTotalNomenclature({ totalNomenclature: 1 }),
    )

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.downloadNomenclatureCompleted(),
    )
  })

  it('should handle errors during downloading interrogations and resources', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
    }))
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    const campaigns = [{ id: '1', questionnaireIds: ['q1', 'q2'] }]
    vi.mocked(mockQueenApi.getCampaigns).mockResolvedValue(campaigns)
    vi.mocked(mockQueenApi.getQuestionnaire).mockRejectedValue(
      new Error('Failed to fetch questionnaire'),
    )

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockLocalSyncStorage.addError).toHaveBeenCalledWith(true)
    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadFailed())
  })
})

describe('upload thunk', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should upload interrogations successfully', async () => {
    const interrogations = [{ id: '1' }, { id: '2' }]
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue(
      interrogations as Interrogation[],
    )
    vi.mocked(mockQueenApi.putInterrogation).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningUpload())

    const uploadInterrogationCalls = mockDispatch.mock.calls.filter(
      ([action]) => action.type === actions.uploadInterrogationCompleted().type,
    )
    expect(uploadInterrogationCalls).toHaveLength(2)

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setUploadTotal({ total: interrogations.length }),
    )
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())

    /**
     * Cannot do directly expect(mockDispatch).toHaveBeenCalledWith(thunks.download())
     * since it considers it has been called with [AsyncFunction (anonymous)]
     */
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
    expect(mockDispatch).toHaveBeenCalledTimes(6)
  })

  it('should handle interrogation upload failure and retry posting to temp zone', async () => {
    const interrogation = { id: '1' }
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([
      interrogation,
    ] as Interrogation[])
    vi.mocked(mockQueenApi.putInterrogation).mockRejectedValue({
      response: { status: 400 },
    })
    vi.mocked(mockQueenApi.postInterrogationInTemp).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockQueenApi.postInterrogationInTemp).toHaveBeenCalledWith(
      interrogation,
    )
    expect(
      mockLocalSyncStorage.addIdToInterrogationsInTempZone,
    ).toHaveBeenCalledWith(interrogation.id)
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should treat 423 response as a success', async () => {
    const interrogation = { id: '1' }

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([
      interrogation,
    ] as Interrogation[])
    vi.mocked(mockQueenApi.putInterrogation).mockRejectedValue({
      response: { status: 423 },
    })

    vi.mocked(mockQueenApi.postInterrogationInTemp).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    // Expect it to continue as if it were a success
    expect(mockQueenApi.postInterrogationInTemp).not.toHaveBeenCalled()
    expect(mockDataStore.deleteInterrogation).toHaveBeenCalledWith(
      interrogation.id,
    )
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.uploadInterrogationCompleted(),
    )

    // Ensure upload completion is still dispatched
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should handle unexpected errors', async () => {
    vi.mocked(mockDataStore.getAllInterrogations).mockRejectedValue(
      new Error('Unexpected error'),
    )

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockLocalSyncStorage.addError).toHaveBeenCalledWith(true)
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadError())
  })
})
