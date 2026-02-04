import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import { SHORTCUT_NEXT } from '@/constants/shortcuts'
import i18n from '@/libs/i18n'
import type { GoPreviousPage } from '@/models/lunaticType'

type ContinueAction = 'continue' | 'quit' | 'saveAndQuit' | undefined

type UseNavigationButtonsProps = {
  isBlocking?: boolean
  readonly: boolean
  isFirstPage: boolean
  isLastPage: boolean
  isLastReachedPage: boolean
  hasPageResponse: () => boolean
  goPreviousPage: GoPreviousPage
  goNextPage: (ignoreNonMandatoryErrors?: boolean) => void
  quit: () => Promise<void>
  definitiveQuit: () => Promise<void>
}

export function computeNavigationButtonsProps({
  isBlocking = false,
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
    !isBlocking &&
    ((!isLastReachedPage && hasPageResponse()) || readonly) &&
    !isLastPage

  return {
    continueProps: {
      label: getLabelFromAction(continueAction),
      isEnabled: !isBlocking,
      isVisible: isContinueVisible,
      endIcon: getEndIcon(continueAction),
      shortCutKey: continueShortCutKey,
      shortCutLabel: continueShortCutLabel,
      onContinue,
    },
    previousProps: { isPreviousEnabled, onPrevious: goPreviousPage },
    nextProps: { isNextEnabled, onNext: () => goNextPage() },
  }
}

function getLabelFromAction(action: ContinueAction): string {
  switch (action) {
    case 'quit':
      return i18n.t('common.quit')
    case 'saveAndQuit':
      return i18n.t('navigation.validateAndQuit')
    default:
      return i18n.t('translation:navigation.continueButton.label')
  }
}

function getEndIcon(action: ContinueAction) {
  if (action === 'continue') {
    return <ArrowRightAltIcon />
  }
  return undefined
}
