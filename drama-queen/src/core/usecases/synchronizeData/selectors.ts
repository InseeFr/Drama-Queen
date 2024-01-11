import type { State as RootState } from 'core/bootstrap'
import { createSelector } from 'redux-clean-architecture'
import { name } from './state'
import { assert } from 'tsafe/assert'

const state = (rootState: RootState) => rootState[name]

const downloadingState = createSelector(state, (state) => {
  if (state.stateDescription !== 'running') {
    return undefined
  }

  if (state.type !== 'download') {
    return undefined
  }

  return state
})

const surveyUnitProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined
  }
  if (state.surveyUnitCompleted === 0 && state.totalSurveyUnit === 0) return 100
  return (state.surveyUnitCompleted * 100) / state.totalSurveyUnit
})
const nomenclatureProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined
  }
  if (state.nomenclatureCompleted === 0 && state.totalNomenclature === 0)
    return 100
  return (state.nomenclatureCompleted * 100) / state.totalNomenclature
})
const surveyProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined
  }
  if (state.surveyCompleted === 0 && state.totalSurvey === 0) return 100
  return (state.surveyCompleted * 100) / state.totalSurvey
})

const uploadProgress = createSelector(state, (state) => {
  if (state.stateDescription !== 'running') {
    return undefined
  }

  if (state.type !== 'upload') {
    return undefined
  }

  if (state.total === 0 && state.surveyUnitCompleted === 0) return 100
  return (state.surveyUnitCompleted * 100) / state.total
})

const main = createSelector(
  state,
  surveyUnitProgress,
  nomenclatureProgress,
  surveyProgress,
  uploadProgress,
  (
    state,
    surveyUnitProgress,
    nomenclatureProgress,
    surveyProgress,
    uploadProgress
  ) => {
    switch (state.stateDescription) {
      case 'not running':
        return { hideProgress: true as const }
      case 'running':
        switch (state.type) {
          case 'upload':
            assert(uploadProgress !== undefined)
            return {
              isUploading: true as const,
              uploadProgress,
            }
          case 'download':
            assert(surveyUnitProgress !== undefined)
            assert(nomenclatureProgress !== undefined)
            assert(surveyProgress !== undefined)
            return {
              isDownloading: true,
              surveyUnitProgress,
              nomenclatureProgress,
              surveyProgress,
            }
        }
    }
  }
)

export const selectors = {
  main,
}
