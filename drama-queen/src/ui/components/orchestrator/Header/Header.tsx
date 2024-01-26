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
import { ShortCut } from '../buttons/ShortCut/ShortCut'
import { SHORCUT_MENU, SHORTCUT_QUIT } from 'ui/constants'
import { OverviewItem } from '@inseefr/lunatic/lib/src/use-lunatic/commons/getOverview'

type HeaderProps = {
  questionnaireTitle: string
  hierarchy?: {
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
}

export function Header(props: HeaderProps) {
  const { questionnaireTitle, hierarchy, readonly, overview, goToPage } = props
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { classes } = useStyles({ isDrawerOpen })

  const menuShortKey = SHORCUT_MENU
  const quitShortKey = SHORTCUT_QUIT

  const handleDrawerToggle = (open: boolean) => setIsDrawerOpen(open)
  const handleOpen = () => setIsDrawerOpen(true)
  const handleClose = () => setIsDrawerOpen(false)

  const goToFirstPage = () => goToPage({ page: '1' })

  return (
    <AppBar className={classes.root} elevation={0}>
      <Stack className={classes.headerMenu}>
        <IconButton className={classes.menuIcon}>
          <AppsIcon onClick={() => handleDrawerToggle(!isDrawerOpen)} />
          <ShortCut
            shortCutKey={menuShortKey}
            onClickMethod={() => handleDrawerToggle(!isDrawerOpen)}
          />
        </IconButton>
      </Stack>
      <SwipeableDrawer
        className={classes.menu}
        open={isDrawerOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <Menu
          isDrawerOpen={isDrawerOpen}
          readonly={readonly}
          overview={overview}
          goToPage={goToPage}
          setIsDrawerOpen={setIsDrawerOpen}
        />
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
          {/* <ShortCut shortCutKey={quitShortKey} onClickMethod={} /> */}
        </IconButton>
      </Stack>
    </AppBar>
  )
}

const useStyles = tss
  .withParams<{ isDrawerOpen: boolean }>()
  .create(({ theme, isDrawerOpen }) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      columnGap: '0.5em',
      borderBottom: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
    },
    menuIcon: {
      color: isDrawerOpen ? '#E30342' : 'black',
      '& svg': { fontSize: '2em' },
    },
    menu: {
      zIndex: 1000,
      '& .MuiDrawer-paper': {
        minWidth: '250px',
      },
    },
    headerClose: {
      marginLeft: 'auto',
      borderLeft: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
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
      borderRight: `${theme.border.borderWidth} solid ${theme.border.borderColor}`,
    },
  }))
