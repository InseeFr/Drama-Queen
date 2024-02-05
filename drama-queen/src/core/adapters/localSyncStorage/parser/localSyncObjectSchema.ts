import type { LocalStorageObject } from 'core/ports/LocalSyncStorage'
import { type Equals, assert } from 'tsafe'
import { z } from 'zod'

export const localStorageObjectSchema = z.object({
  error: z.boolean(),
  surveyUnitsSuccess: z.array(z.string()),
  surveyUnitsInTempZone: z.array(z.string()),
})

assert<Equals<z.infer<typeof localStorageObjectSchema>, LocalStorageObject>>()
