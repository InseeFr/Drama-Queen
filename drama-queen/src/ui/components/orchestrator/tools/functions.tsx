import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import SkipNext from '@mui/icons-material/SkipNext'
import { useLunatic } from '@inseefr/lunatic'
import type { SurveyUnit } from 'core/model'

type Components = ReturnType<ReturnType<typeof useLunatic>['getComponents']>
type Component = Extract<Components[number], object>

export function getIsLastReachedPage(
  pageTag: string,
  lastReachedPage: string | undefined
) {
  if (lastReachedPage === undefined) {
    return true
  }
  return pageTag === lastReachedPage
}

export function getContinueBehavior(
  readonly: boolean,
  isLastPage: boolean,
  isLastReachedPage: boolean,
  hasPageResponse: () => boolean
) {
  if (readonly) {
    return isLastPage ? 'quit' : undefined
  }
  if (isLastPage) {
    return 'saveAndQuit'
  }
  if (!isLastReachedPage) {
    return 'fastForward'
  }
  if (hasPageResponse()) {
    return 'continue'
  }
}

export function getIsDisplayedContinue(
  continueBehavior: ReturnType<typeof getContinueBehavior>
) {
  return continueBehavior !== undefined
}

export function getContinueGoToPage(
  continueBehavior: ReturnType<typeof getContinueBehavior>,
  lastReachedPage: string | undefined,
  goNextPage: (payload?: {} | undefined) => void,
  goToPage: (page: {
    page: string
    iteration?: number | undefined
    nbIterations?: number | undefined
    subPage?: number | undefined
  }) => void,
  quit: () => void,
  definitiveQuit: () => void
) {
  switch (continueBehavior) {
    case 'quit':
      quit()
      break
    case 'saveAndQuit':
      definitiveQuit()
      break
    case 'fastForward':
      goToPage({ page: lastReachedPage || '' })
      break
    default:
      goNextPage()
  }
}

export function getContinueLabel(
  continueBehavior: ReturnType<typeof getContinueBehavior>
) {
  switch (continueBehavior) {
    case 'quit':
      return 'quitter'
    case 'saveAndQuit':
      return 'valider et quitter'
    case 'fastForward':
      return "suite de l'entretien"
    default:
      return 'continuer'
  }
}

export function getContinueEndIcon(
  continueBehavior: ReturnType<typeof getContinueBehavior>
) {
  if (continueBehavior === 'continue') {
    return <ArrowRightAltIcon />
  }
  if (continueBehavior === 'fastForward') {
    return <SkipNext fontSize="large" />
  }
}

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

export function getUpdatedSurveyUnit(
  surveyUnit: SurveyUnit,
  newData?: SurveyUnit['data'],
  newStateData?: SurveyUnit['stateData']
) {
  const updatedData = newData ?? surveyUnit.data
  const updatedStateData = newStateData ?? surveyUnit.stateData
  const updatedSurveyUnit = {
    ...surveyUnit,
    data: updatedData,
    stateData: updatedStateData,
  }
  return updatedSurveyUnit
}
