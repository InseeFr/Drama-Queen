import { id } from 'tsafe/id'

import type { Oidc } from '@/core/ports/Oidc'

export function createOidc(params: {
  isUserLoggedIn: boolean
}): () => Promise<Oidc> {
  const { isUserLoggedIn } = params

  async function getOidc() {
    return getMockedOidc(isUserLoggedIn)
  }

  return getOidc
}

/**
 * Returns a mocked OIDC instance based on the user's login status.
 *
 * @param {boolean} isUserLoggedIn - Indicates whether the user is logged in.
 * @returns {Oidc} A mocked OIDC instance.
 *
 */
export const getMockedOidc = (isUserLoggedIn: boolean) => {
  if (!isUserLoggedIn) {
    return id<Oidc.NotLoggedIn>({
      isUserLoggedIn: false,
      login: () => new Promise<never>(() => {}),
    })
  }

  return id<Oidc.LoggedIn>({
    isUserLoggedIn: true,
    logout: () => new Promise<never>(() => {}),
    getTokens: () => ({
      accessToken: '',
      idToken: '',
      refreshToken: '',
      refreshTokenExpirationTime: Infinity,
    }),
  })
}
