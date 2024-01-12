import { prCore } from 'bootstrap'
import { redirect, type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

export async function surveyUnitLoader({ params }: LoaderFunctionArgs) {
  const { surveyUnit } = (await prCore).functions

  const surveyUnitId = params.surveyUnitId

  //surveyUnitId can't be undefined here (needed to match route)
  assert(surveyUnitId !== undefined)

  const questionnaireId = await surveyUnit.getSurveyWithSurveyUnit({
    surveyUnitId,
  })

  //TODO handle case when questionnaireId is undefined
  return redirect(
    `/questionnaire/${questionnaireId}/survey-unit/${surveyUnitId}`
  )
}
