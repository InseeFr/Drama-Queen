import type { Oidc } from 'core/ports/Oidc'
import { createOidc as createOidcSpa } from 'oidc-spa'

export async function createOidc(params: {
  issuerUri: string
  clientId: string
}): Promise<Oidc> {
  const { issuerUri, clientId } = params

  const oidc = await createOidcSpa({
    issuerUri,
    clientId,
    publicUrl: undefined,
  })

  if (oidc.isUserLoggedIn) {
    return {
      ...oidc,
      logout: () => oidc.logout({ redirectTo: 'home' }),
    }
  }

  return {
    ...oidc,
    login: () => {
      return oidc.login({
        doesCurrentHrefRequiresAuth: true,
      })
    },
  }
}
