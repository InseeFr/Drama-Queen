import { tss } from 'tss-react/mui'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Stack, Typography } from '@mui/material'
import { SHORTCUT_NEXT, SHORTCUT_PREVIOUS } from 'ui/constants'
import { ShortCut } from '../ShortCut/ShortCut'

type PrevNextProps = {
  isFirstPage: boolean
  isLastPage: boolean
  isLastReachedPage: boolean
  readonly: boolean
  goPrevious: () => void
  goNext: (payload?: {} | undefined) => void
}

export function PrevNext(props: PrevNextProps) {
  const {
    isFirstPage,
    isLastPage,
    isLastReachedPage,
    readonly,
    goPrevious,
    goNext,
  } = props
  const { classes } = useStyles()

  const canGoNext = (!isLastReachedPage || readonly) && !isLastPage
  const canGoPrevious = !isFirstPage

  const previousShortCutKey = SHORTCUT_PREVIOUS
  const nextShortCutKey = SHORTCUT_NEXT

  return (
    <Stack id="buttons" className={classes.root}>
      <Stack>
        <IconButton
          className={`${classes.iconButton} ${classes.previousIcon}`}
          size="large"
          disabled={!canGoPrevious}
          onClick={goPrevious}
        >
          <PlayArrowIcon fontSize="small" />
          {canGoPrevious && (
            <ShortCut
              shortCutKey={previousShortCutKey}
              onClickMethod={goPrevious}
            />
          )}
        </IconButton>
        <Typography variant="body2" className={classes.helpLabel}>
          PREC.
        </Typography>
      </Stack>

      <Stack>
        <IconButton
          className={classes.iconButton}
          size="large"
          disabled={!canGoNext}
          onClick={goNext}
        >
          <PlayArrowIcon fontSize="small" />
          {canGoNext && (
            <ShortCut shortCutKey={nextShortCutKey} onClickMethod={goNext} />
          )}
        </IconButton>
        <Typography variant="body2" className={classes.helpLabel}>
          SUIV.
        </Typography>
      </Stack>
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  root: {
    gap: '1.5em',
  },
  previousIcon: { transform: 'rotate(180deg)' },
  iconButton: {
    backgroundColor: theme.palette.background.button.light,
    color: 'black',
    '&:hover,&:focus': {
      backgroundColor: 'white',
    },
  },
  helpLabel: {
    textAlign: 'center',
    color: theme.palette.info.main,
  },
}))
