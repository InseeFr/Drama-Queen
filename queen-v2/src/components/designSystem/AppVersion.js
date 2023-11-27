import { makeStyles } from '@material-ui/core';
import { LUNATIC_VERSION, QUEEN_VERSION } from 'utils/constants';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid black',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    padding: '2px 0 2px 0',
  },
});

export const AppVersion = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>{`Queen : ${QUEEN_VERSION} | Lunatic : ${LUNATIC_VERSION}`}</div>
  );
};
