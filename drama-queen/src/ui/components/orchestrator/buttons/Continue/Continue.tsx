import { Button, Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { ShortCut } from '../ShortCut/ShortCut'

type ContinueProps = {
  label: string
  endIcon: JSX.Element | undefined
  shortCutKey: string
  shortCutLabel: string
  goToPage: () => void
}

export function Continue(props: ContinueProps) {
  const { label, endIcon, shortCutKey, shortCutLabel, goToPage } = props
  const { classes } = useStyles()

  return (
    <Stack direction={'row'} className={classes.continueWrapper}>
      <Button className={classes.button} endIcon={endIcon} onClick={goToPage}>
        {label}
        <ShortCut shortCutKey={shortCutKey} onClickMethod={goToPage} />
      </Button>
      <Typography variant="caption" color="#777777">
        appuyer sur
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
