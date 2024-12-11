import { z } from 'zod'

export const nomenclatureSchema = z.array(
  z
    .object({
      id: z.string(),
      label: z.string(),
    })
    .catchall(z.string())
)

export const requiredNomenclaturesSchema = z.string().array()
