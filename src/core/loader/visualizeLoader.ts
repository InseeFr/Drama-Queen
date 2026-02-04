import { prCore } from '@/createCore'

export type VisualizeLoaderArgs = {
  location: {
    publicHref: string
  }
}

export async function visualizeLoader({ location }: VisualizeLoaderArgs) {
  const fullUrl = location.publicHref.startsWith('http')
    ? location.publicHref
    : `${window.location.origin}${location.publicHref}`

  const { visualizeSurvey } = (await prCore).functions
  return visualizeSurvey.loader({ requestUrl: fullUrl })
}
