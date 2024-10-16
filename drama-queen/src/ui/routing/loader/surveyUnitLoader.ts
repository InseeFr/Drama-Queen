import { prCore } from 'createCore'
import { redirect, type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

export async function surveyUnitLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  const { collectSurvey } = (await prCore).functions

  const { surveyUnitId } = params
  assert(surveyUnitId !== undefined)
  const questionnaireId = await collectSurvey.retrieveQuestionnaireId({
    surveyUnitId,
  })

  if (!questionnaireId) {
    return null
  }

  return redirect(
    `/questionnaire/${questionnaireId}/survey-unit/${surveyUnitId}`
  )
}
