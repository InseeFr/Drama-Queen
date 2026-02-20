import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

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
  const { classes } = useStyles()
  const { t } = useTranslation()

  return (
    <Stack direction={'row'} className={classes.continueWrapper}>
      <Button
        className={classes.button}
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

const useStyles = tss.create(({ theme }) => ({
  continueWrapper: {
    alignItems: 'center',
    gap: '0.5em',
  },
  button: {
    backgroundColor: theme.palette.background.button.main,
    color: theme.palette.secondary.main,
    '&:hover,&:focus': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
    },
    '&:disabled': {
      backgroundColor: 'transparent',
      color: theme.palette.grey[600],
    },
  },
}))
