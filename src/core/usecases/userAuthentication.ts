import { type Thunks, isStandAlone } from '@/core/bootstrap'

export const name = 'userAuthentication'

export const reducer = null

export const thunks = {
  loginIfNotLoggedIn:
    () =>
    async (...args) => {
      const [, , { getOidc }] = args

      if (!isStandAlone) return

      const oidc = await getOidc()

      if (oidc.isUserLoggedIn) {
        return
      }

      await oidc.login()
    },
} satisfies Thunks
