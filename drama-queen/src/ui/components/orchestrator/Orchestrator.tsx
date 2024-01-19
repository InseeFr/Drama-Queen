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

  const continueLabel = isLastReachedPage()
    ? 'continuer'
    : "suite de l'entretien"

  const continueEndIcon = isLastReachedPage() ? (
    <ArrowRightAltIcon />
  ) : (
    <SkipNext fontSize="large" />
  )

  const continueShortCutLabel = isLastReachedPage()
    ? 'Alt + ENTRÉE'
    : 'Alt + fin'

  return (
    <Stack className={classes.orchestrator}>
      <Header
        questionnaireTitle={questionnaireTitle}
        hierarchy={hierarchy}
        goToPage={goToPage}
      />
      <Stack className={classes.bodyContainer}>
        <Stack className={classes.mainContainer}>
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
          <Continue
            label={continueLabel}
            endIcon={continueEndIcon}
            shortCutLabel={continueShortCutLabel}
            goToPage={continueGoToPage}
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
            isLastReachedPage={isLastReachedPage()}
            goPrevious={goPreviousPage}
            goNext={goNextPage}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  orchestrator: {
    fontFamily: "'Gotham SSm A', 'Gotham SSm B', 'sans-serif'",
  },
  bodyContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    paddingTop: '60px',
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
  },
  mainContainer: { flexGrow: 1 },
  navBarContainer: {
    justifyContent: 'flex-end',
    gap: '2em',
    paddingBottom: '2em',
    alignItems: 'center',
    borderLeft: '1px solid #777777',
    width: '60px',
    height: '100%',
  },
}))
