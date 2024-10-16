import type { PageTag, SurveyUnit } from 'core/model'
import type { Component, Components } from '../lunaticType'
import type { LunaticData } from '@inseefr/lunatic'

const externalResourcesUrl = import.meta.env.VITE_EXTERNAL_RESOURCES_URL

/**
 * temporary : should be handle by Lunatic
 */
function countMissingResponseInComponent(component: Component): number {
  let factor = 1
  // When we are Loop (not paginated), we have to compute the total of component repetition
  if (
    'iterations' in component &&
    ('paginatedLoop'! in component ||
      ('paginatedLoop' in component && !component.paginatedLoop))
  ) {
    factor = component.iterations as number
  }
  if ('components' in component && Array.isArray(component.components)) {
    const components = component.components
    return (
      factor *
      components.reduce((total, subComponent: any) => {
        return total + countMissingResponseInComponent(subComponent)
      }, 0)
    )
  }
  return 'missingResponse' in component && component?.missingResponse?.name
    ? 1
    : 0
}

/**
 * temporary : should be handle by Lunatic
 */
export function countMissingResponseInPage(components: Components) {
  return components.reduce((total, component) => {
    if (component.componentType === 'Loop') {
      component.paginatedLoop
    }
    return total + countMissingResponseInComponent(component)
  }, 0)
}

// check if the first subPage of an iteration is before lastReachedPage
export function isIterationReachable(
  currentPage: number,
  lastReachedPage: PageTag,
  iteration: number
) {
  const maxPage = parseInt(lastReachedPage.split('.')[0])
  const maxIteration = parseInt(lastReachedPage.split('#')[1]) - 1
  if (currentPage < maxPage) {
    // no need to check iteration or subPage because we already reached the next page (out of the loop)
    return true
  }
  // currentPage = maxPage , so we check if we already reached the iteration
  if (iteration <= maxIteration) {
    // no need to check subPage beacause we just want to reach the first subPage of the iteration
    return true
  }
  return false
}

export function downloadAsJson(params: { data: object; filename?: string }) {
  const { data, filename = 'data.json' } = params
  if (!data) {
    console.error('No data to download.')
    return
  }
  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename

  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function getinitialSurveyUnit(
  partial?: Partial<SurveyUnit>
): SurveyUnit {
  return {
    id: partial?.id ?? '',
    questionnaireId: partial?.questionnaireId ?? '',
    personalization: partial?.personalization,
    data: partial?.data ?? {},
    comment: partial?.comment,
    stateData: partial?.stateData ?? {
      state: null,
      date: new Date().getTime(),
      currentPage: '1',
    },
  }
}

export function getInitialData(surveyUnit: SurveyUnit): LunaticData {
  const initialData = surveyUnit.data
  if (!externalResourcesUrl) return initialData
  return {
    ...initialData,
    EXTERNAL: {
      ...initialData.EXTERNAL,
      GLOBAL_QUESTIONNAIRE_ID: surveyUnit.questionnaireId,
      GLOBAL_SURVEY_UNIT_ID: surveyUnit.id,
    },
  }
}
