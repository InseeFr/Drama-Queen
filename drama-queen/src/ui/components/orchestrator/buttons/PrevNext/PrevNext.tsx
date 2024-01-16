import { tss } from 'tss-react/mui'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

type PrevNextProps = {
  goPrevious: () => void
  goNext: (payload?: {} | undefined) => void
}

export function PrevNext(props: PrevNextProps) {
  const { goPrevious, goNext } = props
  const { classes } = useStyles()

  return (
    <div id="buttons" className={classes.root}>
      <div className={classes.navigation}>
        <IconButton
          className={`${classes.iconButton} ${classes.previousIcon}`}
          size="large"
          onClick={goPrevious}
        >
          <PlayArrowIcon fontSize="small" />
        </IconButton>
        <span className={classes.buttonSpan}>PREC.</span>
      </div>
      <div className={classes.navigation}>
        <IconButton
          className={classes.iconButton}
          size="large"
          onClick={goNext}
        >
          <PlayArrowIcon fontSize="small" />
        </IconButton>
        <span className={classes.buttonSpan}>SUIV.</span>
      </div>
    </div>
  )
}

const useStyles = tss.create(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5em',
  },
  buttonSpan: {
    color: '#777777',
    fontSize: '13px',
    display: 'block',
    width: 'min-content',
    margin: 'auto',
  },
  navigation: { textAlign: 'right' },
  previousIcon: { transform: 'rotate(180deg)' },
  iconButton: {
    backgroundColor: '#9FC5F8',
    color: 'black',
    '&:hover,&:focus': {
      backgroundColor: 'white',
    },
    fontSize: 13,
  },
}))
