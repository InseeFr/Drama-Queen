export const DYNAMIC_PUBLIC_URL = new URL(import.meta.url).origin
export const EXTERNAL_RESOURCES_URL = import.meta.env
  ?.VITE_EXTERNAL_RESOURCES_URL
export const LUNATIC_MODEL_VERSION_BREAKING = '2.2.10'
export const IS_TELEMETRY_ENABLED =
  import.meta.env.VITE_TELEMETRY_ENABLED === 'true'
