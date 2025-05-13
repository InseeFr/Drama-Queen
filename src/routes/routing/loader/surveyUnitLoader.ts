import { type LoaderFunctionArgs, redirect } from 'react-router-dom'
import { assert } from 'tsafe'

import { prCore } from '@/createCore'

export async function surveyUnitLoader({ params }: LoaderFunctionArgs) {
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
    `/questionnaire/${questionnaireId}/survey-unit/${surveyUnitId}`,
  )
}
