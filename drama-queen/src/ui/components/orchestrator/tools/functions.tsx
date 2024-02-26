import { useLunatic } from '@inseefr/lunatic'
import type { SurveyUnit } from 'core/model'

type Components = ReturnType<ReturnType<typeof useLunatic>['getComponents']>
type Component = Extract<Components[number], object>

export function countMissingResponseInComponent(component: Component): number {
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
  return component?.missingResponse?.name ? 1 : 0
}

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
  currentPage: string,
  lastReachedPage: string,
  iteration: number
) {
  const numberCurrentPage = parseInt(currentPage)
  const maxPage = parseInt(lastReachedPage.split('.')[0])
  const maxIteration = parseInt(lastReachedPage.split('#')[1]) - 1
  if (numberCurrentPage < maxPage) {
    // no need to check iteration or subPage because we already reached the next page (out of the loop)
    return true
  }
  // numberCurrentPage = maxPage , so we check if we already reached the iteration
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
