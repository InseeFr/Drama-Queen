import { z } from "zod";

const variableSchema = z
  .union([
    z.string(),
    z.number(),
    z.union([z.string().nullable(), z.number(), z.boolean()]).array(),
    z.boolean(),
  ])
  .nullable();

const collectedValueSchema = z.object({
  COLLECTED: variableSchema,
  EDITED: variableSchema,
  FORCED: variableSchema,
  INPUTED: variableSchema,
  PREVIOUS: variableSchema,
});

export const surveyUnitDataSchema = z
  .object({
    CALCULATED: z.record(variableSchema),
    EXTERNAL: z.record(variableSchema),
    COLLECTED: z.record(collectedValueSchema),
  })
  .partial();
