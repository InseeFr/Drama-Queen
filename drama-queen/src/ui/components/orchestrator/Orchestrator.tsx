import {
  LunaticComponents,
  useLunatic,
  type LunaticData,
} from '@inseefr/lunatic'
import Stack from '@mui/material/Stack'
import type { Questionnaire, SurveyUnit } from 'core/model'
import type { QuestionnaireState } from 'core/model/QuestionnaireState'
import { useTranslation } from 'i18n'
import { tss } from 'tss-react/mui'
import { useAutoNext } from 'ui/components/orchestrator/tools/useAutoNext'
import { Header } from './Header/Header'
import { LoopPanel } from './LoopPanel/LoopPanel'
import { NavBar } from './NavBar/NavBar'
import { Continue } from './buttons/Continue/Continue'
import { useLunaticStyles } from './lunaticStyle'
import { getinitialSurveyUnit } from './tools/functions'
import { getQueenNavigation } from './tools/getQueenNavigation'
import { useNavigationButtons } from './tools/useNavigationButtons'
import type { GetReferentiel } from './lunaticType'
import { Modal } from '../Modal'
import { useState } from 'react'

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
    source,
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

  // get the initial data for useLunatic
  const initialData = surveyUnit?.data as LunaticData | undefined

  // the given surveyUnit can be empty or partial, we initialize it for having the waited format
  const initialSurveyUnit = getinitialSurveyUnit(surveyUnit)

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(
    !readonly && initialSurveyUnit.stateData?.currentPage !== '1'
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
  } = useLunatic(source, initialData, {
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

  const {
    isLastReachedPage,
    surveyUnitData,
    orchestratorQuit,
    orchestratorDefinitiveQuit,
  } = getQueenNavigation({
    initialSurveyUnit,
    getChangedData: getChangedData,
    lastReachedPage,
    pageTag,
    isWelcomeModalOpen,
    onQuit,
    onDefinitiveQuit,
    onChangePage,
    onChangeSurveyUnitState,
  })

  const { continueProps, previousProps, nextProps } = useNavigationButtons({
    readonly,
    isFirstPage,
    isLastPage,
    isLastReachedPage,
    hasPageResponse,
    goPreviousPage,
    goNextPage,
    quit: orchestratorQuit,
    definitiveQuit: orchestratorDefinitiveQuit,
  })

  return (
    <Stack className={classes.orchestrator}>
      <Header
        questionnaireTitle={questionnaireTitle}
        iteration={iteration}
        readonly={readonly}
        overview={overview}
        goToPage={goToPage}
        quit={orchestratorQuit}
        definitiveQuit={orchestratorDefinitiveQuit}
      />
      <Stack className={classes.bodyContainer}>
        <Stack className={classes.mainContainer}>
          <Stack className={classes.centerSection}>
            <Stack className={classes.activeSection}>
              <Provider>
                <LunaticComponents
                  components={components}
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
          <Stack className={classes.continue}>
            {continueProps.isVisible && <Continue {...continueProps} />}
          </Stack>
        </Stack>
        <Stack className={classes.navBarContainer}>
          <NavBar
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
    minHeight: '100vh',
  },
  bodyContainer: {
    flexDirection: 'row',
    backgroundColor: theme.palette.background.default,
    paddingTop: '60px',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  centerSection: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  activeSection: {
    flex: 1,
    height: '100%',
    '& > div:first-of-type': {
      display: 'flex',
      height: '100%',
    },
    '& > div:first-of-type > div': {
      width: '80%',
      marginLeft: '100px',
      marginTop: '3em',
      flexGrow: 1,
    },
  },
  continue: {
    alignItems: 'end',
    marginBottom: '1em',
    marginRight: '4em',
    minHeight: '2.3em',
  },
  navBarContainer: {
    position: 'relative',
    justifyContent: 'flex-end',
    gap: '2em',
    paddingBottom: '2em',
    alignItems: 'center',
    borderLeft: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
    width: '60px',
  },
}))
