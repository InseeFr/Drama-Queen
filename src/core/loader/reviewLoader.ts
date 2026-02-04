import { prCore } from '@/createCore'
import i18n from '@/libs/i18n'

type ReviewLoaderArgs = {
  params: {
    interrogationId?: string
  }
}

export async function reviewLoader({ params }: ReviewLoaderArgs) {
  const { userAuthentication } = (await prCore).functions
  const { reviewSurvey } = (await prCore).functions

  //Protect the route
  await userAuthentication.loginIfNotLoggedIn()

  const { interrogationId } = params
  if (interrogationId === undefined) {
    throw new Error(i18n.t('error.interrogationNotRetrievable'))
  }

  return reviewSurvey.loader({
    interrogationId,
  })
}
