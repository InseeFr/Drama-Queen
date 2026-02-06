import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { ShortCut } from '@/components/ui/ShortCut'

type ContinueProps = {
  label: string
  endIcon: React.JSX.Element | undefined
  shortCutKey: string
  shortCutLabel: string
  onContinue: () => void
  isEnabled?: boolean
}

export function Continue({
  label,
  isEnabled = true,
  endIcon,
  shortCutKey,
  shortCutLabel,
  onContinue,
}: Readonly<ContinueProps>) {
  const { t } = useTranslation()

  return (
    <Stack direction={'row'} className="items-center gap-2">
      <Button
        className="bg-button-main text-secondary hover:bg-white hover:text-primary focus:bg-white focus:text-primary disabled:bg-transparent disabled:text-gray-600"
        endIcon={endIcon}
        onClick={onContinue}
        disabled={!isEnabled}
      >
        {label}
        {isEnabled ? (
          <ShortCut shortCutKey={shortCutKey} onClickMethod={onContinue} />
        ) : null}
      </Button>
      <Typography variant="caption" color="#777777">
        {t('navigation.continueButton.helper')}
      </Typography>
      <Typography variant="caption">{shortCutLabel}</Typography>
    </Stack>
  )
}