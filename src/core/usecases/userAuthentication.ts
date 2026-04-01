import type { Thunks } from '@/core/bootstrap'

import { getParentGetAccessToken } from '../sharedAuth'

export const name = 'userAuthentication'

export const reducer = null

export const thunks = {
  loginIfNotLoggedIn:
    () =>
    async (...args) => {
      const [, , { getOidc }] = args

      const parentGetAccessToken = getParentGetAccessToken()

      if (parentGetAccessToken) return

      const oidc = await getOidc()

      if (oidc.isUserLoggedIn) {
        return
      }

      await oidc.login()
    },
} satisfies Thunks
