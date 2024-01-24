import { prCore } from 'bootstrap'
import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

export async function collectLoader({ params }: LoaderFunctionArgs) {
  const { questionnaireId, surveyUnitId } = params

  assert(questionnaireId !== undefined)
  assert(surveyUnitId !== undefined)

  const { surveyMapping } = (await prCore).functions

  return surveyMapping.collectLoader({ questionnaireId, surveyUnitId })
}
