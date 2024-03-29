import { AxiosError } from 'axios'
import { getTranslation } from 'i18n'

const { t } = getTranslation('errorMessage')

export function handleAxiosError(error: AxiosError) {
  if (!error.response) {
    throw new AxiosError(
      "Une erreur s'est produite lors du traitement de la requête. Veuillez réessayer plus tard."
    )
  }
  const status = error.response.status
  switch (status) {
    case 400:
      throw new AxiosError(t('400'))
    case 401:
      throw new AxiosError(t('401'))
    case 403:
      throw new AxiosError(t('403'))
    case 404:
      throw new AxiosError(t('404'))
      break
    case 500:
      throw new AxiosError(t('500'))
    case 502:
      throw new AxiosError(t('502'))
    case 503:
      throw new AxiosError(t('503'))
    case 504:
      throw new AxiosError(t('504'))
    default:
      throw new AxiosError(t('longUnknownError'))
  }
}
