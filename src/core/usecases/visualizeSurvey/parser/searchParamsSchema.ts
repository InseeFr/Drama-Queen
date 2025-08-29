import { z } from 'zod'

export const searchParamsSchema = z.object({
  questionnaire: z.string().optional(),
  data: z.string().optional(),
  nomenclature: z.record(z.string(), z.string()).optional(),
  readonly: z.boolean().optional(),
})
