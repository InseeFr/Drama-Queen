import { type LoaderFunctionArgs } from 'react-router-dom'
import { assert } from 'tsafe'

import type { PageTag } from '@/core/model'
import { isPageTag } from '@/core/tools/pageTag'
import { prCore } from '@/createCore'

export async function collectLoader({ params, request }: LoaderFunctionArgs) {
  const { surveyUnitId } = params
  assert(surveyUnitId !== undefined)

  let page: PageTag | undefined
  if (request) {
    const pageParam = new URL(request.url).searchParams.get('page')
    if (pageParam && isPageTag(pageParam)) {
      page = pageParam
    }
  }

  const { collectSurvey } = (await prCore).functions

  const questionnaireId = await collectSurvey.retrieveQuestionnaireId({
    surveyUnitId,
  })

  assert(questionnaireId !== undefined)

  return {
    ...(await collectSurvey.loader({
      questionnaireId,
      surveyUnitId,
    })),
    page,
  }
}
