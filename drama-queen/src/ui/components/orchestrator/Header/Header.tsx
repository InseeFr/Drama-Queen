import AppsIcon from '@mui/icons-material/Apps'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'i18n'
import { useState, type ReactNode } from 'react'
import { tss } from 'tss-react/mui'
import { SHORCUT_MENU, SHORTCUT_QUIT } from 'ui/constants'
import { BreadCrumb } from '../Breadcrumb/Breadcrumb'
import { Menu } from '../Menu/Menu'
import { ShortCut } from '../buttons/ShortCut/ShortCut'
import type { GoToPage, Overview } from '../lunaticType'
import { DYNAMIC_PUBLIC_URL } from 'core'

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
  iteration: number | undefined
  readonly: boolean
  overview: Overview
  goToPage: GoToPage
  quit: () => void
  definitiveQuit: () => void
}

export function Header(props: HeaderProps) {
  const {
    questionnaireTitle,
    hierarchy,
    iteration,
    readonly,
    overview,
    goToPage,
    quit,
    definitiveQuit,
  } = props
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { classes } = useStyles({ isDrawerOpen })
  const { t } = useTranslation('navigationMessage')

  const menuShortKey = SHORCUT_MENU
  const quitShortKey = SHORTCUT_QUIT

  const handleDrawerToggle = (open: boolean) => setIsDrawerOpen(open)
  const handleOpen = () => setIsDrawerOpen(true)
  const handleClose = () => setIsDrawerOpen(false)

  const goToFirstPage = () => goToPage({ page: '1' })

  return (
    <AppBar className={classes.root} elevation={0}>
      <Stack className={classes.headerMenu}>
        <IconButton
          className={classes.menuIcon}
          onClick={() => handleDrawerToggle(!isDrawerOpen)}
        >
          <AppsIcon />
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
          questionnaireTitle={questionnaireTitle}
          overview={overview}
          goToPage={goToPage}
          setIsDrawerOpen={setIsDrawerOpen}
          quit={quit}
          definitiveQuit={definitiveQuit}
        />
      </SwipeableDrawer>

      <Button title={t('backToQuestionnaireStart')}>
        <img
          id="logo"
          src={`${DYNAMIC_PUBLIC_URL}/assets/insee.png`}
          alt="Logo de L'Insee"
          className={classes.headerLogo}
          onClick={goToFirstPage}
        />
      </Button>
      <Stack className={classes.headerTitle}>
        <Typography className={classes.questionnaireTitle} variant="h1">
          {questionnaireTitle}
        </Typography>
        <BreadCrumb
          hierarchy={hierarchy}
          iteration={iteration}
          goToPage={goToPage}
        />
      </Stack>
      <Stack className={classes.headerClose}>
        <IconButton
          title={t('quit')}
          className={classes.closeIcon}
          onClick={quit}
        >
          <ExitToAppIcon />
          <ShortCut shortCutKey={quitShortKey} onClickMethod={quit} />
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
