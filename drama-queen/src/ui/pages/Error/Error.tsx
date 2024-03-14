import { useTranslation } from 'i18n/i18n'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ErrorComponent } from 'ui/components/ErrorComponent'

export function ErrorPage() {
  const { t } = useTranslation('errorMessage')
  const error = useRouteError()

  if (error instanceof Error) {
    return <ErrorComponent message={error.message} />
  }

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent
        message={`${t('error')} ${error.status} : 
        ${error.error?.message}`}
      />
    )
  }
  return <ErrorComponent message={t('shortUnknownError')} />
}
