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
  //TODO: Handle network errors 

  // if (error.status && error.statusText) {
  //   return (
  //     <ErrorComponent
  //       message={`${t('error')} ${error.status} : ${error.statusText}`}
  //     />
  //   )
  // }
  return <ErrorComponent message={t('shortUnknownError')} />
}
