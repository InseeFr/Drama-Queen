import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import SkipNext from '@mui/icons-material/SkipNext'
import { SHORTCUT_FAST_FORWARD, SHORTCUT_NEXT } from 'ui/constants'
import type { GoNextPage, GoPreviousPage, GoToPage } from '../lunaticType'
import { getTranslation } from 'i18n'
import type { PageTag } from 'core/model'

const { t } = getTranslation('navigationMessage')

type ContinueAction =
  | 'continue'
  | 'fastForward'
  | 'quit'
  | 'saveAndQuit'
  | undefined

type UseNavigationButtonsProps = {
  readonly: boolean
  lastReachedPage: PageTag | undefined
  isFirstPage: boolean
  isLastPage: boolean
  isLastReachedPage: boolean
  hasPageResponse: () => boolean
  goPreviousPage: GoPreviousPage
  goNextPage: GoNextPage
  goToPage: GoToPage
  quit: () => void
  definitiveQuit: () => void
}

export function useNavigationButtons({
  readonly,
  lastReachedPage,
  isFirstPage,
  isLastPage,
  isLastReachedPage,
  hasPageResponse,
  goPreviousPage,
  goNextPage,
  goToPage,
  quit,
  definitiveQuit,
}: UseNavigationButtonsProps) {
  const continueAction = (() => {
    if (readonly) {
      return isLastPage ? 'quit' : undefined
    }
    if (isLastPage) {
      return 'saveAndQuit'
    }
    if (hasPageResponse()) {
      return isLastReachedPage ? 'continue' : 'fastForward'
    }
    return undefined
  })()

  const isContinueVisible = continueAction !== undefined

  const onContinue = () => {
    switch (continueAction) {
      case 'quit':
        return quit()
      case 'saveAndQuit':
        return definitiveQuit()
      case 'fastForward':
        return goToPage({ page: lastReachedPage || '1' })
      default:
        return goNextPage()
    }
  }

  const continueShortCutKey =
    continueAction === 'fastForward' ? SHORTCUT_FAST_FORWARD : SHORTCUT_NEXT

  const continueShortCutLabel =
    continueAction === 'fastForward' ? 'alt + fin' : 'alt + ENTRÉE'

  const isPreviousEnabled = !isFirstPage

  const isNextEnabled =
    ((!isLastReachedPage && hasPageResponse()) || readonly) && !isLastPage

  return {
    continueProps: {
      label: getLabelFromAction(continueAction),
      isVisible: isContinueVisible,
      endIcon: getEndIcon(continueAction),
      shortCutKey: continueShortCutKey,
      shortCutLabel: continueShortCutLabel,
      onContinue,
    },
    previousProps: { isPreviousEnabled, onPrevious: goPreviousPage },
    nextProps: { isNextEnabled, onNext: goNextPage },
  }
}

function getLabelFromAction(action: ContinueAction): string {
  switch (action) {
    case 'quit':
      return t('quit')
    case 'saveAndQuit':
      return t('validateAndQuit')
    case 'fastForward':
      return t('fastForward')
    default:
      return t('continue')
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
