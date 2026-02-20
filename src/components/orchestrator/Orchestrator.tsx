import { LunaticComponents, useLunatic } from '@inseefr/lunatic'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

import { useCallback, useEffect, useState } from 'react'

import { useTelemetry } from '@/contexts/TelemetryContext'
import type {
  Interrogation,
  InterrogationData,
  PageTag,
  Questionnaire,
} from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import usePrevious from '@/hooks/usePrevious'
import type { GetReferentiel, ValueChange } from '@/models/lunaticType'
import { computeInitEvent, computeNewPageEvent } from '@/utils/telemetry'

import { Continue } from './Continue'
import { LoopPanel } from './LoopPanel'
import { WelcomeBackModal } from './WelcomeBackModal'
import { useControls } from './hooks/controls/useControls'
import { useInterrogation } from './hooks/interrogation/useInterrogation'
import { useQueenNavigation } from './hooks/useQueenNavigation'
import { Header } from './layout/Header'
import { useLunaticStyles } from './lunaticStyle'
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
  onChangePage = () => {},
  onChangeInterrogationState = () => {},
  onDefinitiveQuit = () => {},
  onQuit = () => {},
  readonly,
  source: initialSource,
  interrogation,
}: Readonly<OrchestratorProps>) {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const { classes: lunaticClasses } = useLunaticStyles()

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

  /*
   * Since the roundabout "start / edit" buttons for each occurences is handled
   * by Lunatic, we do not have the usual "handleNextPage" which resets
   * controls. We need to obsolete them manually when we enter an occurence.
   */
  const isRoundabout = roundaboutLoopVariables?.length > 0
  const previousSubPage = usePrevious(subPage)
  useEffect(() => {
    if (isRoundabout && previousSubPage === undefined) {
      obsoleteControls()
    }
  }, [isRoundabout, previousSubPage, obsoleteControls])

  /* Focus on the first input with an error. */
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
    <Stack className={classes.orchestrator}>
      <Header
        questionnaireTitle={questionnaireTitle}
        readonly={readonly}
        overview={overview}
        goToPage={handleGoToPage}
        quit={() => orchestratorOnQuit(pageTag)}
        definitiveQuit={() => orchestratorOnDefinitiveQuit(pageTag)}
      />
      <Stack className={classes.bodyContainer}>
        <Stack className={classes.mainContainer}>
          <Stack className={classes.centerSection}>
            <Stack className={classes.activeSection}>
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
                      className={`${lunaticClasses.lunatic} ${componentType}`}
                      key={`component-${id}`}
                    >
                      {children}
                    </div>
                  )}
                />
              </Provider>
            </Stack>
            <Stack className={classes.loopPanel}>
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
          <Stack className={classes.continue}>
            {continueProps.isVisible && <Continue {...continueProps} />}
          </Stack>
        </Stack>
        <Stack className={classes.navBarContainer}>
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

const useStyles = tss.create(({ theme }) => ({
  orchestrator: { height: '100vh' },
  bodyContainer: {
    flexDirection: 'row',
    backgroundColor: theme.palette.background.default,
    paddingTop: '65px',
    flex: 1,
    width: 'calc(100% - 60px)',
    height: 'calc(100vh - 65px)',
  },
  mainContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  centerSection: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    overflow: 'hidden',
  },
  activeSection: {
    flexDirection: 'column',
    height: '100%',
    width: '80%',
    overflowY: 'auto',
    '& > div:first-of-type': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    '& > div:first-of-type > div': {
      maxWidth: 'calc(100% - 100px)',
      paddingLeft: '100px',
      marginTop: '3em',
      flexGrow: 1,
      overflowY: 'auto',
    },
  },
  loopPanel: {
    marginTop: '3em',
    marginLeft: '0.5em',
    marginRight: '0.5em',
    width: '20%',
    overflowY: 'auto',
  },
  continue: {
    alignItems: 'end',
    marginBottom: '1em',
    marginTop: '2em',
    marginRight: '4em',
    minHeight: '2.3em',
  },
  navBarContainer: {
    backgroundColor: theme.palette.background.default,
    height: 'calc(100vh - 65px - 2em)',
    right: '0',
    position: 'fixed',
    justifyContent: 'flex-end',
    paddingBottom: '2em',
    alignItems: 'center',
    borderLeft: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
    width: '60px',
  },
}))
