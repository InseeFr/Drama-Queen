import { tss } from 'tss-react/mui'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Stack, Typography } from '@mui/material'
import { OverviewItem } from '@inseefr/lunatic/lib/src/use-lunatic/commons/getOverview'
import { SequenceNavigation } from './SequenceNavigation/SequenceNavigation'
import { SubSequenceNavigation } from './SubSequenceNavigation/SubSequenceNavigation'
import { StopNavigation } from './StopNavigation/StopNavigation'

type MenuProps = {
  isDrawerOpen: boolean
  readonly: boolean
  questionnaireTitle: string
  overview: {
    lunaticId: string
    page: string
    type: string
    label: string
    visible: boolean
    reached: boolean
    children: OverviewItem[]
  }[]
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
  const { classes } = useStyles()

  const lunaticVersion = LUNATIC_VERSION.replace(/^\^/, '')

  const menuItems: Array<MenuItem> = readonly
    ? ['Enquête']
    : ['Enquête', 'Arrêt']

  useEffect(() => {
    if (!isDrawerOpen) {
      setSelectedMenuType(undefined)
    }
    if (selectedMenuType !== 'Enquête') {
      setSelectedSequence(undefined)
    }
  }, [isDrawerOpen, selectedMenuType])

  const toggleExpandedMenu = (type: MenuItem) => {
    if (selectedMenuType === type) {
      setSelectedMenuType(undefined)
    } else {
      setSelectedMenuType(type)
    }
  }

  const toggleExpandedSubMenu = (sequence: OverviewItem) => {
    if (selectedSequence === sequence) {
      setSelectedSequence(undefined)
    } else {
      setSelectedSequence(sequence)
    }
  }

  const sequenceOnClick = (sequence: OverviewItem) => {
    if (sequence.children.length > 0) {
      if (!selectedSequence || selectedSequence === sequence) {
        toggleExpandedSubMenu(sequence)
      } else {
        setSelectedSequence(sequence)
      }
    } else {
      goToPage({ page: sequence.page })
      setIsDrawerOpen(false)
    }
  }

  const subSequenceOnClick = (component: OverviewItem) => {
    goToPage({ page: component.page })
    setIsDrawerOpen(false)
  }

  const isMenuItemOpen = (type: MenuItem) => {
    return selectedMenuType === type
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
            {menuItems.map((type) => (
              <Button
                className={`${classes.navigationButton} ${
                  isMenuItemOpen(type) && classes.itemOpen
                }`}
                autoFocus
                size="small"
                disableRipple
                endIcon={<ChevronRightIcon />}
                onClick={() => toggleExpandedMenu(type)}
              >
                {type}
              </Button>
            ))}
          </Stack>
        </Stack>
        <Stack className={classes.version}>
          <Typography>
            Queen : {APP_VERSION} | Lunatic : {lunaticVersion}
          </Typography>
        </Stack>
      </Stack>
      {selectedMenuType && (
        <Stack className={`${classes.expanded} ${classes.expandedMenu}`}>
          <Button
            className={classes.navigationButton}
            autoFocus
            size="small"
            disableRipple
            startIcon={<ChevronLeftIcon />}
            onClick={() => toggleExpandedMenu(selectedMenuType)}
          >
            Retour
          </Button>

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
          <Button
            className={classes.navigationButton}
            autoFocus
            size="small"
            disableRipple
            startIcon={<ChevronLeftIcon />}
            onClick={() => toggleExpandedSubMenu(selectedSequence)}
          >
            Retour
          </Button>
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
  navigationButton: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: theme.palette.primary.main,
    paddingLeft: '1.2em',
    borderRadius: 0,
    '&:hover, &:focus': {
      fontWeight: 'bold',
      backgroundColor: theme.palette.background.button.light,
    },
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: '10px',
    },
  },
  itemOpen: { backgroundColor: theme.palette.background.button.light },
  goToNavigationTypography: {
    color: theme.palette.info.main,
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
