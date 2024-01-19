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

  const { maxPage, page, subPage, nbSubPages } = pager

  const questionnaireTitle = source.label.value

  const components = getComponents()
  const hierarchy = components[0]?.hierarchy
  const { classes: lunaticClasses } = useLunaticStyles()



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
