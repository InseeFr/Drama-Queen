import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { useTranslation } from '@/i18n'
import { ErrorComponent } from '@/ui/components/ErrorComponent'

export function ErrorPage() {
  const { t } = useTranslation('errorMessage')
  const error = useRouteError()

  console.error(error)

  if (error instanceof Error) {
    return <ErrorComponent message={error.message} />
  }

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent
        message={`${t('error')} ${error.status} : ${error.statusText}`}
      />
    )
  }
  return <ErrorComponent message={t('shortUnknownError')} />
}
