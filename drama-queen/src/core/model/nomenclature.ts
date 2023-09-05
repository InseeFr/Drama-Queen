import { z } from "zod";

export const NomenclatureSchema = z
  .object({
    id: z.string(),
    label: z.string(),
  })
  .passthrough()
  .array();

export type Nomenclature = z.infer<typeof NomenclatureSchema>;

export const RequiredNomenclaturesSchema = z.string().array();

export type RequiredNomenclatures = z.infer<typeof RequiredNomenclaturesSchema>;
