import { ErrorComponent } from '@/components/ui/ErrorComponent'
import { useTranslation } from '@/i18n'

type Props = {
  error: Error
}

export function ErrorPage({ error }: Props) {
  const { t } = useTranslation('errorMessage')

  console.error(error)

  if (error instanceof Error) {
    return <ErrorComponent message={error.message} />
  }
  return <ErrorComponent message={t('shortUnknownError')} />
}
