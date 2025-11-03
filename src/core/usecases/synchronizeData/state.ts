import { createUsecaseActions } from 'redux-clean-architecture'
import { assert } from 'tsafe/assert'
import { id } from 'tsafe/id'

import { EXTERNAL_RESOURCES_URL, IS_TELEMETRY_ENABLED } from '@/core/constants'

export type State = State.NotRunning | State.Running

export namespace State {
  export type NotRunning = {
    stateDescription: 'not running'
  }

  export type Running = Running.Uploading | Running.Downloading

  export namespace Running {
    type Common = {
      stateDescription: 'running'
    }

    export type Uploading = Common & {
      type: 'upload'
      totalInterrogation: number
      interrogationCompleted: number
      totalParadata?: number
      paradataCompleted: number
    }

    export type Downloading = Common & {
      type: 'download'
      totalInterrogation: number
      interrogationCompleted: number
      totalNomenclature: number
      nomenclatureCompleted: number
      totalSurvey: number
      surveyCompleted: number
      totalExternalResourcesByQuestionnaire?: number
      externalResourcesByQuestionnaireCompleted: number
      totalExternalResources?: number
      externalResourcesCompleted: number
    }
  }
}
export const name = 'synchronizeData'

export const { reducer, actions } = createUsecaseActions({
  name,
  initialState: id<State>(
    id<State.NotRunning>({
      stateDescription: 'not running',
    }),
  ),
  reducers: {
    runningDownload: () =>
      id<State>(
        id<State.Running>({
          stateDescription: 'running',
          type: 'download',
          totalInterrogation: Infinity,
          interrogationCompleted: 0,
          totalNomenclature: Infinity,
          nomenclatureCompleted: 0,
          totalSurvey: Infinity,
          surveyCompleted: 0,
          // for total external resources, we make difference for displaying progress bar between :
          // 0 : external synchro is triggered but there is no needed questionnaire so we want a fullfilled progress bar
          // undefined : external synchro is not triggered so we don't want the progress bar
          totalExternalResourcesByQuestionnaire: EXTERNAL_RESOURCES_URL
            ? Infinity
            : undefined,
          externalResourcesByQuestionnaireCompleted: 0,
          totalExternalResources: EXTERNAL_RESOURCES_URL ? Infinity : undefined,
          externalResourcesCompleted: 0,
        }),
      ),
    runningUpload: () =>
      id<State>(
        id<State.Running>({
          stateDescription: 'running',
          type: 'upload',
          totalInterrogation: Infinity,
          interrogationCompleted: 0,
          totalParadata: IS_TELEMETRY_ENABLED ? Infinity : undefined,
          paradataCompleted: 0,
        }),
      ),
    updateDownloadTotalInterrogation: (
      state,
      { payload }: { payload: { totalInterrogation: number } },
    ) => {
      const { totalInterrogation } = payload
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        totalInterrogation:
          state.totalInterrogation === Infinity
            ? totalInterrogation
            : state.totalInterrogation + totalInterrogation,
      }
    },
    downloadInterrogationCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        interrogationCompleted: state.interrogationCompleted + 1,
      }
    },
    setDownloadTotalSurvey: (
      state,
      { payload }: { payload: { totalSurvey: number } },
    ) => {
      const { totalSurvey } = payload
      assert(state.stateDescription === 'running' && state.type === 'download')
      return { ...state, totalSurvey }
    },
    downloadSurveyCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        surveyCompleted: state.surveyCompleted + 1,
      }
    },
    setDownloadTotalNomenclature: (
      state,
      { payload }: { payload: { totalNomenclature: number } },
    ) => {
      const { totalNomenclature } = payload
      assert(state.stateDescription === 'running' && state.type === 'download')
      return { ...state, totalNomenclature }
    },
    downloadNomenclatureCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        nomenclatureCompleted: state.nomenclatureCompleted + 1,
      }
    },
    setDownloadTotalExternalResources: (
      state,
      { payload }: { payload: { totalExternalResources: number } },
    ) => {
      const { totalExternalResources } = payload
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        totalExternalResources,
      }
    },
    setDownloadExternalResourcesCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        externalResourcesCompleted: state.externalResourcesCompleted + 1,
      }
    },
    setDownloadTotalExternalResourcesByQuestionnaire: (
      state,
      {
        payload,
      }: { payload: { totalExternalResourcesByQuestionnaire: number } },
    ) => {
      const { totalExternalResourcesByQuestionnaire } = payload
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        totalExternalResourcesByQuestionnaire,
      }
    },
    downloadExternalResourceByQuestionnaireCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        externalResourcesByQuestionnaireCompleted:
          state.externalResourcesByQuestionnaireCompleted + 1,
      }
    },
    downloadExternalResourceReset: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        externalResourcesByQuestionnaireCompleted: 0,
      }
    },
    setUploadTotalInterrogation: (
      state,
      { payload }: { payload: { totalInterrogation: number } },
    ) => {
      const { totalInterrogation } = payload
      assert(state.stateDescription === 'running' && state.type === 'upload')
      return { ...state, totalInterrogation }
    },
    uploadInterrogationCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'upload')
      return {
        ...state,
        interrogationCompleted: state.interrogationCompleted + 1,
      }
    },
    setUploadTotalParadata: (
      state,
      { payload }: { payload: { totalParadata: number } },
    ) => {
      const { totalParadata } = payload
      assert(state.stateDescription === 'running' && state.type === 'upload')
      return { ...state, totalParadata }
    },
    uploadParadataCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'upload')
      return {
        ...state,
        paradataCompleted: state.paradataCompleted + 1,
      }
    },
    uploadError: (_state) => {
      return { stateDescription: 'not running' }
    },
    uploadCompleted: (_state) => {
      return { stateDescription: 'not running' }
    },
    downloadCompleted: (state) => {
      return state
    },
    downloadFailed: (_state) => {
      return { stateDescription: 'not running' }
    },
  },
})
