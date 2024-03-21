import { Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'

export function ErrorComponent(props: { message: string }) {
  const { message } = props

  const { classes } = useStyles()

  return (
    <Stack className={classes.errorContainer}>
      <Typography className={classes.errorTitle} variant="h3">
        Une erreur est survenue
      </Typography>
      <Typography className={classes.errorMessage} variant="h4">
        {message}
      </Typography>
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  errorContainer: { padding: '3em', textAlign: 'center' },
  errorTitle: {
    color: theme.palette.error.main,
  },
  errorMessage: { marginTop: '2em' },
}))
