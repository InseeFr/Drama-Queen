import { prCore } from '@/createCore'
import { getTranslation } from '@/i18n'


export type CollectLoaderArgs = {
  interrogationId?: string
  page?: string
}

export async function collectLoader({
  interrogationId,
  page,
}: CollectLoaderArgs) {

  const { t } = getTranslation('errorMessage')
  if (interrogationId === undefined) {
    throw new Error(t('interrogationNotRetrievable'))
  }

  const { collectSurvey } = (await prCore).functions

  return {
    ...(await collectSurvey.loader({
      interrogationId,
    })),
    page,
  }
}
