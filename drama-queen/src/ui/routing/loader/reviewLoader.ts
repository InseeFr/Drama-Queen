import { prCore } from 'createCore'
import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

export async function reviewLoader({ request, params }: LoaderFunctionArgs) {
  const { userAuthentication } = (await prCore).functions

  //Protect the route
  await userAuthentication.loginIfNotLoggedIn({
    redirectUri: request.url,
  })

  const { questionnaireId, surveyUnitId } = params

  assert(questionnaireId !== undefined)
  assert(surveyUnitId !== undefined)

  const { reviewSurvey } = (await prCore).functions

  return reviewSurvey.loader({
    questionnaireId,
    surveyUnitId,
  })
}
