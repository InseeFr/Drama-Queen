import { tss } from 'tss-react/mui'
import { useEffect, useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Stack, Typography } from '@mui/material'
import { SequenceNavigation } from './SequenceNavigation/SequenceNavigation'
import { SubSequenceNavigation } from './SubSequenceNavigation/SubSequenceNavigation'
import { StopNavigation } from './StopNavigation/StopNavigation'
import { MenuNavigationButton } from '../buttons/MenuNavigationButton/MenuNavigationButton'
import type { Overview, OverviewItem } from '../lunaticType'

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

type MenuItem = 'Enquête' | 'Arrêt'

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
  const [selectedMenuType, setSelectedMenuType] = useState<MenuItem>()
  const [selectedSequence, setSelectedSequence] = useState<OverviewItem>()
  const { classes, cx } = useStyles()

  const lunaticVersion = LUNATIC_VERSION.replace(/^\^/, '')

  const menuItems: Array<MenuItem> = readonly
    ? ['Enquête']
    : ['Enquête', 'Arrêt']

  useEffect(() => {
    // prevents drawer to stay extanded when reopening it
    if (!isDrawerOpen) {
      setSelectedMenuType(undefined)
    }
    // close the third menu panel when closing survey navigation
    if (selectedMenuType !== 'Enquête') {
      setSelectedSequence(undefined)
    }
  }, [isDrawerOpen, selectedMenuType])

  const toggleExpandedMenu = (type: MenuItem) => {
    if (selectedMenuType === type) {
      return setSelectedMenuType(undefined)
    }
    return setSelectedMenuType(type)
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
      <Stack className={classes.menuPanel}>
        <Stack className={classes.navigationContainer}>
          <Typography
            variant="overline"
            className={classes.goToNavigationTypography}
          >
            Allez vers ...
          </Typography>
          <Stack>
            {menuItems.map((type, index) => (
              <MenuNavigationButton
                key={`${type}-${index}`}
                className={
                  selectedMenuType === type ? classes.itemOpen : undefined
                }
                label={type}
                endIcon={<ChevronRightIcon />}
                autofocus={index === 0}
                onClick={() => toggleExpandedMenu(type)}
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
      {selectedMenuType && (
        <Stack className={cx(classes.expanded, classes.expandedMenu)}>
          <MenuNavigationButton
            label="Retour"
            startIcon={<ChevronLeftIcon />}
            autofocus
            onClick={() => toggleExpandedMenu(selectedMenuType)}
          />
          {selectedMenuType === 'Enquête' && (
            <Stack className={classes.navigationContainer}>
              <SequenceNavigation
                questionnaireTitle={questionnaireTitle}
                overview={overview}
                selectedSequence={selectedSequence}
                sequenceOnClick={sequenceOnClick}
              />
            </Stack>
          )}

          {selectedMenuType === 'Arrêt' && (
            <Stack className={classes.navigationContainer}>
              <StopNavigation quit={quit} definitiveQuit={definitiveQuit} />
            </Stack>
          )}
        </Stack>
      )}
      {selectedSequence && (
        <Stack className={classes.expanded}>
          <MenuNavigationButton
            label="Retour"
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
    width: '375px',
    borderLeft: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
  },
  expandedMenu: {
    backgroundColor: theme.palette.background.default,
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
