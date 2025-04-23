import { LunaticComponents, useLunatic } from '@inseefr/lunatic'
import Stack from '@mui/material/Stack'
import { tss } from 'tss-react/mui'

import { useCallback, useEffect, useState } from 'react'

import type { Questionnaire, SurveyUnit, SurveyUnitData } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import { useTranslation } from '@/i18n'
import { useAutoNext } from '@/ui/components/orchestrator/tools/useAutoNext'

import { Modal } from '../Modal'
import { slotComponents } from '../slotComponents'
import { Header } from './Header/Header'
import { LoopPanel } from './LoopPanel/LoopPanel'
import { NavBar } from './NavBar/NavBar'
import { Continue } from './buttons/Continue/Continue'
import { useLunaticStyles } from './lunaticStyle'
import type { GetReferentiel } from './lunaticType'
import { getSource, getinitialSurveyUnit } from './tools/functions'
import { useQueenNavigation } from './tools/navigation/useQueenNavigation'
import { useSurveyUnitHandling } from './tools/surveyUnit/useSurveyUnitHandling'
import { useNavigationButtons } from './tools/useNavigationButtons'
import { useRefSync } from './tools/useRefSync'

const missingShortcut = { dontKnow: 'f2', refused: 'f4' }

type OrchestratorProps = {
  source: Questionnaire
  surveyUnit: SurveyUnit | undefined
  readonly: boolean
  onQuit: ((surveyUnit: SurveyUnit) => void) | undefined
  onDefinitiveQuit: ((surveyUnit: SurveyUnit) => void) | undefined
  onChangePage: ((surveyUnit: SurveyUnit) => void) | undefined
  getReferentiel: GetReferentiel
  onChangeSurveyUnitState?:
    | ((params: { surveyUnitId: string; newState: QuestionnaireState }) => void)
    | undefined
}

export function Orchestrator(props: OrchestratorProps) {
  const {
    source: initialSource,
    surveyUnit,
    readonly,
    onQuit = () => {},
    onDefinitiveQuit = () => {},
    onChangePage = () => {},
    getReferentiel,
    onChangeSurveyUnitState = () => {},
  } = props
  const { classes } = useStyles()
  const { t } = useTranslation('navigationMessage')
  const { t: t2 } = useTranslation('modalMessage')
  const { onChange, ref } = useAutoNext()

  // the given surveyUnit can be empty or partial, we initialize it for having the waited format
  const initialSurveyUnit = getinitialSurveyUnit(surveyUnit)
  const source = getSource(initialSource)

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(
    !readonly && initialSurveyUnit.stateData?.currentPage !== '1',
  )
  const welcomeModalTitle = t2('welcomeModalTitle')
  const welcomeModalContent = t2('welcomeModalContent')

  const welcomeModalOnClose = () => setIsWelcomeModalOpen(false)

  const welcomeModalGoBack = () => {
    goToPage({ page: initialSurveyUnit.stateData?.currentPage ?? '1' })
    setIsWelcomeModalOpen(false)
  }

  const welcomeModalButtons = [
    {
      label: t2('welcomeModalFirstPage'),
      onClick: welcomeModalOnClose,
      autoFocus: false,
    },
    {
      label: t2('welcomeModalGoBack'),
      onClick: welcomeModalGoBack,
      autoFocus: true,
    },
  ]

  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    goToPage,
    isFirstPage,
    isLastPage,
    pager,
    Provider,
    pageTag,
    overview,
    hasPageResponse,
    getChangedData,
    loopVariables,
  } = useLunatic(source, initialSurveyUnit.data, {
    lastReachedPage: initialSurveyUnit.stateData?.currentPage,
    onChange,
    getReferentiel: getReferentiel,
    autoSuggesterLoading: true,
    trackChanges: true,
    shortcut: true,
    withOverview: true,
    missing: true,
    dontKnowButton: t('dontKnowButtonLabel'),
    missingShortcut: missingShortcut,
  })

  ref.current = {
    goNextPage,
    getComponents,
  }

  const { maxPage, page, subPage, nbSubPages, lastReachedPage, iteration } =
    pager

  const questionnaireTitle = source.label ? source.label.value : ''

  const components = getComponents()

  const { classes: lunaticClasses } = useLunaticStyles()

  const isLastReachedPage =
    lastReachedPage === undefined || pageTag === lastReachedPage

  const { surveyUnitData, getUpdatedSurveyUnit } = useSurveyUnitHandling(
    initialSurveyUnit,
    onChangeSurveyUnitState,
    pageTag,
  )

  const { orchestratorOnQuit, orchestratorOnDefinitiveQuit } =
    useQueenNavigation({
      onQuit,
      onDefinitiveQuit,
      getUpdatedSurveyUnit,
      getChangedData,
    })

  const { continueProps, previousProps, nextProps } = useNavigationButtons({
    readonly,
    isFirstPage,
    isLastPage,
    isLastReachedPage,
    hasPageResponse,
    goPreviousPage,
    goNextPage,
    quit: orchestratorOnQuit,
    definitiveQuit: orchestratorOnDefinitiveQuit,
  })

  // Use ref to avoid dependencies in useCallback. Else it triggers getChangedData at every input.
  const getChangedDataRef = useRefSync(getChangedData)
  const getUpdatedSurveyUnitRef = useRefSync(getUpdatedSurveyUnit)
  const onChangePageRef = useRefSync(onChangePage)

  const orchestratorOnChangePage = useCallback(() => {
    const surveyUnit = getUpdatedSurveyUnitRef.current(
      getChangedDataRef.current(true) as SurveyUnitData,
    )
    onChangePageRef.current(surveyUnit)
  }, [getChangedDataRef, getUpdatedSurveyUnitRef, onChangePageRef])

  useEffect(() => {
    if (pageTag === undefined || isWelcomeModalOpen) {
      return
    }

    return orchestratorOnChangePage()
  }, [pageTag, isWelcomeModalOpen, orchestratorOnChangePage])

  return (
    <Stack className={classes.orchestrator}>
      <Header
        questionnaireTitle={questionnaireTitle}
        readonly={readonly}
        overview={overview}
        goToPage={goToPage}
        quit={orchestratorOnQuit}
        definitiveQuit={orchestratorOnDefinitiveQuit}
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
                    filterDescription: false,
                    disabled: readonly,
                    readOnly: readonly,
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
                goToPage={goToPage}
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
      <Modal
        isOpen={isWelcomeModalOpen}
        dialogTitle={welcomeModalTitle}
        dialogContent={welcomeModalContent}
        buttons={welcomeModalButtons}
        mandatory
        onClose={welcomeModalOnClose}
      />
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  orchestrator: {
    height: '100vh',
  },
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
