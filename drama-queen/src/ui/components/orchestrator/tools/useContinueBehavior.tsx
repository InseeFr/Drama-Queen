import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import SkipNext from '@mui/icons-material/SkipNext'
import { SHORTCUT_FAST_FORWARD, SHORTCUT_NEXT } from 'ui/constants'
import type { GoToPage } from '../lunaticType'
import { useEffect, useMemo, useState } from 'react'

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
  const [continueAction, setContinueAction] =
    useState<ContinueAction>(undefined)

  useEffect(() => {
    const calculateContinueAction = () => {
      if (readonly) {
        return setContinueAction(isLastPage ? 'quit' : undefined)
      }
      if (isLastPage) {
        return setContinueAction('saveAndQuit')
      }
      if (!isLastReachedPage) {
        return setContinueAction('fastForward')
      }
      if (hasPageResponse()) {
        return setContinueAction('continue')
      }
      return setContinueAction(undefined)
    }
    calculateContinueAction()
  }, [readonly, isLastReachedPage, isLastPage, hasPageResponse])

  const isDisplayedContinue = useMemo(() => {
    return continueAction !== undefined
  }, [continueAction])

  const continueLabel = useMemo(() => {
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
  }, [continueAction])

  const continueEndIcon = useMemo(() => {
    if (continueAction === 'continue') {
      return <ArrowRightAltIcon />
    }
    if (continueAction === 'fastForward') {
      return <SkipNext fontSize="large" />
    }
  }, [continueAction])

  const continueGoToPage = () => {
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

  const continueShortCutKey = useMemo(() => {
    return continueAction === 'fastForward'
      ? SHORTCUT_FAST_FORWARD
      : SHORTCUT_NEXT
  }, [continueAction])

  const continueShortCutLabel = useMemo(() => {
    return continueAction === 'fastForward' ? 'alt + fin' : 'alt + ENTRÉE'
  }, [continueAction])

  return {
    isDisplayedContinue,
    continueLabel,
    continueEndIcon,
    continueShortCutKey,
    continueShortCutLabel,
    continueGoToPage,
  }
}
