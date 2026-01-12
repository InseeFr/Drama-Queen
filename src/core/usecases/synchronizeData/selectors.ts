import { createSelector } from 'redux-clean-architecture'

import type { State as RootState } from '@/core/bootstrap'
import { getTranslation } from '@/i18n'

import { type State, name } from './state'

const { t } = getTranslation('synchronizeMessage')

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
      label: t('interrogationsProgress'),
    })
    if (state.totalParadata !== undefined) {
      bars.push({
        progress: computeProgress(state.paradataCompleted, state.totalParadata),
        label: t('paradataProgress'),
      })
    }
    return bars
  }

  // Downloading bars
  bars.push(
    ...[
      {
        progress: computeProgress(state.surveyCompleted, state.totalSurvey),
        label: t('questionnairesProgress'),
      },
      {
        progress: computeProgress(
          state.nomenclatureCompleted,
          state.totalNomenclature,
        ),
        label: t('nomenclaturesProgress'),
      },
      {
        progress: computeProgress(
          state.interrogationCompleted,
          state.totalInterrogation,
        ),
        label: t('interrogationsProgress'),
      },
    ],
  )
  if (state.totalExternalResources !== undefined) {
    bars.push({
      progress: computeProgress(
        state.externalResourcesCompleted,
        state.totalExternalResources,
      ),
      label: t('externalResourcesProgress'),
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
      return t('uploadingData')
    case 'download':
      return t('downloadingData')
    default:
      return ''
  }
})

export const selectors = {
  progressBars,
  stepTitle,
}
