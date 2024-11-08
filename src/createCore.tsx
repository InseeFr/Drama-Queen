import { createCoreProvider } from 'core'

export const { CoreProvider, prCore } = createCoreProvider({
  apiUrl: import.meta.env.VITE_QUEEN_API_URL,
  oidcParams: {
    issuerUri: import.meta.env.VITE_OIDC_ISSUER,
    clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  },
})
