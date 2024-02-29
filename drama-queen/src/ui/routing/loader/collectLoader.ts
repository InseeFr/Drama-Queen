import { prCore } from 'bootstrap'
import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'
import { READ_ONLY } from 'ui/constants'

export async function collectLoader({ request, params }: LoaderFunctionArgs) {
  const { userAuthentication } = (await prCore).functions

  //Protect the route
  await userAuthentication.loginIfNotLoggedIn({
    redirectUri: request.url,
  })

  const { questionnaireId, surveyUnitId } = params

  //TODO : calculate standalone
  const standalone = false

  assert(questionnaireId !== undefined)
  assert(surveyUnitId !== undefined)

  const { collectSurvey } = (await prCore).functions

  return collectSurvey.collectLoader({
    questionnaireId,
    surveyUnitId,
    standalone,
  })
}
