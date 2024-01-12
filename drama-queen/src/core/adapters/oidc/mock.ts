import { Oidc } from 'core/ports/Oidc'
import { id } from 'tsafe/id'

export function createOidc(params: { isUserLoggedIn: boolean }): Oidc {
  const common: Oidc.Common = {
    params: {
      issuerUri: '',
      clientId: '',
    },
  }

  if (!params.isUserLoggedIn) {
    return id<Oidc.NotLoggedIn>({
      ...common,
      isUserLoggedIn: false,
      login: (params: { redirectUri: string | undefined }) => {
        return new Promise<never>(() => {})
      },
    })
  }

  return id<Oidc.LoggedIn>({
    ...common,
    isUserLoggedIn: true,
    getTokens: () => ({
      accessToken: '',
      idToken: '',
      refreshToken: '',
      refreshTokenExpirationTime: Infinity,
    }),
    renewTokens: () => Promise.reject('Not implemented'),
    logout: () => new Promise<never>(() => {}),
  })
}
