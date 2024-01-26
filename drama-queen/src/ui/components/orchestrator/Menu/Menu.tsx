import { tss } from 'tss-react/mui'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Stack, Typography } from '@mui/material'
import { OverviewItem } from '@inseefr/lunatic/lib/src/use-lunatic/commons/getOverview'
import { SequenceNavigation } from './SequenceNavigation/SequenceNavigation'
import { SubSequenceNavigation } from './SubSequenceNavigation/SubSequenceNavigation'

type MenuProps = {
  isDrawerOpen: boolean
  readonly: boolean
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
}
export function Menu(props: MenuProps) {
  const { isDrawerOpen, readonly, overview, goToPage, setIsDrawerOpen } = props
  const [surveyOpen, setSurveyOpen] = useState(false)
  const [stopOpen, setStopOpen] = useState(false)
  const [sequenceOpen, setSequenceOpen] = useState(false)
  const [selectedSequence, setSelectedSequence] = useState<OverviewItem>()
  const { classes } = useStyles()

  const lunaticVersion = LUNATIC_VERSION.replace(/^\^/, '')

  const menuItems: Array<'Enquête' | 'Arrêt'> = readonly
    ? ['Enquête']
    : ['Enquête', 'Arrêt']

  useEffect(() => {
    if (!isDrawerOpen) {
      setSurveyOpen(false)
      setStopOpen(false)
    }
    if (!surveyOpen) {
      setSequenceOpen(false)
      setSelectedSequence(undefined)
    }
  }, [isDrawerOpen, surveyOpen])

  function toggleExpandedMenu(type: string) {
    if (type === 'Enquête') {
      setStopOpen(false)
      setSurveyOpen(!surveyOpen)
    } else if (type === 'Arrêt') {
      setSurveyOpen(false)
      setStopOpen(!stopOpen)
    }
  }

  function toggleExpandedSubMenu() {
    setSequenceOpen(!sequenceOpen)
  }

  const sequenceOnClick = (sequence: OverviewItem) => {
    if (sequence.children.length > 0) {
      if (!selectedSequence || selectedSequence === sequence) {
        toggleExpandedSubMenu()
      }
      setSelectedSequence(sequence)
    } else {
      goToPage({ page: sequence.page })
      setIsDrawerOpen(false)
    }
  }

  const subSequenceOnClick = (component: OverviewItem) => {
    goToPage({ page: component.page })
    setIsDrawerOpen(false)
  }

  return (
    <Stack className={classes.menuContainer}>
      <Stack className={classes.menuPanel}>
        <Stack className={classes.navigationContainer}>
          <Typography className={classes.goToNavigationTypography}>
            Allez vers ...
          </Typography>
          {menuItems.map((type) => (
            <Button
              className={classes.navigationButton}
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
        <Stack className={classes.version}>
          <Typography>
            Queen : {APP_VERSION} | Lunatic : {lunaticVersion}
          </Typography>
        </Stack>
      </Stack>
      {(surveyOpen || stopOpen) && (
        <Stack className={`${classes.expanded} ${classes.expandedMenu}`}>
          <Button
            className={classes.navigationButton}
            autoFocus
            size="small"
            disableRipple
            startIcon={<ChevronLeftIcon />}
            onClick={() => toggleExpandedMenu(surveyOpen ? 'Enquête' : 'Arrêt')}
          >
            Retour
          </Button>

          {surveyOpen && (
            <Stack className={classes.navigationContainer}>
              <SequenceNavigation
                overview={overview}
                sequenceOnClick={sequenceOnClick}
              />
            </Stack>
          )}
        </Stack>
      )}
      {selectedSequence && sequenceOpen && (
        <Stack className={classes.expanded}>
          <Button
            className={classes.navigationButton}
            autoFocus
            size="small"
            disableRipple
            startIcon={<ChevronLeftIcon />}
            onClick={() => toggleExpandedSubMenu()}
          >
            Retour
          </Button>
          <SubSequenceNavigation
            sequence={selectedSequence}
            subSequenceOnClick={subSequenceOnClick}
          />
        </Stack>
      )}
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  menuHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    paddingTop: '65px',
  },
  menuPanel: {
    display: 'flex',
    flexDirection: 'column',
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
  navigationContainer: { marginTop: '60px' },
  navigationButton: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    color: theme.palette.primary.main,
    paddingLeft: '15px',
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
  goToNavigationTypography: {
    fontSize: '80%',
    color: theme.palette.info.main,
    textTransform: 'uppercase',
    paddingLeft: '1.2em',
  },
  version: {
    backgroundColor: 'whitesmoke',
    borderTop: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
    position: 'relative',
    left: 0,
    bottom: 0,
    textAlign: 'center',
    paddingTop: '2px',
    paddingBottom: '2px',
  },
}))
