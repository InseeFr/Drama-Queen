/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare const APP_VERSION: string;
interface ImportMetaEnv {
  readonly VITE_QUEEN_URL: string;
  readonly VITE_QUEEN_V2_URL: string;
  readonly VITE_CAMPAIGN_ID_V2: string[];
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
