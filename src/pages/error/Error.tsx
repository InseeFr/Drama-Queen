import { useTranslation } from 'react-i18next'

import { ErrorComponent } from '@/components/ui/ErrorComponent'

type Props = {
  error: Error
}

export function ErrorPage({ error }: Props) {
  const { t } = useTranslation()

  console.error(error)

  if (error instanceof Error) {
    return <ErrorComponent message={error.message} />
  }
  return <ErrorComponent message={t('error.unknownError.short')} />
}
