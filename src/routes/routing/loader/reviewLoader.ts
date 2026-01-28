import { prCore } from '@/createCore'

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

  assert(interrogationId !== undefined)

  return reviewSurvey.loader({
    interrogationId,
  })
}
