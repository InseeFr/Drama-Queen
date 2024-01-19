import { tss } from 'tss-react/mui'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Stack, Typography } from '@mui/material'

type PrevNextProps = {
  isFirstPage: boolean
  isLastPage: boolean
  isLastReachedPage: boolean
  goPrevious: () => void
  goNext: (payload?: {} | undefined) => void
}

export function PrevNext(props: PrevNextProps) {
  const { isFirstPage, isLastPage, isLastReachedPage, goPrevious, goNext } =
    props
  const { classes } = useStyles()

  return (
    <Stack id="buttons" className={classes.root}>
      <Stack>
        <IconButton
          className={`${classes.iconButton} ${classes.previousIcon}`}
          size="large"
          disabled={isFirstPage}
          onClick={goPrevious}
        >
          <PlayArrowIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="body2"
          align="center"
          className={classes.buttonHelp}
        >
          PREC.
        </Typography>
      </Stack>

      <Stack>
        <IconButton
          className={classes.iconButton}
          size="large"
          disabled={isLastReachedPage}
          onClick={goNext}
        >
          <PlayArrowIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="body2"
          align="center"
          className={classes.buttonHelp}
        >
          SUIV.
        </Typography>
      </Stack>
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  root: {
    gap: '1.5em',
  },
  previousIcon: { transform: 'rotate(180deg)' },
  iconButton: {
    backgroundColor: '#9FC5F8',
    color: 'black',
    '&:hover,&:focus': {
      backgroundColor: 'white',
    },
  },
  buttonHelp: { color: '#777777' },
}))
