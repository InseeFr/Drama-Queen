import { tss } from 'tss-react/mui'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { dependencies, version } from '../../../../../package.json'
import { Stack, Typography } from '@mui/material'

type MenuProps = {
  isDrawerOpen: boolean
}
export function Menu(props: MenuProps) {
  const { isDrawerOpen } = props
  const [expanded, setExpanded] = useState(false)
  const { classes } = useStyles()
  //TO CHANGE
  const lunaticVersion = dependencies['@inseefr/lunatic'].replace('^', '')

  useEffect(() => {
    if (!isDrawerOpen) {
      setExpanded(false)
    }
  }, [isDrawerOpen])

  const toggleExpandedMenu = () => setExpanded(!expanded)

  return (
    <Stack className={classes.menuContainer}>
      <Stack className={classes.menuPanel}>
        <Stack className={classes.navigationContainer}>
          <Typography className={classes.goToNavigationTypography}>
            Allez vers ...
          </Typography>
          <Button
            className={classes.navigationButton}
            autoFocus
            size="small"
            disableRipple
            endIcon={<ChevronRightIcon />}
            onClick={toggleExpandedMenu}
          >
            Enquête
          </Button>
        </Stack>
        <Stack className={classes.version}>
          <Typography>
            Queen : {version} | Lunatic : {lunaticVersion}
          </Typography>
        </Stack>
      </Stack>
      {expanded && (
        <Stack className={classes.sequenceMenu}>
          <Button
            className={classes.navigationButton}
            autoFocus
            size="small"
            disableRipple
            startIcon={<ChevronLeftIcon />}
            onClick={toggleExpandedMenu}
          >
            Retour
          </Button>
          <Stack className={classes.navigationContainer}>
            <Typography>test</Typography>
          </Stack>
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
  sequenceMenu: {
    width: '375px',
    backgroundColor: theme.palette.background.default,
    borderLeft: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
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
