import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'
import type { Interrogation, LocalInterrogation, Paradata } from '@/core/model'
import type { DataStore } from '@/core/ports/DataStore'
import type { LocalSyncStorage } from '@/core/ports/LocalSyncStorage'
import { interrogationFromLocalInterrogation } from '@/utils/interrogation'

import { type State } from './state'
import { actions } from './state'
import { thunks } from './thunks'

const mockDispatch = vi.fn()
const mockGetState: () => {
  synchronizeData: State.NotRunning
  takeControl: any
} = () => ({
  synchronizeData: { stateDescription: 'not running' },
  takeControl: {} as any,
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
  fetchMoved: vi.fn(),
  syncInterrogation: vi.fn(),
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
    localStorage.clear()
  })

  it('should only download new interrogations not already in local datastore', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1', 'interro2', 'interro3']),
    )
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    const interro1: Interrogation = {
      id: 'interro1',
      questionnaireId: 'q1',
      data: {},
    }
    const interro2: Interrogation = {
      id: 'interro2',
      questionnaireId: 'q1',
      data: {},
    }
    const interro3: Interrogation = {
      id: 'interro3',
      questionnaireId: 'q1',
      data: {},
    }
    const interro4: Interrogation = {
      id: 'interro4',
      questionnaireId: 'q1',
      data: {},
    }

    // Mock that interro1 already exists in local datastore, but interro2 and interro4 are new
    const existingInterrogations = [interro1, interro4]
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue(
      existingInterrogations,
    )

    // Fetch only interro2 & interro3 (interro1 is already local)
    vi.mocked(mockQueenApi.getInterrogation)
      .mockResolvedValueOnce(interro2)
      .mockResolvedValueOnce(interro3)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue({ id: 'q1' })

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningDownload())

    // Total interrogation to download : interrogations that are fetched
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.updateDownloadTotalInterrogation({ totalInterrogation: 2 }),
    )

    // Insert new interrogations in local datastore
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledTimes(2)
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledWith({
      ...interro2,
      hasBeenUpdated: false,
    })
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledWith({
      ...interro3,
      hasBeenUpdated: false,
    })

    // Only new interrogations should be marked as completed
    const downloadInterrogationCalls = mockDispatch.mock.calls.filter(
      ([action]) =>
        action.type === actions.downloadInterrogationCompleted().type,
    )
    expect(downloadInterrogationCalls).toHaveLength(2)

    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadCompleted())

    // Only the new interrogation should be marked as success
    expect(
      mockLocalSyncStorage.addIdToInterrogationsSuccess,
    ).toHaveBeenCalledWith('interro2')
    expect(
      mockLocalSyncStorage.addIdToInterrogationsSuccess,
    ).toHaveBeenCalledWith('interro3')
    expect(
      mockLocalSyncStorage.addIdToInterrogationsSuccess,
    ).not.toHaveBeenCalledWith('interro1')
    expect(
      mockLocalSyncStorage.addIdToInterrogationsSuccess,
    ).not.toHaveBeenCalledWith('interro4')

    // Ensure the list of interrogation ids is cleared from local storage
    expect(localStorage.getItem('SYNCHRONIZATION_INTERROGATION_IDS')).toBeNull()
  })

  it('should download all interrogations when local datastore is empty', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1', 'interro2']),
    )
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    const interro1: Interrogation = {
      id: 'interro1',
      questionnaireId: 'q1',
      data: {},
    }
    const interro2: Interrogation = {
      id: 'interro2',
      questionnaireId: 'q1',
      data: {},
    }

    // Mock that no interrogations exist in local datastore (both are new)
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([])

    vi.mocked(mockQueenApi.getInterrogation)
      .mockResolvedValueOnce(interro1)
      .mockResolvedValueOnce(interro2)
    vi.mocked(mockQueenApi.getQuestionnaire).mockResolvedValue({ id: 'q1' })

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningDownload())
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.updateDownloadTotalInterrogation({ totalInterrogation: 2 }),
    )

    // insert interrogations in data store, setting them as not updated locally
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledTimes(2)
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledWith({
      ...interro1,
      hasBeenUpdated: false,
    })
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledWith({
      ...interro2,
      hasBeenUpdated: false,
    })

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

    // Ensure the list of interrogation ids is cleared from local storage
    expect(localStorage.getItem('SYNCHRONIZATION_INTERROGATION_IDS')).toBeNull()
  })

  it('should successfully download questionnaires', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1', 'interro2']),
    )
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    vi.mocked(mockQueenApi.getInterrogation)
      .mockResolvedValueOnce({ id: 'interro1', questionnaireId: 'q1' })
      .mockResolvedValueOnce({ id: 'interro2', questionnaireId: 'q2' })
    vi.mocked(mockQueenApi.getQuestionnaire)
      .mockResolvedValue({ id: 'q1' })
      .mockResolvedValue({ id: 'q2' })

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningDownload())

    // Check interrogation actions
    const downloadQuestionnaireCalls = mockDispatch.mock.calls.filter(
      ([action]) => action.type === actions.downloadSurveyCompleted().type,
    )
    expect(downloadQuestionnaireCalls).toHaveLength(2)

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
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1', 'interro2']),
    )
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    vi.mocked(mockQueenApi.getInterrogation)
      .mockResolvedValueOnce({ id: 'interro1', questionnaireId: 'q1' })
      .mockResolvedValueOnce({ id: 'interro2', questionnaireId: 'q2' })
    vi.mocked(mockQueenApi.getQuestionnaire)
      .mockResolvedValueOnce({
        id: 'q1',
        suggesters: [{ name: 'Nomenclature 1' }],
      })
      .mockResolvedValueOnce({
        id: 'q2',
        suggesters: [{ name: 'Nomenclature 2' }],
      })

    vi.mocked(mockDispatch).mockResolvedValue(undefined)

    vi.mocked(mockQueenApi.getNomenclature)
      .mockResolvedValueOnce({ id: 'nomen1', name: 'Nomenclature 1' })
      .mockResolvedValueOnce({ id: 'nomen2', name: 'Nomenclature 2' })

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setDownloadTotalNomenclature({ totalNomenclature: 2 }),
    )

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.downloadNomenclatureCompleted(),
    )
  })

  it('should use localstorage strategy even if interrogations list is empty', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify([]),
    )
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningDownload())

    expect(mockQueenApi.getCampaigns).not.toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.updateDownloadTotalInterrogation({ totalInterrogation: 0 }),
    )

    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadCompleted())
  })

  it('should handle errors during downloading interrogation', async () => {
    // override global mock value of external resources url
    vi.doMock('@/core/constants', () => ({
      EXTERNAL_RESOURCES_URL: '',
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1']),
    )
    // Re-import after mocking
    const { thunks } = await import('./thunks')

    vi.mocked(mockQueenApi.getInterrogation).mockRejectedValue(
      new Error('Failed to fetch interrogation'),
    )

    await expect(() =>
      thunks.download()(mockDispatch, mockGetState, mockContext as any),
    ).rejects.toThrowError()

    expect(mockLocalSyncStorage.addError).toHaveBeenCalledWith(true)
    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadFailed())

    // Ensure the list of interrogation ids is cleared from local storage
    expect(localStorage.getItem('SYNCHRONIZATION_INTERROGATION_IDS')).toBeNull()
  })

  describe('legacy strategy', () => {
    it('should successfully download campaigns, questionnaires and interrogations', async () => {
      // override global mock value of external resources url
      vi.doMock('@/core/constants', () => ({
        EXTERNAL_RESOURCES_URL: '',
        LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
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
      expect(mockDispatch).toHaveBeenCalledWith(
        actions.downloadSurveyCompleted(),
      )
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
        LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
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
        LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
      }))
      // Re-import after mocking
      const { thunks } = await import('./thunks')

      const campaigns = [{ id: '1', questionnaireIds: ['q1', 'q2'] }]
      vi.mocked(mockQueenApi.getCampaigns).mockResolvedValue(campaigns)
      vi.mocked(mockQueenApi.getQuestionnaire).mockRejectedValue(
        new Error('Failed to fetch questionnaire'),
      )

      await expect(() =>
        thunks.download()(mockDispatch, mockGetState, mockContext as any),
      ).rejects.toThrowError()

      expect(mockLocalSyncStorage.addError).toHaveBeenCalledWith(true)
      expect(mockDispatch).toHaveBeenCalledWith(actions.downloadFailed())
    })
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

  it('should only upload interrogations that have been updated locally', async () => {
    // override global mock value for enable telemetry
    vi.doMock('@/core/constants', () => ({
      IS_TELEMETRY_ENABLED: true,
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    // Re-import after mocking
    const { thunks } = await import('./thunks')
    const interrogations: LocalInterrogation[] = [
      {
        id: '1',
        questionnaireId: 'q1',
        data: { COLLECTED: {} },
        stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
        hasBeenUpdated: true,
      },
      {
        id: '2',
        questionnaireId: 'q1',
        data: { COLLECTED: {} },
        stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
        hasBeenUpdated: false,
      },
      {
        id: '3',
        questionnaireId: 'q1',
        data: { COLLECTED: {} },
        stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
        hasBeenUpdated: true,
      },
      {
        id: '4',
        questionnaireId: 'q1',
        data: { COLLECTED: {} },
        stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      }, // undefined `hasBeenUpdated` should be treated as true
    ]

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue(
      interrogations as LocalInterrogation[],
    )
    vi.mocked(mockQueenApi.putInterrogation).mockResolvedValue(undefined)
    // no paradata
    vi.mocked(mockDataStore.getAllParadata).mockResolvedValue([])

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningUpload())

    const uploadInterrogationCalls = mockDispatch.mock.calls.filter(
      ([action]) => action.type === actions.uploadInterrogationCompleted().type,
    )
    expect(uploadInterrogationCalls).toHaveLength(3)

    expect(mockQueenApi.putInterrogation).toHaveBeenCalledTimes(3)
    expect(mockQueenApi.putInterrogation).toHaveBeenCalledWith(
      interrogationFromLocalInterrogation(interrogations[0]),
    )
    expect(mockQueenApi.putInterrogation).toHaveBeenCalledWith(
      interrogationFromLocalInterrogation(interrogations[2]),
    )
    expect(mockQueenApi.putInterrogation).toHaveBeenCalledWith(
      interrogationFromLocalInterrogation(interrogations[3]),
    )

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setUploadTotalInterrogation({
        totalInterrogation: 3,
      }),
    )
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())

    /**
     * Cannot do directly expect(mockDispatch).toHaveBeenCalledWith(thunks.download())
     * since it considers it has been called with [AsyncFunction (anonymous)]
     */
    expect(mockDispatch).toHaveBeenCalledTimes(7)
  })

  it('should set interrogations as not updated after successful upload', async () => {
    const interrogation: LocalInterrogation = {
      id: '1',
      questionnaireId: 'q1',
      data: { COLLECTED: {} },
      stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      hasBeenUpdated: true,
    }

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([
      interrogation,
    ])
    vi.mocked(mockQueenApi.putInterrogation).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.getAllParadata).mockResolvedValue([])

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    // Should set interrogation locally as not updated
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledWith({
      ...interrogation,
      hasBeenUpdated: false,
    })
  })

  it('should handle interrogation upload failure and retry posting to temp zone', async () => {
    const interrogation: LocalInterrogation = {
      id: '1',
      questionnaireId: 'q1',
      data: { COLLECTED: {} },
      stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      hasBeenUpdated: true,
    }

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([
      interrogation,
    ])
    vi.mocked(mockQueenApi.putInterrogation).mockRejectedValue({
      response: { status: 400 },
    })
    vi.mocked(mockQueenApi.postInterrogationInTemp).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockQueenApi.postInterrogationInTemp).toHaveBeenCalledWith(
      interrogationFromLocalInterrogation(interrogation),
    )
    expect(
      mockLocalSyncStorage.addIdToInterrogationsInTempZone,
    ).toHaveBeenCalledWith(interrogation.id)
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should treat 423 response for interrogation as a success', async () => {
    const interrogation: LocalInterrogation = {
      id: '1',
      questionnaireId: 'q1',
      data: { COLLECTED: {} },
      stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      hasBeenUpdated: true,
    }

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([
      interrogation,
    ])
    vi.mocked(mockQueenApi.putInterrogation).mockRejectedValue({
      response: { status: 423 },
    })

    vi.mocked(mockQueenApi.postInterrogationInTemp).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.updateInterrogation).mockResolvedValue('1')

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    // Expect it to continue as if it were a success
    expect(mockQueenApi.postInterrogationInTemp).not.toHaveBeenCalled()
    expect(mockDataStore.updateInterrogation).toHaveBeenCalledWith({
      ...interrogation,
      hasBeenUpdated: false,
    })
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

    await expect(() =>
      thunks.upload()(mockDispatch, mockGetState, mockContext as any),
    ).rejects.toThrowError()

    expect(mockLocalSyncStorage.addError).toHaveBeenCalledWith(true)
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadError())
  })

  it('should delete paradata without sending it when interrogation upload fails', async () => {
    const interrogation: LocalInterrogation = {
      id: '1',
      questionnaireId: 'q1',
      data: { COLLECTED: {} },
      stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      hasBeenUpdated: true,
    }
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
    ])
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
      interrogationFromLocalInterrogation(interrogation),
    )
    // The paradata for this interrogation should be deleted
    expect(mockDataStore.deleteParadata).toHaveBeenCalledWith(interrogation.id)

    // The paradata for this interrogation should not have been sent
    expect(mockQueenApi.postParadata).not.toHaveBeenCalled()

    // Upload completion dispatched
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should upload all paradata successfully', async () => {
    // override global mock value for enable telemetry
    vi.doMock('@/core/constants', () => ({
      IS_TELEMETRY_ENABLED: true,
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    // Re-import after mocking
    const { thunks } = await import('./thunks')
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
    // override global mock value for enable telemetry
    vi.doMock('@/core/constants', () => ({
      IS_TELEMETRY_ENABLED: true,
      LUNATIC_MODEL_VERSION_BREAKING: '2.2.10',
    }))
    // Re-import after mocking
    const { thunks } = await import('./thunks')
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
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([])

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockQueenApi.postParadata).not.toHaveBeenCalled()
    expect(mockDataStore.deleteParadata).not.toHaveBeenCalled()

    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })
})

