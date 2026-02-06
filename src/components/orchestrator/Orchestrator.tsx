import { LunaticComponents, useLunatic } from '@inseefr/lunatic'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'

import { useCallback, useEffect, useState } from 'react'

import { useTelemetry } from '@/contexts/TelemetryContext'
import type {
  Interrogation,
  InterrogationData,
  PageTag,
  Questionnaire,
} from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import type { GetReferentiel, ValueChange } from '@/models/lunaticType'
import { computeInitEvent, computeNewPageEvent } from '@/utils/telemetry'

import { Continue } from './Continue'
import { LoopPanel } from './LoopPanel'
import { WelcomeBackModal } from './WelcomeBackModal'
import { useControls } from './hooks/controls/useControls'
import { useInterrogation } from './hooks/interrogation/useInterrogation'
import { useQueenNavigation } from './hooks/useQueenNavigation'
import { Header } from './layout/Header'
import { NavBar } from './navigationBar/NavBar'
import { slotComponents } from './slotComponents'
import { shouldAutoNext, shouldSkipQuestion } from './utils/autoNext'
import {
  computeInterrogation,
  computeSourceExternalVariables,
} from './utils/data'
import { scrollAndFocusToFirstError } from './utils/focus'
import { computeNavigationButtonsProps } from './utils/navigation'

const missingShortcut = { dontKnow: 'f2', refused: 'f4' }

type OrchestratorProps = {
  getReferentiel: GetReferentiel
  /**
   * Whether or not we should include calculated variables in interrogation
   * provided to the onQuit function.
   */
  includeCalculatedVariables?: boolean
  /** Questionnaire page on which starting when the app is launched. */
  initialPage?: PageTag
  /** Action to be called when the respondent changes page. */
  onChangePage?: (interrogation: Interrogation) => void
  /** Action to be called when the respondent's filled data enters a new state. */
  onChangeInterrogationState?: (params: {
    interrogationId: string
    newState: QuestionnaireState
  }) => void
  /** Action to be called when the respondent finishes the survey. */
  onDefinitiveQuit?: (interrogation: Interrogation) => void
  /** Action to be called when the respondent closes the app. */
  onQuit?: (interrogation: Interrogation) => void
  /** Whether or not we should be on read only. */
  readonly: boolean
  /** Questionnaire data to be filled by the respondent. */
  source: Questionnaire
  /** Data filled by the respondent when the app is launched. */
  interrogation?: Interrogation
}

/**
 * Compute survey's components and handle input changes by sending data to the
 * back-end.
 */
