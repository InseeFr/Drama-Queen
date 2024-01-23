import { Header } from './Header/Header'
import { NavBar } from './NavBar/NavBar'
import { tss } from 'tss-react/mui'
import { form } from './form'
import {
  type LunaticData,
  useLunatic,
  LunaticComponents,
} from '@inseefr/lunatic'
import { Stack } from '@mui/material'
import { useLunaticStyles } from './lunaticStyle'
import { Continue } from './buttons/Continue/Continue'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { SkipNext } from '@mui/icons-material'

const source = form
const data = {} as LunaticData
const missingShortcut = { dontKnow: 'f2', refused: 'f4' }

export function Orchestrator() {
  const { classes } = useStyles()

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
  } = useLunatic(source, data, {
    shortcut: true,
    withOverview: true,
    missing: true,
    dontKnowButton: 'Ne sait pas',
    missingShortcut: missingShortcut,
  })

  const { maxPage, page, subPage, nbSubPages, lastReachedPage } = pager

  const questionnaireTitle = source.label.value

  const components = getComponents()
  const hierarchy = components[0]?.hierarchy
  const { classes: lunaticClasses } = useLunaticStyles()

  const isLastReachedPage = () => {
    if (lastReachedPage === undefined) {
      return true
    }
    return pageTag === lastReachedPage
  }

  const continueGoToPage = () => {
    if (isLastPage) {
      // handle case for quit
    } else {
      if (isLastReachedPage()) {
        goNextPage()
      } else {
        const splitLastReachedPage =
          lastReachedPage?.replace(/\./g, '#').split('#') || []
        const formattedLastReachedPage = {
          page: splitLastReachedPage[0],
          subPage:
            splitLastReachedPage[1] === undefined
              ? undefined
              : parseFloat(splitLastReachedPage[1]) - 1,
          iteration:
            splitLastReachedPage[2] === undefined
              ? undefined
              : parseFloat(splitLastReachedPage[2]) - 1,
        }
        goToPage(formattedLastReachedPage)
      }
    }
  }

  const continueLabel = () => {
    if (isLastPage) {
      return 'valider et quitter'
    }
    if (isLastReachedPage()) {
      return 'continuer'
    }
    return "suite de l'entretien"
  }

  const continueEndIcon = () => {
    if (!isLastPage) {
      if (isLastReachedPage()) {
        return <ArrowRightAltIcon />
      }
      return <SkipNext fontSize="large" />
    }
  }

  const continueShortCutLabel = isLastReachedPage()
    ? 'alt + ENTRÉE'
    : 'alt + fin'

  return (
    <Stack className={classes.orchestrator}>
      <Header
        questionnaireTitle={questionnaireTitle}
        hierarchy={hierarchy}
        goToPage={goToPage}
      />
      <Stack className={classes.bodyContainer}>
        <Stack className={classes.mainContainer}>
          <Stack className={classes.activeSection}>
            <Provider>
              <LunaticComponents
                components={components}
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
            <Continue
              label={continueLabel()}
              endIcon={continueEndIcon()}
              shortCutLabel={continueShortCutLabel}
              goToPage={continueGoToPage}
            />
          </Stack>
        </Stack>
        <Stack className={classes.navBarContainer}>
          <NavBar
            page={page}
            maxPage={maxPage}
            subPage={subPage}
            nbSubPages={nbSubPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            isLastReachedPage={isLastReachedPage()}
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
