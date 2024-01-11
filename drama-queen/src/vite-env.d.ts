/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { Oidc } from 'core/ports/Oidc'
interface ImportMetaEnv {
  readonly VITE_QUEEN_URL: string
  readonly VITE_QUEEN_V2_URL: string
  readonly VITE_QUEEN_API_URL: string
  readonly VITE_OIDC_ISSUER: Oidc.Common['params']['issuerUri']
  readonly VITE_OIDC_CLIENT_ID: Oidc.Common['params']['clientId']
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
