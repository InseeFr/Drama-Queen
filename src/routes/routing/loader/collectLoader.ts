import { assert } from 'tsafe'

import { prCore } from '@/createCore'

type CollectLoaderArgs = {
  interrogationId?: string
  page?: string
}

export async function collectLoader({
  interrogationId,
  page,
}: CollectLoaderArgs) {
  assert(interrogationId !== undefined)

  const { collectSurvey } = (await prCore).functions

  return {
    ...(await collectSurvey.loader({
      interrogationId,
    })),
    page,
  }
}