describe('cleanupInterrogations thunk', () => {
  // Base test data to avoid duplication
  const baseInterrogations = [
    {
      id: 'interro1',
      questionnaireId: 'q1',
      data: {},
    },
    {
      id: 'interro2',
      questionnaireId: 'q2',
      data: {},
    },
  ]

  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should delete differential interrogations', async () => {
    // GIVEN: local storage contains interro1 and interro2, database contains interro1, interro2, and interro3 (orphan)
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1', 'interro2']),
    )

    const allInterrogations = [
      {
        id: 'interro1',
        questionnaireId: 'q1',
        data: {},
      },
      {
        id: 'interro2',
        questionnaireId: 'q2',
        data: {},
      },
      {
        id: 'interro3',
        questionnaireId: 'q3',
        data: {},
      }, // This should be deleted as it's not in local storage
    ]

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue(
      allInterrogations,
    )
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    // Re-import after mocking
    const { thunks } = await import('./thunks')

    // WHEN: cleanupInterrogations is called
    await thunks.cleanupInterrogations()(
      mockDispatch,
      mockGetState,
      mockContext as any,
    )

    // THEN: deleteInterrogation should be called only for the orphan interrogation (interro3)
    expect(mockDataStore.deleteInterrogation).toHaveBeenCalledTimes(1)
    expect(mockDataStore.deleteInterrogation).toHaveBeenCalledWith('interro3')

    // AND: deleteInterrogation should NOT be called for interrogations that are in local storage
    expect(mockDataStore.deleteInterrogation).not.toHaveBeenCalledWith(
      'interro1',
    )
    expect(mockDataStore.deleteInterrogation).not.toHaveBeenCalledWith(
      'interro2',
    )
  })

  it('should do nothing when no interrogations to delete', async () => {
    // GIVEN: local storage and database contain the same interrogations
    const allInterrogations = [...baseInterrogations] // Use base interrogations

    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(allInterrogations.map((i) => i.id)),
    )

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue(
      allInterrogations,
    )
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    // Re-import after mocking
    const { thunks } = await import('./thunks')

    // WHEN: cleanupInterrogations is called
    await thunks.cleanupInterrogations()(
      mockDispatch,
      mockGetState,
      mockContext as any,
    )

    // THEN: deleteInterrogation should NOT be called at all
    expect(mockDataStore.deleteInterrogation).not.toHaveBeenCalled()
  })

  it('should handle empty local storage', async () => {
    // GIVEN: local storage is empty (no SYNCHRONIZATION_INTERROGATION_IDS key)
    // Database contains some interrogations
    const allInterrogations = [...baseInterrogations]

    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue(
      allInterrogations,
    )
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    // Re-import after mocking
    const { thunks } = await import('./thunks')

    // WHEN: cleanupInterrogations is called
    await thunks.cleanupInterrogations()(
      mockDispatch,
      mockGetState,
      mockContext as any,
    )

    // THEN: deleteInterrogation should NOT be called at all
    expect(mockDataStore.deleteInterrogation).not.toHaveBeenCalled()
  })

  it('should handle empty database', async () => {
    // GIVEN: local storage contains interrogation IDs
    // Database is empty
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1', 'interro2']),
    )

    // Mock empty database
    vi.mocked(mockDataStore.getAllInterrogations).mockResolvedValue([])
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    // Re-import after mocking
    const { thunks } = await import('./thunks')

    // WHEN: cleanupInterrogations is called
    await thunks.cleanupInterrogations()(
      mockDispatch,
      mockGetState,
      mockContext as any,
    )

    // THEN: deleteInterrogation should NOT be called at all
    expect(mockDataStore.deleteInterrogation).not.toHaveBeenCalled()
  })

  it('should handle errors during cleanup', async () => {
    // GIVEN: local storage contains interrogation IDs
    localStorage.setItem(
      'SYNCHRONIZATION_INTERROGATION_IDS',
      JSON.stringify(['interro1', 'interro2']),
    )

    // Mock database error
    vi.mocked(mockDataStore.getAllInterrogations).mockRejectedValue(
      new Error('Database error'),
    )
    vi.mocked(mockDataStore.deleteInterrogation).mockResolvedValue(undefined)

    // Re-import after mocking
    const { thunks } = await import('./thunks')

    // WHEN: cleanupInterrogations is called
    // THEN: it should throw an error
    await expect(() =>
      thunks.cleanupInterrogations()(
        mockDispatch,
        mockGetState,
        mockContext as any,
      ),
    ).rejects.toThrowError('Database error')
  })
})
