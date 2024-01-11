import { tss } from 'tss-react/mui'
import Button from '@mui/material/Button'
import { useState } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { dependencies, version } from '../../../../../package.json'

type MenuProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Menu(props: MenuProps) {
  const { open, setOpen } = props
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const { classes } = useStyles()
  const lunaticVersion = dependencies['@inseefr/lunatic'].replace('^', '')

  function openCloseMenu() {
    setSubMenuOpen(false)
    setOpen(!open)
  }

  function openCloseSubMenu() {
    setSubMenuOpen(!subMenuOpen)
  }

  return (
    <SwipeableDrawer
      className={classes.menu}
      open={open}
      onClose={openCloseMenu}
      onOpen={openCloseMenu}
    >
      <div className={classes.menuContainer}>
        <div className={classes.menuPanel}>
          <div className={classes.navigationContainer}>
            <span className={classes.goToNavigationSpan}>Allez vers ...</span>
            <div>
              <IconButton onClick={openCloseSubMenu}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
          <div
            className={classes.version}
          >{`Queen : ${version} | Lunatic : ${lunaticVersion}`}</div>
        </div>
        {subMenuOpen && (
          <div className={classes.sequenceMenu}>
            <Button autoFocus onClick={openCloseSubMenu}>
              <span>{'\u3008'} Retour</span>
            </Button>
            <div className={classes.navigationContainer}>
              <span>test</span>
            </div>
          </div>
        )}
      </div>
    </SwipeableDrawer>
  )
}

const useStyles = tss.create(() => ({
  menuHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  menu: {
    zIndex: 1000,
    '& .MuiDrawer-paper': {
      minWidth: '250px',
    },
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    paddingTop: '60px',
  },
  menuPanel: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    justifyContent: 'space-between',
    borderRight: '1px solid #777777',
  },
  sequenceMenu: {
    width: '375px',
    backgroundColor: '#eeeeee',
  },
  navigationContainer: { marginTop: '60px' },
  goToNavigationSpan: {
    fontSize: '80%',
    color: '#777777',
    textTransform: 'uppercase',
    paddingLeft: '1.2em',
  },
  version: {
    backgroundColor: 'whitesmoke',
    borderTop: '1px solid #777777',
    position: 'relative',
    left: 0,
    bottom: 0,
    textAlign: 'center',
    paddingTop: '2px',
    paddingBottom: '2px',
  },
}))
