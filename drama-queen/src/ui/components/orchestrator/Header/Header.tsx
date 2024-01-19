import { tss } from 'tss-react/mui'
import { useEffect, type ReactNode } from 'react'
import { useState, useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AppsIcon from '@mui/icons-material/Apps'
import insee from 'ui/assets/insee.png'
import { Menu } from '../Menu/Menu'
import { BreadCrumb } from '../Breadcrumb/Breadcrumb'
import { Stack, SwipeableDrawer, Typography } from '@mui/material'

type HeaderProps = {
  questionnaireTitle: string
  hierarchy: {
    sequence: {
      label: ReactNode
      id: string
      page: string
    }
    subSequence?: {
      label: ReactNode
      id: string
      page: string
    }
  }
  goToPage: (page: {
    page: string
    iteration?: number
    nbIterations?: number
    subPage?: number
  }) => void
}

export function Header(props: HeaderProps) {
  const { questionnaireTitle, hierarchy, goToPage } = props
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { classes } = useStyles({ isDrawerOpen })

  const handleDrawerToggle = (open: boolean) => setIsDrawerOpen(open)
  const handleOpen = () => setIsDrawerOpen(true)
  const handleClose = () => setIsDrawerOpen(false)

  const goToFirstPage = () => goToPage({ page: '1' })

  return (
    <AppBar className={classes.root} elevation={0}>
      <Stack className={classes.headerMenu}>
        <IconButton className={classes.menuIcon}>
          <AppsIcon onClick={() => handleDrawerToggle(!isDrawerOpen)} />
        </IconButton>
      </Stack>
      <SwipeableDrawer
        className={classes.menu}
        open={isDrawerOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <Menu isDrawerOpen={isDrawerOpen} />
      </SwipeableDrawer>

      <Button title="Retour au début du questionnaire">
        <img
          id="logo"
          src={insee}
          alt="Logo de L'Insee"
          className={classes.headerLogo}
          onClick={goToFirstPage}
        />
      </Button>
      <Stack className={classes.headerTitle}>
        <Typography className={classes.questionnaireTitle} variant="h1">
          {questionnaireTitle}
        </Typography>
        <BreadCrumb hierarchy={hierarchy} goToPage={goToPage} />
      </Stack>
      <Stack className={classes.headerClose}>
        <IconButton title="Quitter" className={classes.closeIcon}>
          <ExitToAppIcon />
        </IconButton>
      </Stack>
    </AppBar>
  )
}

const borderStyleHeader = '1px solid #777777'

//TODO use theme color, space, border etc ...
const useStyles = tss
  .withParams<{ isDrawerOpen: boolean }>()
  .create(({ isDrawerOpen }) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      columnGap: '0.5em',
      borderBottom: borderStyleHeader,
    },
    menuIcon: {
      color: isDrawerOpen ? '#E30342' : 'black',
      '& svg': { fontSize: '2em' },
    },
    menu: {
      zIndex: 1000,
      fontFamily: "'Gotham SSm A', 'Gotham SSm B', sans-serif",
      '& .MuiDrawer-paper': {
        minWidth: '250px',
      },
    },
    headerClose: {
      marginLeft: 'auto',
      borderLeft: borderStyleHeader,
      width: '60px',
    },
    headerLogo: {
      height: '50px',
    },
    closeIcon: {
      color: 'black',
      '& svg': { fontSize: '2em' },
    },
    headerTitle: {
      paddingLeft: '1em',
    },
    questionnaireTitle: {
      color: 'black',
      textTransform: 'uppercase',
      fontSize: '80%',
    },
    headerMenu: {
      borderRight: borderStyleHeader,
    },
  }))
