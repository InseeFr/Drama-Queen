import { createUsecaseActions } from 'redux-clean-architecture'
import { id } from 'tsafe/id'
import { assert } from 'tsafe/assert'

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
      total: number
      surveyUnitCompleted: number
    }

    export type Downloading = Common & {
      type: 'download'
      totalSurveyUnit: number
      surveyUnitCompleted: number
      totalNomenclature: number
      nomenclatureCompleted: number
      totalSurvey: number
      surveyCompleted: number
    }
  }
}
export const name = 'synchronizeData'

export const { reducer, actions } = createUsecaseActions({
  name,
  initialState: id<State>(
    id<State.NotRunning>({
      stateDescription: 'not running',
    })
  ),
  reducers: {
    runningDownload: () =>
      id<State>(
        id<State.Running>({
          stateDescription: 'running',
          type: 'download',
          totalSurveyUnit: Infinity,
          surveyUnitCompleted: 0,
          totalNomenclature: Infinity,
          nomenclatureCompleted: 0,
          totalSurvey: Infinity,
          surveyCompleted: 0,
        })
      ),
    runningUpload: () =>
      id<State>(
        id<State.Running>({
          stateDescription: 'running',
          type: 'upload',
          total: Infinity,
          surveyUnitCompleted: 0,
        })
      ),
    updateDownloadTotalSurveyUnit: (
      state,
      { payload }: { payload: { totalSurveyUnit: number } }
    ) => {
      const { totalSurveyUnit } = payload
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        totalSurveyUnit:
          state.totalSurveyUnit === Infinity
            ? totalSurveyUnit
            : state.totalSurveyUnit + totalSurveyUnit,
      }
    },
    downloadSurveyUnitCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'download')
      return {
        ...state,
        surveyUnitCompleted: state.surveyUnitCompleted + 1,
      }
    },
    setDownloadTotalSurvey: (
      state,
      { payload }: { payload: { totalSurvey: number } }
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
      { payload }: { payload: { totalNomenclature: number } }
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
    setUploadTotal: (state, { payload }: { payload: { total: number } }) => {
      const { total } = payload
      assert(state.stateDescription === 'running' && state.type === 'upload')
      return { ...state, total }
    },
    uploadSurveyUnitCompleted: (state) => {
      assert(state.stateDescription === 'running' && state.type === 'upload')
      return {
        ...state,
        surveyUnitCompleted: state.surveyUnitCompleted + 1,
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
