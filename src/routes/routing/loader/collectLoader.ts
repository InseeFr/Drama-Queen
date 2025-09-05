import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

import { prCore } from '@/createCore'

export async function collectLoader({ params }: LoaderFunctionArgs) {
  const { collectSurvey } = (await prCore).functions

  const { surveyUnitId } = params
  assert(surveyUnitId !== undefined)

  const questionnaireId = await collectSurvey.retrieveQuestionnaireId({
    surveyUnitId,
  })

  assert(questionnaireId !== undefined)

  return collectSurvey.loader({
    questionnaireId,
    surveyUnitId,
  })
}