export function Orchestrator({
  getReferentiel,
  includeCalculatedVariables = false,
  initialPage,
  onChangePage = () => { },
  onChangeInterrogationState = () => { },
  onDefinitiveQuit = () => { },
  onQuit = () => { },
  readonly,
  source: initialSource,
  interrogation,
}: Readonly<OrchestratorProps>) {
  const { t } = useTranslation()

  const initialInterrogation = computeInterrogation(interrogation)
  const source = computeSourceExternalVariables(initialSource)
  const questionnaireTitle = source.label ? source.label.value : ''

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(
    !readonly &&
    initialInterrogation.stateData !== undefined &&
    initialInterrogation.stateData.currentPage !== '1',
  )

  // Allow to send telemetry events once interrogation id has been set
  const [isTelemetryInitialized, setIsTelemetryInitialized] =
    useState<boolean>(false)

  const {
    isTelemetryEnabled,
    pushEvent,
    setDefaultValues,
    triggerBatchTelemetryCallback,
  } = useTelemetry()

  const {
    compileControls,
    getChangedData,
    getComponents,
    getData,
    goNextPage,
    goPreviousPage,
    goToPage,
    hasPageResponse,
    isFirstPage,
    isLastPage,
    loopVariables,
    roundaboutLoopVariables,
    overview,
    pager: { maxPage, page, subPage, nbSubPages, lastReachedPage, iteration },
    pageTag,
    Provider,
  } = useLunatic(source, initialInterrogation.data, {
    activeControls: true,
    autoSuggesterLoading: true,
    dontKnowButton: t('common.dontKnow'),
    getReferentiel,
    initialPage: initialPage,
    lastReachedPage: initialInterrogation.stateData?.currentPage,
    missing: true,
    missingShortcut: missingShortcut,
    onChange: (v) => onLunaticChange(v),
    shortcut: true,
    trackChanges: true,
    withOverview: true,
  })

  const {
    activeErrors,
    handleGoToPage,
    handleNextPage,
    handlePreviousPage,
    isBlocking,
    obsoleteControls,
  } = useControls({
    compileControls,
    goNextPage,
    goPreviousPage,
    goToPage,
    isTelemetryInitialized,
    pushEvent,
  })

  /** Focus on the first input with an error. */
  useEffect(() => {
    if (activeErrors) scrollAndFocusToFirstError()
  }, [activeErrors])

  const onLunaticChange = useCallback(
    (v: ValueChange) => {
      obsoleteControls()
      const components = getComponents()
      if (shouldSkipQuestion(components, v)) {
        // answer is a DK/refusal, we ignore all errors except mandatory ones
        handleNextPage(true)
      } else if (shouldAutoNext(components, v)) {
        // the component can be answered in a click, we can directly go to next
        // page if there are no related errors or warning
        handleNextPage()
      }
    },
    [obsoleteControls, getComponents, handleNextPage],
  )

  const { interrogationData, updateInterrogation } = useInterrogation(
    initialInterrogation,
    onChangeInterrogationState,
  )

  const { orchestratorOnQuit, orchestratorOnDefinitiveQuit } =
    useQueenNavigation({
      getChangedData,
      getData,
      includeCalculatedVariables,
      onQuit,
      onDefinitiveQuit,
      updateInterrogation,
      isTelemetryInitialized,
      pushEvent,
      triggerBatchTelemetryCallback,
    })

  const isLastReachedPage =
    lastReachedPage === undefined || pageTag === lastReachedPage

  const { continueProps, previousProps, nextProps } =
    computeNavigationButtonsProps({
      isBlocking,
      readonly,
      isFirstPage,
      isLastPage,
      isLastReachedPage,
      hasPageResponse,
      goPreviousPage: handlePreviousPage,
      goNextPage: handleNextPage,
      quit: () => orchestratorOnQuit(pageTag),
      definitiveQuit: () => orchestratorOnDefinitiveQuit(pageTag),
    })

  // Telemetry initialization
  useEffect(() => {
    if (isTelemetryEnabled) {
      setDefaultValues({ idInterrogation: initialInterrogation?.id })
      setIsTelemetryInitialized(true)
    }
  }, [isTelemetryEnabled, setDefaultValues, initialInterrogation?.id])

  // Initialization event
  useEffect(() => {
    if (isTelemetryInitialized) {
      pushEvent(computeInitEvent())
    }
  }, [isTelemetryInitialized, pushEvent])

  // Trigger a interrogation update when the Lunatic page changes
  useEffect(() => {
    if (
      pageTag === undefined ||
      lastReachedPage === undefined ||
      isWelcomeModalOpen
    ) {
      // do not trigger the update when we first launch the orchestrator
      return
    }

    if (isTelemetryInitialized) {
      pushEvent(
        computeNewPageEvent({
          page: 'lunaticPage',
          pageTag,
        }),
      )
    }

    const interrogation = updateInterrogation(
      getChangedData(true) as InterrogationData,
      { currentPage: pageTag },
    )
    onChangePage(interrogation)
    // remove deps that should be stable, avoiding calling getChangedData on every input
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTag, lastReachedPage, isWelcomeModalOpen])

  const components = getComponents()

  return (
    <Stack className="h-screen">
      <Header
        questionnaireTitle={questionnaireTitle}
        readonly={readonly}
        overview={overview}
        goToPage={handleGoToPage}
        quit={() => orchestratorOnQuit(pageTag)}
        definitiveQuit={() => orchestratorOnDefinitiveQuit(pageTag)}
      />
      <Stack className="flex-row flex-1 bg-background-default pt-16.25 w-[calc(100%-60px)] h-[calc(100%-65px)]">
        <Stack className="flex-col flex-1 h-full ">
          <Stack className="flex-row flex-1 justify-between h-full overflow-hidden">
            <Stack className="flex-col h-full w-[80%] overflow-y-auto
            [&>div:first-of-type]:flex-col [&>div:first-of-type]:h-full
            [&>div:first-of-type>div]:max-w-[calc(100%-100px)] [&>div:first-of-type>div]:pl-25 [&>div:first-of-type>div]:mt-12 [&>div:first-of-type>div]:grow [&>div:first-of-type>div]:overflow-y-auto
            ">
              <Provider>
                <LunaticComponents
                  components={components}
                  slots={slotComponents}
                  componentProps={() => ({
                    errors: activeErrors,
                    ...(readonly ? { readOnly: true, disabled: true } : {}),
                  })}
                  autoFocusKey={pageTag}
                  wrapper={({ children, id, componentType }) => (
                    <div
                      className={`lunatic ${componentType}`}
                      key={`component-${id}`}
                    >
                      {children}
                    </div>
                  )}
                />
              </Provider>
            </Stack>
            <Stack className="mt-12 mx-2 w-[20%] overflow-y-auto">
              <LoopPanel
                loopVariables={loopVariables}
                roundaboutLoopVariables={roundaboutLoopVariables}
                page={page}
                subPage={subPage}
                iteration={iteration}
                lastReachedPage={lastReachedPage}
                data={interrogationData}
                goToPage={handleGoToPage}
              />
            </Stack>
          </Stack>
          <Stack className="items-end mb-4 mt-8 mr-16 min-h-[2.3em]">
            {continueProps.isVisible && <Continue {...continueProps} />}
          </Stack>
        </Stack>
        <Stack className="fixed right-0 bg-background-default h-[calc(100vh - 65px - 2em)] w-15 items-center justify-end pb-8 border-l border-info">
          <NavBar
            overview={overview}
            page={page}
            maxPage={maxPage}
            subPage={subPage}
            nbSubPages={nbSubPages}
            isPreviousEnabled={previousProps.isPreviousEnabled}
            isNextEnabled={nextProps.isNextEnabled}
            onPrevious={previousProps.onPrevious}
            onNext={nextProps.onNext}
          />
        </Stack>
      </Stack>
      <WelcomeBackModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onGoBack={() => {
          handleGoToPage({
            page: initialInterrogation.stateData?.currentPage ?? '1',
          })
          setIsWelcomeModalOpen(false)
        }}
      />
    </Stack>
  )
}