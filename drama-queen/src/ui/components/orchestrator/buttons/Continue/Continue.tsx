import { Button, Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { ShortCut } from '../ShortCut/ShortCut'
import { t } from 'i18n/build-dictionary'

type ContinueProps = {
  label: string
  endIcon: JSX.Element | undefined
  shortCutKey: string
  shortCutLabel: string
  onContinue: () => void
}

export function Continue(props: ContinueProps) {
  const { label, endIcon, shortCutKey, shortCutLabel, onContinue } = props
  const { classes } = useStyles()

  return (
    <Stack direction={'row'} className={classes.continueWrapper}>
      <Button className={classes.button} endIcon={endIcon} onClick={onContinue}>
        {label}
        <ShortCut shortCutKey={shortCutKey} onClickMethod={onContinue} />
      </Button>
      <Typography variant="caption" color="#777777">
        {t('continueHelper')}
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
  },
}))
