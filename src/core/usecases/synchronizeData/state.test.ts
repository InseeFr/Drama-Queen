import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type State, actions, reducer } from './state'

describe('Reducer tests', () => {
  describe('runningDownload', () => {
    beforeEach(() => {
      vi.resetModules()
      vi.restoreAllMocks()
    })

    it('sets initial state for download if there is an external resources url', () => {
      const initialState: State.NotRunning = { stateDescription: 'not running' }
      const newState = reducer(initialState, actions.runningDownload())

      expect(newState).toEqual({
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: Infinity,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      })
    })

    it('sets initial state for download if there is no external resources url', async () => {
      // override global mock value of external resources url
      vi.doMock('@/core/constants', () => ({
        EXTERNAL_RESOURCES_URL: '',
      }))
      // Re-import after mocking
      const { reducer, actions } = await import('./state')

      const initialState: State.NotRunning = { stateDescription: 'not running' }
      const newState = reducer(initialState, actions.runningDownload())

      expect(newState).toEqual({
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: Infinity,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: undefined,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: undefined,
        externalResourcesCompleted: 0,
      })
    })
  })

  describe('runningUpload', () => {
    it('sets initial state for upload', () => {
      const initialState: State.NotRunning = { stateDescription: 'not running' }
      const newState = reducer(initialState, actions.runningUpload())

      expect(newState).toEqual({
        stateDescription: 'running',
        type: 'upload',
        total: Infinity,
        surveyUnitCompleted: 0,
      })
    })
  })

  describe('updateDownloadTotalSurveyUnit', () => {
    it('updates totalSurveyUnit correctly if totalSurveyUnit was Infinity', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: Infinity,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.updateDownloadTotalSurveyUnit({ totalSurveyUnit: 100 }),
      )

      expect(newState).toEqual({
        ...initialState,
        totalSurveyUnit: 100,
      })
    })

    it('adds to totalSurveyUnit correctly if totalSurveyUnit was not Infinity', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 50,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.updateDownloadTotalSurveyUnit({ totalSurveyUnit: 30 }),
      )

      expect(newState).toEqual({
        ...initialState,
        totalSurveyUnit: initialState.totalSurveyUnit + 30,
      })
    })
  })

  describe('downloadSurveyUnitCompleted', () => {
    it('increments surveyUnitCompleted correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.downloadSurveyUnitCompleted(),
      )

      expect(newState).toEqual({
        ...initialState,
        surveyUnitCompleted: initialState.surveyUnitCompleted + 1,
      })
    })
  })

  describe('setDownloadTotalSurvey', () => {
    it('sets totalSurvey correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: 0,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.setDownloadTotalSurvey({ totalSurvey: 30 }),
      )

      expect(newState).toEqual({
        ...initialState,
        totalSurvey: 30,
      })
    })
  })

  describe('downloadSurveyCompleted', () => {
    it('increments surveyCompleted correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(initialState, actions.downloadSurveyCompleted())

      expect(newState).toEqual({
        ...initialState,
        surveyCompleted: initialState.surveyCompleted + 1,
      })
    })
  })

  describe('setDownloadTotalNomenclature', () => {
    it('sets totalNomenclature correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: 0,
        nomenclatureCompleted: 0,
        totalSurvey: 50,
        surveyCompleted: 10,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.setDownloadTotalNomenclature({ totalNomenclature: 30 }),
      )

      expect(newState).toEqual({
        ...initialState,
        totalNomenclature: 30,
      })
    })
  })

  describe('downloadNomenclatureCompleted', () => {
    it('increments nomenclatureCompleted correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: 100,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.downloadNomenclatureCompleted(),
      )

      expect(newState).toEqual({
        ...initialState,
        nomenclatureCompleted: initialState.nomenclatureCompleted + 1,
      })
    })
  })

  describe('setDownloadTotalExternalResources', () => {
    it('sets totalExternalResources correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: 0,
        nomenclatureCompleted: 0,
        totalSurvey: 50,
        surveyCompleted: 10,
        totalExternalResourcesByQuestionnaire: 100,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: 100,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.setDownloadTotalExternalResources({
          totalExternalResources: 30,
        }),
      )

      expect(newState).toEqual({
        ...initialState,
        totalExternalResources: 30,
      })
    })
  })

  describe('setDownloadExternalResourcesCompleted', () => {
    it('sets externalResourcesCompleted correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: 0,
        nomenclatureCompleted: 0,
        totalSurvey: 50,
        surveyCompleted: 10,
        totalExternalResourcesByQuestionnaire: 100,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: 100,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.setDownloadExternalResourcesCompleted(),
      )

      expect(newState).toEqual({
        ...initialState,
        externalResourcesCompleted: initialState.externalResourcesCompleted + 1,
      })
    })
  })

  describe('setDownloadTotalExternalResourcesByQuestionnaire', () => {
    it('sets totalExternalResourcesByQuestionnaire correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: 0,
        nomenclatureCompleted: 0,
        totalSurvey: 50,
        surveyCompleted: 10,
        totalExternalResourcesByQuestionnaire: 0,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: 100,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.setDownloadTotalExternalResourcesByQuestionnaire({
          totalExternalResourcesByQuestionnaire: 30,
        }),
      )

      expect(newState).toEqual({
        ...initialState,
        totalExternalResourcesByQuestionnaire: 30,
      })
    })
  })

  describe('downloadExternalResourceByQuestionnaireCompleted', () => {
    it('increments externalResourcesByQuestionnaireCompleted correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: 100,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.downloadExternalResourceByQuestionnaireCompleted(),
      )

      expect(newState).toEqual({
        ...initialState,
        externalResourcesByQuestionnaireCompleted:
          initialState.externalResourcesByQuestionnaireCompleted + 1,
      })
    })
  })

  describe('downloadExternalResourceReset', () => {
    it('reset externalResourcesByQuestionnaireCompleted to 0 correctly', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: 100,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 30,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(
        initialState,
        actions.downloadExternalResourceReset(),
      )

      expect(newState).toEqual({
        ...initialState,
        externalResourcesByQuestionnaireCompleted: 0,
      })
    })
  })

  describe('setUploadTotal', () => {
    it('sets total correctly', () => {
      const initialState: State.Running.Uploading = {
        stateDescription: 'running',
        type: 'upload',
        surveyUnitCompleted: 0,
        total: 0,
      }

      const newState = reducer(
        initialState,
        actions.setUploadTotal({
          total: 30,
        }),
      )

      expect(newState).toEqual({
        ...initialState,
        total: 30,
      })
    })
  })

  describe('uploadSurveyUnitCompleted', () => {
    it('increments surveyUnitCompleted correctly', () => {
      const initialState: State.Running.Uploading = {
        stateDescription: 'running',
        type: 'upload',
        surveyUnitCompleted: 0,
        total: 0,
      }

      const newState = reducer(
        initialState,
        actions.uploadSurveyUnitCompleted(),
      )

      expect(newState).toEqual({
        ...initialState,
        surveyUnitCompleted: initialState.surveyUnitCompleted + 1,
      })
    })
  })

  describe('uploadError', () => {
    it('returns state with only stateDescription as "not running"', () => {
      const initialState: State.Running.Uploading = {
        stateDescription: 'running',
        type: 'upload',
        surveyUnitCompleted: 0,
        total: 0,
      }

      const newState = reducer(initialState, actions.uploadError())

      expect(newState).toEqual({ stateDescription: 'not running' })
    })
  })

  describe('uploadCompleted', () => {
    it('returns state with only stateDescription as "not running"', () => {
      const initialState: State.Running.Uploading = {
        stateDescription: 'running',
        type: 'upload',
        surveyUnitCompleted: 0,
        total: 0,
      }

      const newState = reducer(initialState, actions.uploadCompleted())

      expect(newState).toEqual({ stateDescription: 'not running' })
    })
  })

  describe('downloadCompleted', () => {
    it('does not modify the state', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(initialState, actions.downloadCompleted())

      expect(newState).toBe(initialState)
    })
  })

  describe('downloadFailed', () => {
    it('returns state with only stateDescription as "not running"', () => {
      const initialState: State.Running.Downloading = {
        stateDescription: 'running',
        type: 'download',
        totalSurveyUnit: 100,
        surveyUnitCompleted: 0,
        totalNomenclature: Infinity,
        nomenclatureCompleted: 0,
        totalSurvey: Infinity,
        surveyCompleted: 0,
        totalExternalResourcesByQuestionnaire: Infinity,
        externalResourcesByQuestionnaireCompleted: 0,
        totalExternalResources: Infinity,
        externalResourcesCompleted: 0,
      }

      const newState = reducer(initialState, actions.downloadFailed())

      expect(newState).toEqual({ stateDescription: 'not running' })
    })
  })
})
