import { Header } from './Header/Header'
import { NavBar } from './NavBar/NavBar'
import { tss } from 'tss-react/mui'
import {
  type LunaticData,
  useLunatic,
  LunaticComponents,
} from '@inseefr/lunatic'
import { Stack } from '@mui/material'
import { useLunaticStyles } from './lunaticStyle'
import { Continue } from './buttons/Continue/Continue'
import { SHORTCUT_FAST_FORWARD, SHORTCUT_NEXT } from 'ui/constants'
import {
  getContinueBehavior,
  getContinueEndIcon,
  getContinueGoToPage,
  getContinueLabel,
  getIsDisplayedContinue,
  getIsLastReachedPage,
} from 'ui/components/orchestrator/tools/functions'
import { useAutoNext } from 'ui/components/orchestrator/tools/useAutoNext'
import { LoopPanel } from './LoopPanel/LoopPanel'
import type { Questionnaire, SurveyUnit } from 'core/model'

const missingShortcut = { dontKnow: 'f2', refused: 'f4' }
const quit = () => console.log('quit')
const definitiveQuit = () => console.log('definitiveQuit')

type OrchestratorProps = {
  source: Questionnaire
  surveyUnit: SurveyUnit | undefined
  readonly: boolean
}

export function Orchestrator(props: OrchestratorProps) {
  const { source, surveyUnit, readonly } = props
  const { classes } = useStyles()
  const { onChange, ref } = useAutoNext()

  const data = surveyUnit?.data as LunaticData

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
    getData,
    loopVariables,
  } = useLunatic(source, data, {
    onChange: onChange,
    shortcut: true,
    withOverview: true,
    missing: true,
    dontKnowButton: 'Ne sait pas',
    missingShortcut: missingShortcut,
  })

  ref.current = {
    goNextPage,
    getComponents,
  }

  const { maxPage, page, subPage, nbSubPages, lastReachedPage, iteration } =
    pager

  const questionnaireTitle = source.label.value

  const components = getComponents()

  const hierarchy = components[0]?.hierarchy
  const { classes: lunaticClasses } = useLunaticStyles()

  const isLastReachedPage = getIsLastReachedPage(pageTag, lastReachedPage)

  const continueBehavior = getContinueBehavior(
    readonly,
    isLastPage,
    isLastReachedPage,
    hasPageResponse
  )

  const isDisplayedContinue = getIsDisplayedContinue(continueBehavior)

  const continueGoToPage = () =>
    getContinueGoToPage(
      continueBehavior,
      lastReachedPage,
      goNextPage,
      goToPage,
      quit,
      definitiveQuit
    )

  const continueLabel = getContinueLabel(continueBehavior)

  const continueEndIcon = getContinueEndIcon(continueBehavior)

  const continueShortCutKey =
    continueBehavior === 'fastForward' ? SHORTCUT_FAST_FORWARD : SHORTCUT_NEXT

  const continueShortCutLabel =
    continueBehavior === 'fastForward' ? 'alt + fin' : 'alt + ENTRÉE'

  return (
    <Stack className={classes.orchestrator}>
      <Header
        questionnaireTitle={questionnaireTitle}
        hierarchy={hierarchy}
        readonly={readonly}
        overview={overview}
        goToPage={goToPage}
        quit={quit}
        definitiveQuit={definitiveQuit}
      />
      <Stack className={classes.bodyContainer}>
        <Stack className={classes.mainContainer}>
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
          <Stack className={classes.continue}>
            {isDisplayedContinue && (
              <Continue
                label={continueLabel}
                endIcon={continueEndIcon}
                shortCutKey={continueShortCutKey}
                shortCutLabel={continueShortCutLabel}
                goToPage={continueGoToPage}
              />
            )}
          </Stack>
        </Stack>
        <Stack>
          <LoopPanel
            loopVariables={loopVariables}
            page={page}
            subPage={subPage}
            iteration={iteration}
            lastReachedPage={lastReachedPage}
            getData={getData}
            goToPage={goToPage}
          />
        </Stack>
        <Stack className={classes.navBarContainer}>
          <NavBar
            page={page}
            maxPage={maxPage}
            subPage={subPage}
            nbSubPages={nbSubPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            isLastReachedPage={isLastReachedPage}
            readonly={readonly}
            goPrevious={goPreviousPage}
            goNext={goNextPage}
          />
        </Stack>
      </Stack>
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
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  activeSection: {
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
