import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import { getTranslation } from '@/i18n'
import { SHORTCUT_NEXT } from '@/ui/constants'

import type { GoNextPage, GoPreviousPage } from '../lunaticType'

const { t } = getTranslation('navigationMessage')

type ContinueAction = 'continue' | 'quit' | 'saveAndQuit' | undefined

type UseNavigationButtonsProps = {
  readonly: boolean
  isFirstPage: boolean
  isLastPage: boolean
  isLastReachedPage: boolean
  hasPageResponse: () => boolean
  goPreviousPage: GoPreviousPage
  goNextPage: GoNextPage
  quit: () => void
  definitiveQuit: () => void
}

export function computeNavigationButtonsProps({
  readonly,
  isFirstPage,
  isLastPage,
  isLastReachedPage,
  hasPageResponse,
  goPreviousPage,
  goNextPage,
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
      return 'continue'
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
      default:
        return goNextPage()
    }
  }

  const continueShortCutKey = SHORTCUT_NEXT

  const continueShortCutLabel = 'alt + ENTRÉE'

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
    default:
      return t('continue')
  }
}

function getEndIcon(action: ContinueAction) {
  if (action === 'continue') {
    return <ArrowRightAltIcon />
  }
  return undefined
}
