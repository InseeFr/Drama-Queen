import { createSelector } from 'redux-clean-architecture'
import { assert } from 'tsafe/assert'

import type { State as RootState } from '@/core/bootstrap'

import { name } from './state'

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

const interrogationProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined
  }
  if (state.interrogationCompleted === 0 && state.totalInterrogation === 0)
    return 100
  return (state.interrogationCompleted * 100) / state.totalInterrogation
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

const externalResourcesProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined
  }
  // if there is no external resources, we don't show the progress bar
  if (state.totalExternalResourcesByQuestionnaire === undefined) {
    return undefined
  }
  if (
    state.externalResourcesByQuestionnaireCompleted === 0 &&
    state.totalExternalResourcesByQuestionnaire === 0
  )
    return 100
  return (
    (state.externalResourcesByQuestionnaireCompleted * 100) /
    state.totalExternalResourcesByQuestionnaire
  )
})

const externalResourcesProgressCount = createSelector(
  downloadingState,
  (state) => {
    if (state === undefined) {
      return undefined
    }
    // if there is no external resources, we don't show the progress bar
    if (state.totalExternalResources === undefined) {
      return undefined
    }
    if (
      state.totalExternalResources === 0 &&
      state.externalResourcesCompleted === 0
    )
      return undefined
    return {
      externalResourcesCompleted: state.externalResourcesCompleted,
      totalExternalResources: state.totalExternalResources,
    }
  },
)

const uploadingState = createSelector(state, (state) => {
  if (state.stateDescription !== 'running') {
    return undefined
  }

  if (state.type !== 'upload') {
    return undefined
  }

  return state
})

const uploadInterrogationProgress = createSelector(uploadingState, (state) => {
  if (state === undefined) {
    return undefined
  }

  if (state.totalInterrogation === 0 && state.interrogationCompleted === 0)
    return 100
  return (state.interrogationCompleted * 100) / state.totalInterrogation
})

const uploadParadataProgress = createSelector(uploadingState, (state) => {
  if (state === undefined) {
    return undefined
  }

  if (state.totalInterrogation === 0 && state.interrogationCompleted === 0)
    return 100
  return (state.interrogationCompleted * 100) / state.totalInterrogation
})

const main = createSelector(
  state,
  interrogationProgress,
  nomenclatureProgress,
  surveyProgress,
  externalResourcesProgress,
  externalResourcesProgressCount,
  uploadInterrogationProgress,
  uploadParadataProgress,
  (
    state,
    interrogationProgress,
    nomenclatureProgress,
    surveyProgress,
    externalResourcesProgress,
    externalResourcesProgressCount,
    uploadInterrogationProgress,
    uploadParadataProgress,
  ) => {
    switch (state.stateDescription) {
      case 'not running':
        return { hideProgress: true as const }
      case 'running':
        switch (state.type) {
          case 'upload':
            assert(uploadInterrogationProgress !== undefined)
            assert(uploadParadataProgress !== undefined)
            return {
              isUploading: true as const,
              uploadInterrogationProgress,
              uploadParadataProgress,
            }
          case 'download':
            assert(interrogationProgress !== undefined)
            assert(nomenclatureProgress !== undefined)
            assert(surveyProgress !== undefined)
            return {
              isDownloading: true,
              interrogationProgress,
              nomenclatureProgress,
              surveyProgress,
              externalResourcesProgress,
              externalResourcesProgressCount,
            }
        }
    }
  },
)

export const selectors = {
  main,
}
