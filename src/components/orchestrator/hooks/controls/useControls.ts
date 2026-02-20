import type {
  LunaticError,
  LunaticState,
} from '@inseefr/lunatic/use-lunatic/type'

import { useState } from 'react'

import type { TelemetryParadata } from '@/core/model'
import { computeControlEvent, computeControlSkipEvent } from '@/utils/telemetry'

import {
  ErrorType,
  computeErrorType,
  isSameErrors,
  removeNonMandatoryErrors,
  sortErrors,
} from './utils'

type Props = {
  /** Whether we should handle telemetry events. */
  isTelemetryInitialized?: boolean
  compileControls: LunaticState['compileControls']
  goNextPage: LunaticState['goNextPage']
  goPreviousPage: LunaticState['goPreviousPage']
  goToPage: LunaticState['goToPage']
  pushTelemetryEvent: (e: TelemetryParadata) => void | Promise<boolean>
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
  isTelemetryInitialized = false,
  pushTelemetryEvent,
}: Readonly<Props>) {
  const [activeErrors, setActiveErrors] = useState<
    Record<string, LunaticError[]> | undefined
  >(undefined)
  const [isBlocking, setIsBlocking] = useState<boolean>(false)
  const [isWarningAcknowledged, setIsWarningAcknowledged] =
    useState<boolean>(false)

  const handleNextPage = (ignoreNonMandatoryErrors: boolean = false) => {
    const { currentErrors } = compileControls()

    let newErrors: Record<string, LunaticError[]> | undefined
    if (ignoreNonMandatoryErrors) {
      newErrors = removeNonMandatoryErrors(currentErrors)
    } else {
      newErrors = currentErrors
    }

    newErrors = sortErrors(newErrors)

    const errorType = computeErrorType(newErrors)
    switch (errorType) {
      case ErrorType.BLOCKING:
        if (isTelemetryInitialized) {
          pushTelemetryEvent(
            computeControlEvent({
              controlIds: Object.keys(newErrors!),
            }),
          )
        }
        // If error is blocking we prevent further navigation no matter what
        setIsBlocking(true)
        setActiveErrors(newErrors)
        return
      case ErrorType.WARNING:
        // If error is warning we prevent further navigation if the user did not
        // see this error before ; if the user wants to pursue anyway (i.e. the
        // same error is triggered twice), user can proceed
        if (
          isWarningAcknowledged &&
          newErrors &&
          activeErrors &&
          isSameErrors(newErrors, activeErrors)
        ) {
          if (isTelemetryInitialized) {
            pushTelemetryEvent(
              computeControlSkipEvent({
                controlIds: Object.keys(newErrors),
              }),
            )
          }
          resetControls()
          goNextPage()
          return
        }
        setIsWarningAcknowledged(true)
        setActiveErrors(newErrors)
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

  const handleGoToPage: LunaticState['goToPage'] = (page) => {
    resetControls()
    goToPage(page)
  }

  const resetControls = () => {
    setActiveErrors(undefined)
    setIsWarningAcknowledged(false)
    setIsBlocking(false)
  }

  const obsoleteControls = () => {
    setIsWarningAcknowledged(false)
    setIsBlocking(false)
  }

  return {
    /** Errors to be displayed by Lunatic components. */
    activeErrors,
    /**
     * Whether the respondent should be blocked from further navigation
     * until the filled input is changed. Should be used to set navigation
     * buttons as disabled.
     */
    isBlocking,
    /** Go to page handler which reset controls (e.g. active errors). */
    handleGoToPage,
    /** Go to next page handler which check controls shenanigans. */
    handleNextPage,
    /** Go to previous page handler which reset controls (e.g. active errors). */
    handlePreviousPage,
    /**
     * Allow to manually set acknowledgement as obsolete (e.g. when the input is
     * changed) so that new controls can trigger the same warning again but do
     * not erase the displayed errors.
     */
    obsoleteControls,
    /**
     * Allow to manually reset controls (e.g. after a page change not triggered
     * by our various page handler).
     */
    resetControls,
  }
}
