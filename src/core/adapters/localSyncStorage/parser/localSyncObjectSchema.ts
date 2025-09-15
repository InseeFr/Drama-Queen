import { type Equals, assert } from 'tsafe'
import { z } from 'zod'

import type { LocalStorageObject } from '@/core/ports/LocalSyncStorage'

export const localStorageObjectSchema = z.object({
  error: z.boolean(),
  interrogationsSuccess: z.array(z.string()),
  interrogationsInTempZone: z.array(z.string()),
})

assert<Equals<z.infer<typeof localStorageObjectSchema>, LocalStorageObject>>()
