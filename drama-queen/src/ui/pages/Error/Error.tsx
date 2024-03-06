import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ErrorComponent } from 'ui/components/ErrorComponent'

export function ErrorPage() {
  const error = useRouteError()

  if (error instanceof Error) {
    return <ErrorComponent message={error.message} />
  }

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent
        message={`Erreur ${error.status} : 
        ${error.error?.message}`}
      />
    )
  }
  return <ErrorComponent message="Erreur inconnue" />
}
