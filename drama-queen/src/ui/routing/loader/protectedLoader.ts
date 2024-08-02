import { prCore } from 'createCore'
import type { LoaderFunctionArgs } from 'react-router-dom'

export async function protectedRouteLoader() {
  const { userAuthentication } = (await prCore).functions

  await userAuthentication.loginIfNotLoggedIn()

  return null
}
