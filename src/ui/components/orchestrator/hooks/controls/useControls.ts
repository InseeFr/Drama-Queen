import type { LunaticError } from '@inseefr/lunatic/use-lunatic/type'

import { useState } from 'react'

import type { CompileControls, GoToPage } from '../../lunaticType'
import { ErrorType, computeErrorType } from './utils'

type useControlsProps = {
  compileControls: CompileControls
  goNextPage: () => void
  goPreviousPage: () => void
  goToPage: GoToPage
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
}: Readonly<useControlsProps>) {
  const [activeErrors, setActiveErrors] = useState<
    Record<string, LunaticError[]> | undefined
  >(undefined)
  const [isBlocking, setIsBlocking] = useState<boolean>(false)
  const [isWarningAcknowledged, setIsWarningAcknowledged] =
    useState<boolean>(false)

  const handleNextPage = () => {
    const { currentErrors } = compileControls()
    setActiveErrors(currentErrors)
    const errorType = computeErrorType(currentErrors)
    switch (errorType) {
      case ErrorType.BLOCKING:
        setIsBlocking(true)
        return
      case ErrorType.WARNING:
        if (isWarningAcknowledged) {
          resetControls()
          goNextPage()
          return
        }
        setIsWarningAcknowledged(true)
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
    activeErrors,
    handleGoToPage,
    handleNextPage,
    handlePreviousPage,
    /**
     * Whether or not the respondent should be blocked from further navigation
     * until the filled input is changed.
     */
    isBlocking,
    resetControls,
  }
}
