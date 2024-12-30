import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

import { prCore } from '@/createCore'

export async function collectLoader({ params, request }: LoaderFunctionArgs) {
  const { questionnaireId, surveyUnitId } = params

  assert(questionnaireId !== undefined)
  assert(surveyUnitId !== undefined)

  let page: undefined | string
  if (request) {
    page = new URL(request.url).searchParams.get('page') ?? undefined
  }

  const { collectSurvey } = (await prCore).functions

  return {
    ...(await collectSurvey.loader({
      questionnaireId,
      surveyUnitId,
    })),
    page,
  }
}
