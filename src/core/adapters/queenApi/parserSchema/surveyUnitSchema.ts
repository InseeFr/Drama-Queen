import { z } from 'zod'

import type { SurveyUnit } from '@/core/model'
import { isPageTag } from '@/core/tools/pageTag'

import { surveyUnitDataSchema } from './surveyUnitDataSchema'

export const idAndQuestionnaireIdSchema = z.object({
  id: z.string(),
  questionnaireId: z.string(),
})

// PageTag being literal type, zod currently does not support it we need to force the type with a refine
const stateDataSchema = z.object({
  state: z
    .enum(['INIT', 'COMPLETED', 'VALIDATED', 'TOEXTRACT', 'EXTRACTED'])
    .nullable(),
  date: z.number().int().min(0), //Should be improve when zod support unix timestamp
  currentPage: z.string().refine(isPageTag, {
    message:
      'currentPage must be in the format `${number}.${number}#${number}` or `${number}`',
  }),
})

export const surveyUnitSchema: z.ZodType<SurveyUnit> = z.object({
  id: z.string(),
  questionnaireId: z.string(),
  personalization: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  data: surveyUnitDataSchema,
  comment: z.object({}).optional(), // not implemented yet, only present in test data
  stateData: stateDataSchema.optional(),
})
