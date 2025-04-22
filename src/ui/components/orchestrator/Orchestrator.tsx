import { LunaticComponents, useLunatic } from '@inseefr/lunatic'
import Stack from '@mui/material/Stack'
import { tss } from 'tss-react/mui'

import { useState } from 'react'

import type { Questionnaire, SurveyUnit } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import { useTranslation } from '@/i18n'
import { useAutoNext } from '@/ui/components/orchestrator/tools/useAutoNext'

import { slotComponents } from '../slotComponents'
import { Header } from './Header/Header'
import { LoopPanel } from './LoopPanel/LoopPanel'
import { NavBar } from './NavBar/NavBar'
import { WelcomeModal } from './WelcomeModal'
import { Continue } from './buttons/Continue/Continue'
import { useLunaticStyles } from './lunaticStyle'
import type { GetReferentiel } from './lunaticType'
import { getSource, getinitialSurveyUnit } from './tools/functions'
import { useNavigationButtons } from './tools/useNavigationButtons'
import { useQueenNavigation } from './tools/useQueenNavigation'

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
  const { onChange, ref } = useAutoNext()

  // the given surveyUnit can be empty or partial, we initialize it for having the waited format
  const initialSurveyUnit = getinitialSurveyUnit(surveyUnit)
  const source = getSource(initialSource)

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(
    !readonly && initialSurveyUnit.stateData?.currentPage !== '1',
  )

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

  ref.current = { goNextPage, getComponents }

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
  } = useQueenNavigation({
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
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onGoBack={() => {
          goToPage({ page: initialSurveyUnit.stateData?.currentPage ?? '1' })
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
    '& > div:first-of-type': { display: 'flex', height: '100%' },
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
