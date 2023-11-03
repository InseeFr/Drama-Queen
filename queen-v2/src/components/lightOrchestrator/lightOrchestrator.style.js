import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'space-between',
  },
  mainTile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  activeView: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // fix css with a new <div/> elements needed for autoFocus
    '& > div:first-of-type': {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: 'inherit',
    },
    '& > div:first-of-type > div': {
      width: '80%',
      marginLeft: '100px',
      marginTop: '3em',
      overflow: 'auto',
      marginRight: 'auto',
      flexGrow: 1,
    },
  },
}));
