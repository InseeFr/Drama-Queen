import { createCoreProvider } from '@/core'
import { CORE_PROVIDER_CONTEXT } from '@/core/constants'

export const { CoreProvider, prCore } = createCoreProvider(
  CORE_PROVIDER_CONTEXT,
)
