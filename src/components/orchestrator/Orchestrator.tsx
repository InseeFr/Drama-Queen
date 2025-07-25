import { LunaticComponents, useLunatic } from '@inseefr/lunatic'
import Stack from '@mui/material/Stack'
import { tss } from 'tss-react/mui'

import { useCallback, useEffect, useState } from 'react'

import type { Questionnaire, SurveyUnit, SurveyUnitData } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import { useTranslation } from '@/i18n'
import type { GetReferentiel, ValueChange } from '@/models/lunaticType'

import { Continue } from './Continue'
import { LoopPanel } from './LoopPanel'
import { WelcomeBackModal } from './WelcomeBackModal'
import { useControls } from './hooks/controls/useControls'
import { useSurveyUnit } from './hooks/surveyUnit/useSurveyUnit'
import { useQueenNavigation } from './hooks/useQueenNavigation'
import { Header } from './layout/Header'
import { useLunaticStyles } from './lunaticStyle'
import { NavBar } from './navigationBar/NavBar'
import { slotComponents } from './slotComponents'
import { shouldAutoNext, shouldSkipQuestion } from './utils/autoNext'
import { computeSourceExternalVariables, computeSurveyUnit } from './utils/data'
import { scrollAndFocusToFirstError } from './utils/focus'
import { computeNavigationButtonsProps } from './utils/navigation'

const missingShortcut = { dontKnow: 'f2', refused: 'f4' }

type OrchestratorProps = {
  getReferentiel: GetReferentiel
  /**
   * Whether or not we should include calculated variables in survey unit
   * provided to the onQuit function.
   */
  includeCalculatedVariables?: boolean
  /** Action to be called when the respondent changes page. */
  onChangePage?: (surveyUnit: SurveyUnit) => void
  /** Action to be called when the respondent's filled data enters a new state. */
  onChangeSurveyUnitState?: (params: {
    surveyUnitId: string
    newState: QuestionnaireState
  }) => void
  /** Action to be called when the respondent finishes the survey. */
  onDefinitiveQuit?: (surveyUnit: SurveyUnit) => void
  /** Action to be called when the respondent closes the app. */
  onQuit?: (surveyUnit: SurveyUnit) => void
  /** Whether or not we should be on read only. */
  readonly: boolean
  /** Questionnaire data to be filled by the respondent. */
  source: Questionnaire
  /** Data filled by the respondent when the app is launched. */
  surveyUnit?: SurveyUnit
}

/**
 * Compute survey's components and handle input changes by sending data to the
 * back-end.
 */
export function Orchestrator({
  getReferentiel,
  includeCalculatedVariables = false,
  onChangePage = () => {},
  onChangeSurveyUnitState = () => {},
  onDefinitiveQuit = () => {},
  onQuit = () => {},
  readonly,
  source: initialSource,
  surveyUnit,
}: Readonly<OrchestratorProps>) {
  const { classes } = useStyles()
  const { t } = useTranslation('navigationMessage')
  const { classes: lunaticClasses } = useLunaticStyles()

  const initialSurveyUnit = computeSurveyUnit(surveyUnit)
  const source = computeSourceExternalVariables(initialSource)
  const questionnaireTitle = source.label ? source.label.value : ''

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(
    !readonly &&
      initialSurveyUnit.stateData !== undefined &&
      initialSurveyUnit.stateData.currentPage !== '1',
  )

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
    overview,
    pager: { maxPage, page, subPage, nbSubPages, lastReachedPage, iteration },
    pageTag,
    Provider,
  } = useLunatic(source, initialSurveyUnit.data, {
    activeControls: true,
    autoSuggesterLoading: true,
    dontKnowButton: t('dontKnowButtonLabel'),
    getReferentiel,
    lastReachedPage: initialSurveyUnit.stateData?.currentPage,
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

  const { surveyUnitData, updateSurveyUnit } = useSurveyUnit(
    initialSurveyUnit,
    onChangeSurveyUnitState,
  )

  const { orchestratorOnQuit, orchestratorOnDefinitiveQuit } =
    useQueenNavigation({
      getChangedData,
      getData,
      includeCalculatedVariables,
      onQuit,
      onDefinitiveQuit,
      updateSurveyUnit,
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

  // Trigger a survey unit update when the Lunatic page changes
  useEffect(() => {
    if (
      pageTag === undefined ||
      lastReachedPage === undefined ||
      isWelcomeModalOpen
    ) {
      // do not trigger the update when we first launch the orchestrator
      return
    }
    const surveyUnit = updateSurveyUnit(
      getChangedData(true) as SurveyUnitData,
      { currentPage: pageTag },
    )
    onChangePage(surveyUnit)
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
                page={page}
                subPage={subPage}
                iteration={iteration}
                lastReachedPage={lastReachedPage}
                data={surveyUnitData}
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
            page: initialSurveyUnit.stateData?.currentPage ?? '1',
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
