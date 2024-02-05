import { prCore } from 'bootstrap'
import { redirect, type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

export async function surveyUnitLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  const { surveyMapping, userAuthentication } = (await prCore).functions

  //Protect the route
  await userAuthentication.loginIfNotLoggedIn({
    redirectUri: request.url,
  })


  const { surveyUnitId } = params
  assert(surveyUnitId !== undefined)
  const questionnaireId = await surveyMapping.retrieveQuestionnaireId({
    surveyUnitId,
  })

  if (!questionnaireId) {
    return null
  }

  return redirect(
    `/questionnaire/${questionnaireId}/survey-unit/${surveyUnitId}`
  )
}
