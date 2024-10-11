import { AxiosError } from 'axios'
import { getTranslation } from 'i18n'

const { t } = getTranslation('errorMessage')

export function handleAxiosError(error: AxiosError) {
  if (!error.response) {
    error.message =
      "Une erreur s'est produite lors du traitement de la requête. Veuillez réessayer plus tard."
    return error
  }

  const status = error.response.status

  const messages: { [key: number]: string } = {
    400: t('400'),
    401: t('401'),
    403: t('403'),
    404: t('404'),
    500: t('500'),
    502: t('502'),
    503: t('503'),
    504: t('504'),
  }

  error.message = messages[status] || t('longUnknownError')

  return error
}
