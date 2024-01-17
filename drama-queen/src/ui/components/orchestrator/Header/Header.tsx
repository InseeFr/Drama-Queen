import { tss } from 'tss-react/mui'
import { useState, useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AppsIcon from '@mui/icons-material/Apps'
import insee from '../../../assets/insee.png'
import { Menu } from '../Menu/Menu'
import { BreadCrumb } from '../Breadcrumb/Breadcrumb'
import { Stack, Typography } from '@mui/material'

type HeaderProps = {
  questionnaireTitle: string
  hierarchy?: {
    sequence?: {
      label: React.ReactNode
      id: string
      page: string
    }
    subSequence?:
      | {
          label: React.ReactNode
          id: string
          page: string
        }
      | undefined
  }
  goToPage: (page: {
    page: string
    iteration?: number | undefined
    nbIterations?: number | undefined
    subPage?: number | undefined
  }) => void
}

export function Header(props: HeaderProps) {
  const { questionnaireTitle, hierarchy, goToPage } = props
  const { classes } = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <AppBar className={classes.root} elevation={0}>
      <Stack className={classes.headerMenu}>
        <IconButton
          className={classes.menuIcon}
          sx={{ color: open ? '#E30342' : 'black' }}
        >
          <AppsIcon onClick={() => setOpen(!open)} />
        </IconButton>
      </Stack>
      <Menu open={open} setOpen={setOpen} />
      <Button title="Retour au début du questionnaire">
        <img
          id="logo"
          src={insee}
          alt="Logo de L'Insee"
          className={classes.headerLogo}
          onClick={() => goToPage({ page: '1' })}
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
const useStyles = tss.create(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    columnGap: '0.5em',
    borderBottom: borderStyleHeader,
  },
  menuIcon: {
    '& svg': { fontSize: '2em' },
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
