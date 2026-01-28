import { prCore } from '@/createCore'

type VisualizeLoaderArgs = {
  location: {
    href: string
  }
}

export async function visualizeLoader({ location }: VisualizeLoaderArgs) {
  console.log('toto', location.href)
  const { visualizeSurvey } = (await prCore).functions
  return visualizeSurvey.loader({ requestUrl: location.href })
}
