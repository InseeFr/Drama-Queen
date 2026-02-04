import type { PageTag } from '@/core/model'
import { isPageTag } from '@/core/tools/pageTag'
import { prCore } from '@/createCore'
import i18n from '@/libs/i18n'

export type CollectLoaderArgs = {
  interrogationId?: string
  page?: string
}

export async function collectLoader({
  interrogationId,
  page,
}: CollectLoaderArgs) {
  if (interrogationId === undefined) {
    throw new Error(i18n.t('error.interrogationNotRetrievable'))
  }

  const pageValue = page ?? ''
  const pageWithTag: PageTag | undefined = isPageTag(pageValue)
    ? pageValue
    : undefined

  const { collectSurvey } = (await prCore).functions

  return {
    ...(await collectSurvey.loader({
      interrogationId,
    })),
    page: pageWithTag,
  }
}
