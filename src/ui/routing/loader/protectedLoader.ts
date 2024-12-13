import { prCore } from '@/createCore'

export async function protectedRouteLoader() {
  const { userAuthentication } = (await prCore).functions

  await userAuthentication.loginIfNotLoggedIn()

  return null
}
