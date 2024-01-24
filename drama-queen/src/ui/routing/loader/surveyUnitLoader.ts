import { prCore } from 'bootstrap'
import { redirect, type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'
import { deferredLoader } from 'ui/routing/utils'


export async function surveyUnitLoader({ params }: LoaderFunctionArgs) {
  const { surveyMapping } = (await prCore).functions
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
