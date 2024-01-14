import { prCore } from 'bootstrap'
import type { LoaderFunctionArgs } from 'react-router-dom'

export async function protectedRouteLoader({ request }: LoaderFunctionArgs) {
  const { userAuthentication } = (await prCore).functions

  await userAuthentication.loginIfNotLoggedIn({
    redirectUri: request.url,
  })

  return null
}
