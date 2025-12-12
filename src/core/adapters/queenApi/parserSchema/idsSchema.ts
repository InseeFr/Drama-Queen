import { z } from 'zod'

export const idsSchema = z.array(
  z.object({
    id: z.string(),
  }),
)
