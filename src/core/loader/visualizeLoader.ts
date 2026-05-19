import { protectedRouteLoader } from '@/core/loader/protectedLoader'
import { prCore } from '@/createCore'

export type VisualizeLoaderArgs = {
  location: {
    publicHref: string
  }
}

export async function visualizeLoader({ location }: VisualizeLoaderArgs) {
  await protectedRouteLoader()

  const { visualizeSurvey } = (await prCore).functions

  const fullUrl = location.publicHref.startsWith('http')
    ? location.publicHref
    : `${window.location.origin}${location.publicHref}`

  return visualizeSurvey.loader({ requestUrl: fullUrl })
}
