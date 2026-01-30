import { prCore } from '@/createCore'

type VisualizeLoaderArgs = {
  location: {
    href: string
  }
}

export async function visualizeLoader({ location }: VisualizeLoaderArgs) {
  // TODO: Check if it's the right thing to do
  const fullUrl = location.href.startsWith('http')
    ? location.href
    : `${window.location.origin}${location.href}`

  console.log('toto', fullUrl)
  const { visualizeSurvey } = (await prCore).functions
  return visualizeSurvey.loader({ requestUrl: fullUrl })
}
