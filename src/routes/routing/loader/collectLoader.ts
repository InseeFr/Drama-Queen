import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

import { prCore } from '@/createCore'

export async function collectLoader({ params }: LoaderFunctionArgs) {
  const { questionnaireId, surveyUnitId } = params

  assert(questionnaireId !== undefined)
  assert(surveyUnitId !== undefined)

  const { collectSurvey } = (await prCore).functions

  return collectSurvey.loader({
    questionnaireId,
    surveyUnitId,
  })
}
