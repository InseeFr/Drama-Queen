import { assert } from 'tsafe/assert'
import type { Thunks } from 'core/bootstrap'

export const name = 'userAuthentication'

export const reducer = null

export const thunks = {
  loginIfNotLoggedIn:
    (params: { redirectUri: string }) =>
    async (...args) => {
      const { redirectUri } = params
      const [, , { oidc }] = args

      if (oidc.isUserLoggedIn) {
        return
      }

      await oidc.login({ redirectUri })
    },
} satisfies Thunks
