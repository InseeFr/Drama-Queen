import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import SkipNext from '@mui/icons-material/SkipNext'

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
  }) => void
) {
  switch (continueBehavior) {
    // TODO : handle case for quit.
    case 'quit':
    case 'saveAndQuit':
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
