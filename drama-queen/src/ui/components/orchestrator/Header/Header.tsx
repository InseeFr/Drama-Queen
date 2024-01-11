import { tss } from 'tss-react/mui';
import { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppsIcon from '@mui/icons-material/Apps';
import insee from '../../../assets/insee.png';
import { Menu } from '../Menu/Menu';
import { BreadCrumb } from '../Breadcrumb/Breadcrumb';

type HeaderProps = {};

export function Header(props: HeaderProps) {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <AppBar className={classes.root} elevation={0}>
      <div className={classes.headerMenu}>
        <IconButton className={classes.menuIcon} sx={{ color: open ? '#E30342' : 'black' }}>
          <AppsIcon onClick={() => setOpen(!open)} />
        </IconButton>
        <Menu open={open} setOpen={setOpen} />
      </div>
      <Button title="Retour au début du questionnaire">
        <img id="logo" src={insee} alt="Logo de L'Insee" className={classes.headerLogo} />
      </Button>
      <div className={classes.headerTitle}>
        <div className={classes.questionnaireTitle}>super titre</div>
        <BreadCrumb />
      </div>
      <div className={classes.headerClose}>
        <IconButton title="Quitter" className={classes.closeIcon}>
          <ExitToAppIcon />
        </IconButton>
      </div>
    </AppBar>
  );
}

const borderStyleHeader = '1px solid #777777';
const useStyles = tss.create(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    columnGap: '0.5em',
    borderBottom: `${borderStyleHeader}`,
  },
  menuIcon: {
    position: 'relative',
    padding: '7px',
    '& svg': { fontSize: '2em' },
  },
  headerClose: {
    marginLeft: 'auto',
    borderLeft: `${borderStyleHeader}`,
    width: '60px',
    height: '100%',
  },
  headerLogo: {
    height: '50px',
  },
  closeIcon: {
    color: 'black',
    padding: '5px',
    '& svg': { fontSize: '2em' },
  },
  headerTitle: {
    height: '100%',
    paddingLeft: '1em',
  },
  questionnaireTitle: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: '80%',
  },
  breadcrumb: {
    color: 'black',
  },
  headerMenu: {
    borderRight: `${borderStyleHeader}`,
    position: 'relative',
  },
}));
