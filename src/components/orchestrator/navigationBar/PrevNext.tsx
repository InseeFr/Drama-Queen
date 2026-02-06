import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Stack id="buttons" className="gap-6">
      <Stack>
        <IconButton
          className="bg-button-light text-back hover:bg-white focus:bg-white rotate-180"
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
        <Typography variant="body2" className="text-center text-info">
          {t('navigation.navigationBar.previousButton.helper')}
        </Typography>
      </Stack>

      <Stack>
        <IconButton
          className="bg-button-light text-black hover:bg-white focus:bg-white"
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
        <Typography variant="body2" className="text-center text-info">
          {t('navigation.navigationBar.nextButton.helper')}
        </Typography>
      </Stack>
    </Stack>
  )
}