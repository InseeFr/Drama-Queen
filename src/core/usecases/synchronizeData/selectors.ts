import { createSelector } from 'redux-clean-architecture'

import type { State as RootState } from '@/core/bootstrap'
import i18n from '@/libs/i18n'

import { type State, name } from './state'

const state = (rootState: RootState) => rootState[name]

const computeProgress = (count: number, total: number) => {
  if (count === 0 && total === 0) return 100
  return (count * 100) / total
}

type ProgressBar = { progress: number; label: string; count?: string }

const progressBars = createSelector(state, (state: State) => {
  const bars = [] as ProgressBar[]

  if (state.stateDescription !== 'running') {
    return []
  }

  if (state.type !== 'upload' && state.type !== 'download') {
    return []
  }

  // Uploading progress bars
  if (state.type === 'upload') {
    bars.push({
      progress: computeProgress(
        state.interrogationCompleted,
        state.totalInterrogation,
      ),
      label: i18n.t('synchronize.interrogationsProgress'),
    })
    if (state.totalParadata !== undefined) {
      bars.push({
        progress: computeProgress(state.paradataCompleted, state.totalParadata),
        label: i18n.t('synchronize.paradataProgress'),
      })
    }
    return bars
  }

  // Downloading bars
  bars.push(
    ...[
      {
        progress: computeProgress(state.surveyCompleted, state.totalSurvey),
        label: i18n.t('synchronize.questionnairesProgress'),
      },
      {
        progress: computeProgress(
          state.nomenclatureCompleted,
          state.totalNomenclature,
        ),
        label: i18n.t('synchronize.nomenclaturesProgress'),
      },
      {
        progress: computeProgress(
          state.interrogationCompleted,
          state.totalInterrogation,
        ),
        label: i18n.t('synchronize.interrogationsProgress'),
      },
    ],
  )
  if (state.totalExternalResources !== undefined) {
    bars.push({
      progress: computeProgress(
        state.externalResourcesCompleted,
        state.totalExternalResources,
      ),
      label: i18n.t('synchronize.externalResourcesProgress'),
      count: Number.isFinite(state.totalExternalResources)
        ? `${state.externalResourcesCompleted} / ${state.totalExternalResources}`
        : undefined,
    })
  }
  return bars
})

const stepTitle = createSelector(state, (state: State) => {
  if (state.stateDescription !== 'running') {
    return ''
  }
  switch (state.type) {
    case 'upload':
      return i18n.t('synchronize.uploadingData')
    case 'download':
      return i18n.t('synchronize.downloadingData')
    default:
      return ''
  }
})

export const selectors = {
  progressBars,
  stepTitle,
}
