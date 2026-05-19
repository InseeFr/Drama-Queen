import { prCore } from '@/createCore'

export type VisualizeLoaderArgs = {
  location: {
    publicHref: string
  }
}

export async function visualizeLoader({ location }: VisualizeLoaderArgs) {
  const { userAuthentication, visualizeSurvey } = (await prCore).functions

  await userAuthentication.loginIfNotLoggedIn()

  const fullUrl = location.publicHref.startsWith('http')
    ? location.publicHref
    : `${window.location.origin}${location.publicHref}`

  return visualizeSurvey.loader({ requestUrl: fullUrl })
}
