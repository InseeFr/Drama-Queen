import type { Thunks } from '@/core/bootstrap'

export const name = 'userAuthentication'

export const reducer = null

export const thunks = {
  loginIfNotLoggedIn:
    () =>
    async (...args) => {
      const [, , { getOidc }] = args

      const oidc = await getOidc()

      if (oidc.isUserLoggedIn) {
        return
      }

      await oidc.login()
    },
} satisfies Thunks
