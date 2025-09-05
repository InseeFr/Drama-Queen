import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

import { prCore } from '@/createCore'

export async function reviewLoader({ params }: LoaderFunctionArgs) {
  const { userAuthentication } = (await prCore).functions
  const { reviewSurvey } = (await prCore).functions

  //Protect the route
  await userAuthentication.loginIfNotLoggedIn()

  const { surveyUnitId } = params
  assert(surveyUnitId !== undefined)

  return reviewSurvey.loader({
    surveyUnitId,
  })
}
