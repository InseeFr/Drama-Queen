import type { Oidc } from 'core/ports/Oidc'
import { createOidc as createOidcSpa } from 'oidc-spa'

export async function createOidc(params: {
  issuerUri: string
  clientId: string
  publicUrl: string
}): Promise<Oidc> {
  const { issuerUri, clientId, publicUrl } = params

  const oidc = await createOidcSpa({
    issuerUri,
    clientId,
    publicUrl,
  })

  if (oidc.isUserLoggedIn) {
    return {
      ...oidc,
      logout: () => oidc.logout({ redirectTo: 'home' }),
    }
  }

  return {
    ...oidc,
    login: ({ redirectUri }) => {
      if (redirectUri === undefined) {
        return oidc.login({
          doesCurrentHrefRequiresAuth: false,
        })
      } else {
        history.pushState({}, '', redirectUri)
        return oidc.login({
          doesCurrentHrefRequiresAuth: true,
        })
      }
    },
  }
}
