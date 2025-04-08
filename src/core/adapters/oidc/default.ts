import { createOidc as createOidcSpa } from 'oidc-spa'

import type { Oidc } from '@/core/ports/Oidc'

import { getMockedOidc } from './mock'

export function createOidc(params: {
  issuerUri: string
  clientId: string
}): () => Promise<Oidc> {
  const { issuerUri, clientId } = params

  let oidc: Awaited<ReturnType<typeof createOidcSpa>> | null = null // Store oidc to avoid recreating it each time

  async function initializeOidc() {
    if (oidc === null) {
      if (!navigator.onLine) {
        // When offline, we fallback to mocked OIDC. All resources must be in cache or served by the service worker. When making HTTP requests, we do not need a token as the service worker will respond.
        return getMockedOidc(true)
      }
      try {
        oidc = await createOidcSpa({
          issuerUri,
          clientId,
          homeUrl: '/queen',
        })
      } catch (e) {
        console.error(e)
        throw new Error(`Failed to initialize OIDC: ${e}`)
      }
    }
    return oidc
  }

  async function getOidc(): Promise<Oidc> {
    const initializedOidc = await initializeOidc()
    if (initializedOidc.isUserLoggedIn) {
      return {
        isUserLoggedIn: true as const,
        logout: () => initializedOidc.logout({ redirectTo: 'home' }),
        // @ts-expect-error: If the user is logged in, we can assume that the tokens are available
        getTokens: initializedOidc.getTokens,
      }
    }

    return {
      isUserLoggedIn: false as const,
      login: () => initializedOidc.login({ doesCurrentHrefRequiresAuth: true }),
    }
  }

  return getOidc
}
