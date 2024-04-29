import { tss } from 'tss-react/mui'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { SHORTCUT_NEXT, SHORTCUT_PREVIOUS } from 'ui/constants'
import { ShortCut } from '../ShortCut/ShortCut'
import { useTranslation } from 'i18n'

type PrevNextProps = {
  isPreviousEnabled: boolean
  isNextEnabled: boolean
  onPrevious: () => void
  onNext: () => void
}

export function PrevNext(props: PrevNextProps) {
  const { isPreviousEnabled, isNextEnabled, onPrevious, onNext } = props
  const { classes, cx } = useStyles()
  const { t } = useTranslation('navigationMessage')

  const previousShortCutKey = SHORTCUT_PREVIOUS
  const nextShortCutKey = SHORTCUT_NEXT

  return (
    <Stack id="buttons" className={classes.root}>
      <Stack>
        <IconButton
          className={cx(classes.iconButton, classes.previousIcon)}
          size="large"
          disabled={!isPreviousEnabled}
          onClick={onPrevious}
        >
          <PlayArrowIcon fontSize="small" />
          {isPreviousEnabled && (
            <ShortCut
              shortCutKey={previousShortCutKey}
              onClickMethod={onPrevious}
            />
          )}
        </IconButton>
        <Typography variant="body2" className={classes.helpLabel}>
          {t('previousHelper')}
        </Typography>
      </Stack>

      <Stack>
        <IconButton
          className={classes.iconButton}
          size="large"
          disabled={!isNextEnabled}
          onClick={onNext}
        >
          <PlayArrowIcon fontSize="small" />
          {isNextEnabled && (
            <ShortCut shortCutKey={nextShortCutKey} onClickMethod={onNext} />
          )}
        </IconButton>
        <Typography variant="body2" className={classes.helpLabel}>
          {t('nextHelper')}
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
