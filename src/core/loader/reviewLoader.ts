import { prCore } from '@/createCore'
import { getTranslation } from '@/i18n'

type ReviewLoaderArgs = {
  params: {
    interrogationId?: string
  }
}

export async function reviewLoader({ params }: ReviewLoaderArgs) {
  const { userAuthentication } = (await prCore).functions
  const { reviewSurvey } = (await prCore).functions

  const { t } = getTranslation('errorMessage')

  //Protect the route
  await userAuthentication.loginIfNotLoggedIn()

  const { interrogationId } = params
  if (interrogationId === undefined) {
    throw new Error(t('interrogationNotRetrievable'))
  }

  return reviewSurvey.loader({
    interrogationId,
  })
}
