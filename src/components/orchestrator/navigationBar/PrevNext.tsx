import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'

import { useShortcut } from '@/components/orchestrator/hooks/useShortcut'
import { SHORTCUT_PREVIOUS } from '@/constants/shortcuts'
import { useTranslation } from '@/i18n'

type PrevNextProps = {
  isPreviousEnabled: boolean
  isNextEnabled: boolean
  onPrevious: () => void
  onNext: () => void
}

export function PrevNext({
  isPreviousEnabled,
  isNextEnabled,
  onPrevious,
  onNext,
}: PrevNextProps) {
  const { classes, cx } = useStyles()
  const { t } = useTranslation('navigationMessage')

  useShortcut(SHORTCUT_PREVIOUS, onPrevious, isPreviousEnabled)

  return (
    <Stack id="buttons" className={classes.root}>
      <Stack>
        <IconButton
          className={cx(classes.iconButton, classes.previousIcon)}
          size="large"
          disabled={!isPreviousEnabled}
          onClick={onPrevious}
          aria-label="previous"
        >
          <PlayArrowIcon fontSize="small" />
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
          aria-label="next"
        >
          <PlayArrowIcon fontSize="small" />
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
