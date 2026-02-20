import { AxiosError } from 'axios'

import i18n from '@/libs/i18n'

export function handleAxiosError(error: AxiosError) {
  if (!error.response) {
    error.message =
      "Une erreur s'est produite lors du traitement de la requête. Veuillez réessayer plus tard."
    return error
  }

  const status = error.response.status

  const messages: { [key: number]: string } = {
    400: i18n.t('error.errorCode.400'),
    401: i18n.t('error.errorCode.401'),
    403: i18n.t('error.errorCode.403'),
    404: i18n.t('error.errorCode.404'),
    500: i18n.t('error.errorCode.500'),
    502: i18n.t('error.errorCode.502'),
    503: i18n.t('error.errorCode.503'),
    504: i18n.t('error.errorCode.504'),
  }

  error.message = messages[status] || i18n.t('error.unknownError.long')

  return error
}
