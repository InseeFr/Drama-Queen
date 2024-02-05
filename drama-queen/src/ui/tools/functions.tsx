import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import SkipNext from '@mui/icons-material/SkipNext'
import { useLunatic } from '@inseefr/lunatic'

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
