import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

type ErrorComponentProps = {
  message: string
}

export function ErrorComponent({ message }: Readonly<ErrorComponentProps>) {

  const { t } = useTranslation()

  return (
    <Stack className="p-12 text-center">
      <Typography className="text-red-500" variant="h3">
        {t('error.errorOccured')}
      </Typography>
      <Typography className="mt-8" variant="h4">
        {message}
      </Typography>
    </Stack>
  )
}