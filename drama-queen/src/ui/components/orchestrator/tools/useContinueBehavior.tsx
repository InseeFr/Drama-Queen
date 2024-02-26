import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import SkipNext from '@mui/icons-material/SkipNext'
import { SHORTCUT_FAST_FORWARD, SHORTCUT_NEXT } from 'ui/constants'
import type { GoToPage } from '../lunaticType'

type ContinueAction =
  | 'continue'
  | 'fastForward'
  | 'quit'
  | 'saveAndQuit'
  | undefined

type UseContinueBehaviorProps = {
  readonly: boolean
  lastReachedPage: string | undefined
  isLastPage: boolean
  isLastReachedPage: boolean
  hasPageResponse: () => boolean
  goNextPage: (payload?: {} | undefined) => void
  goToPage: GoToPage
  quit: () => void
  definitiveQuit: () => void
}

export function useContinueBehavior({
  readonly,
  lastReachedPage,
  isLastPage,
  isLastReachedPage,
  hasPageResponse,
  goNextPage,
  goToPage,
  quit,
  definitiveQuit,
}: UseContinueBehaviorProps) {
  const continueAction = (() => {
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
    return undefined
  })()

  const isVisible = continueAction !== undefined

  const onContinue = () => {
    switch (continueAction) {
      case 'quit':
        return quit()
      case 'saveAndQuit':
        return definitiveQuit()
      case 'fastForward':
        return goToPage({ page: lastReachedPage || '' })
      default:
        return goNextPage()
    }
  }

  const shortCutKey =
    continueAction === 'fastForward' ? SHORTCUT_FAST_FORWARD : SHORTCUT_NEXT

  const shortCutLabel =
    continueAction === 'fastForward' ? 'alt + fin' : 'alt + ENTRÉE'

  return {
    label: getLabelFromAction(continueAction),
    isVisible,
    endIcon: getEndIcon(continueAction),
    shortCutKey: shortCutKey,
    shortCutLabel: shortCutLabel,
    onContinue,
  }
}

function getLabelFromAction(action: ContinueAction): string {
  switch (action) {
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

function getEndIcon(action: ContinueAction) {
  if (action === 'continue') {
    return <ArrowRightAltIcon />
  }
  if (action === 'fastForward') {
    return <SkipNext fontSize="large" />
  }
  return undefined
}
