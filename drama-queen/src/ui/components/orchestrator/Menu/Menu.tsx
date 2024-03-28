import { tss } from 'tss-react/mui'
import { useEffect, useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SequenceNavigation } from './SequenceNavigation/SequenceNavigation'
import { SubSequenceNavigation } from './SubSequenceNavigation/SubSequenceNavigation'
import { StopNavigation } from './StopNavigation/StopNavigation'
import { MenuNavigationButton } from '../buttons/MenuNavigationButton/MenuNavigationButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Overview, OverviewItem } from '../lunaticType'
import { useTranslation } from 'i18n/i18n'

type MenuProps = {
  isDrawerOpen: boolean
  readonly: boolean
  questionnaireTitle: string
  overview: Overview
  goToPage: (page: {
    page: string
    iteration?: number
    nbIterations?: number
    subPage?: number
  }) => void
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  quit: () => void
  definitiveQuit: () => void
}

type MenuItem = {
  type: 'survey' | 'stop'
  label: string
}

export function Menu(props: MenuProps) {
  const {
    isDrawerOpen,
    readonly,
    questionnaireTitle,
    overview,
    goToPage,
    setIsDrawerOpen,
    quit,
    definitiveQuit,
  } = props
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    MenuItem | undefined
  >(undefined)
  const [selectedSequence, setSelectedSequence] = useState<
    OverviewItem | undefined
  >(undefined)

  const { classes, theme, cx } = useStyles()
  const { t } = useTranslation('navigationMessage')

  const matchesMdBreackpoint = useMediaQuery(theme.breakpoints.up('md'))

  const lunaticVersion = LUNATIC_VERSION.replace(/^\^/, '')

  const menuItems: MenuItem[] = [
    { type: 'survey', label: t('surveyButton') },
    ...(readonly ? [] : [{ type: 'stop', label: t('stopButton') } as MenuItem]),
  ]

  useEffect(() => {
    // prevents drawer to stay extanded when reopening it
    if (!isDrawerOpen) {
      setSelectedMenuItem(undefined)
    }
    // close the third menu panel when closing survey navigation
    if (selectedMenuItem?.type !== 'survey') {
      setSelectedSequence(undefined)
    }
  }, [isDrawerOpen, selectedMenuItem])

  const toggleExpandedMenu = (menuItem: MenuItem) => {
    if (selectedMenuItem?.type === menuItem.type) {
      return setSelectedMenuItem(undefined)
    }
    return setSelectedMenuItem(menuItem)
  }

  const toggleExpandedSubMenu = (sequence: OverviewItem) => {
    if (selectedSequence === sequence) {
      return setSelectedSequence(undefined)
    }
    return setSelectedSequence(sequence)
  }

  // closes the menu and redirects to the first page of the sequence
  function goToComponent(component: OverviewItem) {
    goToPage({ page: component.page })
    setIsDrawerOpen(false)
  }

  // click on a sequence in the second menu panel
  const sequenceOnClick = (sequence: OverviewItem) => {
    // sequence has subsequences, clicking on it extends the menu with a third panel
    if (sequence.children.length > 0) {
      if (!selectedSequence || selectedSequence === sequence) {
        return toggleExpandedSubMenu(sequence)
      }
      return setSelectedSequence(sequence)
    }
    // sequence has no subsequence, clicking on it closes the menu and redirects to the first page of the sequence
    goToComponent(sequence)
  }

  // click on a sequence/subsequence in the third menu panel closes the menu and redirects to the first page of the sequence/subsequence
  const subSequenceOnClick = (component: OverviewItem) => {
    goToComponent(component)
  }

  return (
    <Stack className={classes.menuContainer}>
      {(!selectedMenuItem || matchesMdBreackpoint) && (
        <Stack className={classes.menuPanel}>
          <Stack className={classes.navigationContainer}>
            <Typography
              variant="overline"
              className={classes.goToNavigationTypography}
            >
              {t('goTo')}
            </Typography>
            <Stack>
              {menuItems.map((menuItem, index) => (
                <MenuNavigationButton
                  key={`${menuItem.type}-${index}`}
                  className={
                    selectedMenuItem === menuItem ? classes.itemOpen : undefined
                  }
                  label={menuItem.label}
                  endIcon={<ChevronRightIcon />}
                  autofocus={index === 0}
                  onClick={() => toggleExpandedMenu(menuItem)}
                />
              ))}
            </Stack>
          </Stack>
          <Stack className={classes.version}>
            <Typography>
              Queen : {import.meta.env.VITE_APP_VERSION} | Lunatic :{' '}
              {lunaticVersion}
            </Typography>
          </Stack>
        </Stack>
      )}
      {selectedMenuItem && (!selectedSequence || matchesMdBreackpoint) && (
        <Stack className={cx(classes.expanded, classes.expandedMenu)}>
          <MenuNavigationButton
            label={t('back')}
            startIcon={<ChevronLeftIcon />}
            autofocus
            onClick={() => toggleExpandedMenu(selectedMenuItem)}
          />
          {selectedMenuItem.type === 'survey' && (
            <Stack className={classes.navigationContainer}>
              <SequenceNavigation
                questionnaireTitle={questionnaireTitle}
                overview={overview}
                selectedSequence={selectedSequence}
                sequenceOnClick={sequenceOnClick}
              />
            </Stack>
          )}

          {selectedMenuItem.type === 'stop' && (
            <Stack className={classes.navigationContainer}>
              <StopNavigation quit={quit} definitiveQuit={definitiveQuit} />
            </Stack>
          )}
        </Stack>
      )}
      {selectedSequence && (
        <Stack className={classes.expanded}>
          <MenuNavigationButton
            label={t('back')}
            startIcon={<ChevronLeftIcon />}
            autofocus
            onClick={() => toggleExpandedSubMenu(selectedSequence)}
          />
          <Stack className={classes.navigationContainer}>
            <SubSequenceNavigation
              sequence={selectedSequence}
              subSequenceOnClick={subSequenceOnClick}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  menuContainer: {
    flexDirection: 'row',
    height: '100%',
    paddingTop: '65px',
  },
  menuPanel: {
    width: '250px',
    justifyContent: 'space-between',
  },
  expanded: {
    width: '250px',
    [theme.breakpoints.up('lg')]: {
      width: '375px',
    },
    borderLeft: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
  },
  expandedMenu: {
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.background.default,
    },
  },
  navigationContainer: { gap: '1.5em', marginTop: '30px' },
  itemOpen: { backgroundColor: theme.palette.background.button.light },
  goToNavigationTypography: {
    color: theme.palette.info.main,
    lineHeight: '1.5em',
    paddingLeft: '1.2em',
    marginTop: '30px',
  },
  version: {
    backgroundColor: theme.palette.background.default,
    borderTop: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
    position: 'relative',
    left: 0,
    bottom: 0,
    textAlign: 'center',
    paddingTop: '2px',
    paddingBottom: '2px',
  },
}))
