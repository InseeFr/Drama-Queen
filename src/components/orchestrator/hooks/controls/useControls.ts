import type { LunaticError } from '@inseefr/lunatic/use-lunatic/type'

import { useState } from 'react'

import type { CompileControls, GoToPage } from '@/models/lunaticType'

import { ErrorType, computeErrorType, isSameErrors } from './utils'

type useControlsProps = {
  compileControls: CompileControls
  goNextPage: () => void
  goPreviousPage: () => void
  goToPage: GoToPage
  /** Whether or not this feature should be enabled */
  isEnabled: boolean
}

/**
 * On navigation, compute controls from filled inputs.
 *
 * It will return what is necessary to display the errors and block the user if
 * the error is blocking.
 */
export function useControls({
  compileControls,
  goNextPage,
  goPreviousPage,
  goToPage,
  isEnabled = false,
}: Readonly<useControlsProps>) {
  const [activeErrors, setActiveErrors] = useState<
    Record<string, LunaticError[]> | undefined
  >(undefined)
  const [isBlocking, setIsBlocking] = useState<boolean>(false)
  const [isWarningAcknowledged, setIsWarningAcknowledged] =
    useState<boolean>(false)

  const handleNextPage = (ignoreWarning: boolean = false) => {
    if (!isEnabled) {
      goNextPage()
      return
    }

    const { currentErrors } = compileControls()
    const errorType = computeErrorType(currentErrors)
    switch (errorType) {
      case ErrorType.BLOCKING:
        // If error is blocking we prevent further navigation no matter what
        setIsBlocking(true)
        setActiveErrors(currentErrors)
        return
      case ErrorType.WARNING:
        // If error is warning we prevent further navigation if the user did not
        // see this error before ; if the user wants to pursue anyway (i.e. the
        // same error is triggered twice), user can proceed
        if (
          ignoreWarning ||
          (isWarningAcknowledged &&
            currentErrors &&
            activeErrors &&
            isSameErrors(currentErrors, activeErrors))
        ) {
          resetControls()
          goNextPage()
          return
        }
        setIsWarningAcknowledged(true)
        setActiveErrors(currentErrors)
        return
      default:
        resetControls()
        goNextPage()
    }
  }

  const handlePreviousPage = () => {
    resetControls()
    goPreviousPage()
  }

  const handleGoToPage: GoToPage = (page) => {
    resetControls()
    goToPage(page)
  }

  const resetControls = () => {
    setActiveErrors(undefined)
    setIsWarningAcknowledged(false)
    setIsBlocking(false)
  }

  return {
    /** Errors to be displayed by Lunatic components. */
    activeErrors,
    /** Go to page handler which reset controls (e.g. active errors). */
    handleGoToPage,
    /** Go to next page handler which check controls shenanigans. */
    handleNextPage,
    /** Go to previous page handler which reset controls (e.g. active errors). */
    handlePreviousPage,
    /**
     * Whether or not the respondent should be blocked from further navigation
     * until the filled input is changed. Should be used to set navigation
     * buttons as disabled.
     */
    isBlocking,
    /** Allow to manually reset controls (e.g. when the input is changed). */
    resetControls,
  }
}
