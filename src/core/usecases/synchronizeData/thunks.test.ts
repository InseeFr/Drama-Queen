import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'
import type { Interrogation, Paradata } from '@/core/model'
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
  getAllParadata: vi.fn(),
  deleteParadata: vi.fn(),
} as any as DataStore

const mockQueenApi = {
  getCampaigns: vi.fn(),
  getQuestionnaire: vi.fn(),
  getInterrogationsIdsAndQuestionnaireIdsByCampaign: vi.fn(),
  getInterrogation: vi.fn(),
  putInterrogation: vi.fn(),
  postInterrogationInTemp: vi.fn(),
  getNomenclature: vi.fn(),
  postParadata: vi.fn(),
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
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()

    // mock console.error to avoid useless logs during tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

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
    // no paradata
    vi.mocked(mockDataStore.getAllParadata).mockResolvedValue([])

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningUpload())

    const uploadInterrogationCalls = mockDispatch.mock.calls.filter(
      ([action]) => action.type === actions.uploadInterrogationCompleted().type,
    )
    expect(uploadInterrogationCalls).toHaveLength(2)

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setUploadTotalInterrogation({
        totalInterrogation: interrogations.length,
      }),
    )
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())

    /**
     * Cannot do directly expect(mockDispatch).toHaveBeenCalledWith(thunks.download())
     * since it considers it has been called with [AsyncFunction (anonymous)]
     */
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
    expect(mockDispatch).toHaveBeenCalledTimes(7)
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

  it('should treat 423 response for interrogation as a success', async () => {
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

  it('should handle unexpected errors for interrogations', async () => {
    vi.mocked(mockDataStore.getAllInterrogations).mockRejectedValue(
      new Error('Unexpected error'),
    )

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockLocalSyncStorage.addError).toHaveBeenCalledWith(true)
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadError())
  })

  it('should delete paradata without sending it when interrogation upload fails', async () => {
    const interrogation = { id: '1' }
    const allParadata: Paradata[] = [
      {
        idInterrogation: '1',
        events: [
          {
            idInterrogation: '1',
            type: TELEMETRY_EVENT_TYPE.INIT,
            date: '133142424',
          },
        ],
      },
    ]

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([
      interrogation,
    ] as Interrogation[])
    vi.mocked(mockQueenApi.putInterrogation).mockRejectedValue({
      response: { status: 400 },
    })
    vi.mocked(mockQueenApi.postInterrogationInTemp).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.getAllParadata).mockResolvedValue(allParadata)
    vi.mocked(mockDataStore.deleteParadata).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    // The post to temp should happen
    expect(mockQueenApi.postInterrogationInTemp).toHaveBeenCalledWith(
      interrogation,
    )
    // The paradata for this interrogation should be deleted
    expect(mockDataStore.deleteParadata).toHaveBeenCalledWith(interrogation.id)

    // The paradata for this interrogation should not have been sent
    expect(mockQueenApi.postParadata).not.toHaveBeenCalled()

    // Upload completion dispatched
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should upload all paradata successfully', async () => {
    const allParadata: Paradata[] = [
      {
        idInterrogation: 'interro001',
        events: [
          {
            idInterrogation: 'interro001',
            type: TELEMETRY_EVENT_TYPE.INIT,
            date: '133142424',
          },
          {
            idInterrogation: 'interro001',
            type: TELEMETRY_EVENT_TYPE.EXIT,
            source: TELEMETRY_EVENT_EXIT_SOURCE.QUIT,
            date: '199894200',
          },
        ],
      },
      {
        idInterrogation: 'interro002',
        events: [
          {
            idInterrogation: 'interro002',
            type: TELEMETRY_EVENT_TYPE.INIT,
            date: '129031420',
          },
          {
            idInterrogation: 'interro002',
            type: TELEMETRY_EVENT_TYPE.EXIT,
            source: TELEMETRY_EVENT_EXIT_SOURCE.QUIT,
            date: '174294290',
          },
        ],
      },
    ]
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([])
    vi.mocked(mockDataStore.getAllParadata).mockResolvedValue(allParadata)
    vi.mocked(mockQueenApi.postParadata).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteParadata).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setUploadTotalParadata({ totalParadata: 2 }),
    )
    // every paradata has been sent to api
    expect(mockQueenApi.postParadata).toHaveBeenCalledWith(allParadata[0])
    expect(mockQueenApi.postParadata).toHaveBeenCalledWith(allParadata[1])

    // every paradata is deleted in datastore after successful POST
    expect(mockDataStore.deleteParadata).toHaveBeenCalledWith(
      allParadata[0].idInterrogation,
    )
    expect(mockDataStore.deleteParadata).toHaveBeenCalledWith(
      allParadata[1].idInterrogation,
    )

    // every paradata upload is completed
    const uploadParadataCalls = mockDispatch.mock.calls.filter(
      ([action]) => action.type === actions.uploadParadataCompleted().type,
    )
    expect(uploadParadataCalls).toHaveLength(2)

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setUploadTotalParadata({
        totalParadata: allParadata.length,
      }),
    )
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should keep paradata when upload fails', async () => {
    const allParadata: Paradata[] = [
      {
        idInterrogation: 'interro001',
        events: [
          {
            idInterrogation: 'interro001',
            type: TELEMETRY_EVENT_TYPE.INIT,
            date: '133142424',
          },
        ],
      },
    ]
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([])
    vi.mocked(mockDataStore.getAllParadata).mockResolvedValue(allParadata)
    vi.mocked(mockQueenApi.postParadata).mockRejectedValue({
      response: { status: 500 },
    })

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockQueenApi.postParadata).toHaveBeenCalledWith(allParadata[0])

    // paradata is not deleted in datastore because POST failed
    expect(mockDataStore.deleteParadata).not.toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should skip paradata step when telemetry is disabled', async () => {
    // override global mock value for disabling telemetry
    vi.doMock('@/core/constants', () => ({
      IS_TELEMETRY_DISABLED: true,
    }))
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([])

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockQueenApi.postParadata).not.toHaveBeenCalled()
    expect(mockDataStore.deleteParadata).not.toHaveBeenCalled()

    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })
})
