import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { SurveyUnit } from '@/core/model'
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
  getAllSurveyUnits: vi.fn(),
  updateSurveyUnit: vi.fn(),
  deleteSurveyUnit: vi.fn(),
} as any as DataStore

const mockQueenApi = {
  getCampaigns: vi.fn(),
  getQuestionnaire: vi.fn(),
  getSurveyUnitsIdsAndQuestionnaireIdsByCampaign: vi.fn(),
  getSurveyUnit: vi.fn(),
  putSurveyUnit: vi.fn(),
  postSurveyUnitInTemp: vi.fn(),
  getNomenclature: vi.fn(),
}

const mockLocalSyncStorage = {
  saveObject: vi.fn(),
  addIdToSurveyUnitsSuccess: vi.fn(),
  addIdToSurveyUnitsInTempZone: vi.fn(),
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

  it('should successfully download campaigns, questionnaires and survey units', async () => {
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
      mockQueenApi.getSurveyUnitsIdsAndQuestionnaireIdsByCampaign,
    ).mockResolvedValue([
      { id: 'su1', questionnaireId: 'q1' },
      { id: 'su2', questionnaireId: 'q2' },
    ])
    vi.mocked(mockQueenApi.getSurveyUnit)
      .mockResolvedValueOnce({ id: 'su1', questionnaireId: 'q1' })
      .mockResolvedValueOnce({ id: 'su2', questionnaireId: 'q2' })

    vi.mocked(mockDispatch).mockResolvedValue(undefined)
    // Mock successful updateSurveyUnit response
    vi.mocked(mockDataStore.updateSurveyUnit).mockResolvedValue('su1')
    vi.mocked(mockLocalSyncStorage.addIdToSurveyUnitsSuccess).mockResolvedValue(
      undefined,
    )
    vi.mocked(mockLocalSyncStorage.addError).mockResolvedValue(undefined)

    await thunks.download()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningDownload())
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setDownloadTotalSurvey({ totalSurvey: 2 }),
    )
    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadSurveyCompleted())
    expect(mockDispatch).toHaveBeenCalledWith(
      actions.updateDownloadTotalSurveyUnit({ totalSurveyUnit: 2 }),
    )

    // Check survey unit actions
    const downloadSurveyUnitCalls = mockDispatch.mock.calls.filter(
      ([action]) => action.type === actions.downloadSurveyUnitCompleted().type,
    )
    expect(downloadSurveyUnitCalls).toHaveLength(2)

    expect(mockDispatch).toHaveBeenCalledWith(actions.downloadCompleted())

    // Ensure the local sync storage actions were called
    expect(mockLocalSyncStorage.addIdToSurveyUnitsSuccess).toHaveBeenCalledWith(
      'su1',
    )
    expect(mockLocalSyncStorage.addIdToSurveyUnitsSuccess).toHaveBeenCalledWith(
      'su2',
    )
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
      mockQueenApi.getSurveyUnitsIdsAndQuestionnaireIdsByCampaign,
    ).mockResolvedValue([
      { id: 'su1', questionnaireId: 'q1' },
      { id: 'su2', questionnaireId: 'q2' },
    ])
    vi.mocked(mockQueenApi.getSurveyUnit)
      .mockResolvedValueOnce({ id: 'su1', questionnaireId: 'q1' })
      .mockResolvedValueOnce({ id: 'su2', questionnaireId: 'q2' })

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

  it('should handle errors during downloading survey units and resources', async () => {
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

  it('should upload survey units successfully', async () => {
    const surveyUnits = [{ id: '1' }, { id: '2' }]
    vi.mocked(mockDataStore.getAllSurveyUnits).mockResolvedValue(
      surveyUnits as SurveyUnit[],
    )
    vi.mocked(mockQueenApi.putSurveyUnit).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteSurveyUnit).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockDispatch).toHaveBeenCalledWith(actions.runningUpload())

    const uploadSurveyUnitCalls = mockDispatch.mock.calls.filter(
      ([action]) => action.type === actions.uploadSurveyUnitCompleted().type,
    )
    expect(uploadSurveyUnitCalls).toHaveLength(2)

    expect(mockDispatch).toHaveBeenCalledWith(
      actions.setUploadTotal({ total: surveyUnits.length }),
    )
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())

    /**
     * Cannot do directly expect(mockDispatch).toHaveBeenCalledWith(thunks.download())
     * since it considers it has been called with [AsyncFunction (anonymous)]
     */
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function))
    expect(mockDispatch).toHaveBeenCalledTimes(6)
  })

  it('should handle survey unit upload failure and retry posting to temp zone', async () => {
    const surveyUnit = { id: '1' }
    vi.mocked(mockDataStore.getAllSurveyUnits).mockResolvedValue([
      surveyUnit,
    ] as SurveyUnit[])
    vi.mocked(mockQueenApi.putSurveyUnit).mockRejectedValue({
      response: { status: 400 },
    })
    vi.mocked(mockQueenApi.postSurveyUnitInTemp).mockResolvedValue(undefined)
    vi.mocked(mockDataStore.deleteSurveyUnit).mockResolvedValue(undefined)

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockQueenApi.postSurveyUnitInTemp).toHaveBeenCalledWith(surveyUnit)
    expect(
      mockLocalSyncStorage.addIdToSurveyUnitsInTempZone,
    ).toHaveBeenCalledWith(surveyUnit.id)
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadCompleted())
  })

  it('should handle unexpected errors', async () => {
    vi.mocked(mockDataStore.getAllSurveyUnits).mockRejectedValue(
      new Error('Unexpected error'),
    )

    await thunks.upload()(mockDispatch, mockGetState, mockContext as any)

    expect(mockLocalSyncStorage.addError).toHaveBeenCalledWith(true)
    expect(mockDispatch).toHaveBeenCalledWith(actions.uploadError())
  })
})
