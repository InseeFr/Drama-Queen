/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import type { Oidc } from 'core/ports/Oidc'

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_QUEEN_URL: string
  readonly VITE_QUEEN_V2_URL: string
  readonly VITE_QUEEN_API_URL: string
  readonly VITE_OIDC_ISSUER: Oidc.Common['params']['issuerUri']
  readonly VITE_OIDC_CLIENT_ID: Oidc.Common['params']['clientId']
  readonly VITE_APP_VERSION: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
