import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import SkipNext from '@mui/icons-material/SkipNext'
import { SHORTCUT_FAST_FORWARD, SHORTCUT_NEXT } from 'ui/constants'
import type { GoToPage } from '../lunaticType'

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
  const getContinueAction = () => {
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

  const continueAction = getContinueAction()

  const getIsDisplayedContinue = () => {
    return continueAction !== undefined
  }

  const getContinueLabel = () => {
    {
      switch (continueAction) {
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
  }

  const getContinueEndIcon = () => {
    if (continueAction === 'continue') {
      return <ArrowRightAltIcon />
    }
    if (continueAction === 'fastForward') {
      return <SkipNext fontSize="large" />
    }
  }

  const continueGoToPage = () => {
    switch (continueAction) {
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

  const isDisplayedContinue = getIsDisplayedContinue()
  const continueLabel = getContinueLabel()
  const continueEndIcon = getContinueEndIcon()

  const continueShortCutKey =
    continueAction === 'fastForward' ? SHORTCUT_FAST_FORWARD : SHORTCUT_NEXT

  const continueShortCutLabel =
    continueAction === 'fastForward' ? 'alt + fin' : 'alt + ENTRÉE'

  return {
    isDisplayedContinue,
    continueLabel,
    continueEndIcon,
    continueShortCutKey,
    continueShortCutLabel,
    continueGoToPage,
  }
}
