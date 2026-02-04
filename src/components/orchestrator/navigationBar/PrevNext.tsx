import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

import { SHORTCUT_NEXT, SHORTCUT_PREVIOUS } from '@/constants/shortcuts'

import { ShortCut } from '../../ui/ShortCut'

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
  const { t } = useTranslation()

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
          {isPreviousEnabled && (
            <ShortCut
              shortCutKey={SHORTCUT_PREVIOUS}
              onClickMethod={onPrevious}
            />
          )}
        </IconButton>
        <Typography variant="body2" className={classes.helpLabel}>
          {t('navigation.navigationBar.previousButton.helper')}
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
          {isNextEnabled && (
            <ShortCut shortCutKey={SHORTCUT_NEXT} onClickMethod={onNext} />
          )}
        </IconButton>
        <Typography variant="body2" className={classes.helpLabel}>
          {t('navigation.navigationBar.nextButton.helper')}
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
