import { z } from 'zod'
import { surveyUnitDataSchema } from './surveyUnitDataSchema'
import type { PageTag } from 'core/model'

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
  currentPage: z.string().refine(
    (val): val is PageTag => {
      // Check if the value matches either of the specified formats
      const isNumberOnly = /^\d+(\.\d+)?$/.test(val)
      const isComplexFormat = /^\d+\.\d+#\d+$/.test(val)
      return isNumberOnly || isComplexFormat
    },
    {
      message:
        'currentPage must be in the format `${number}.${number}#${number}` or `${number}`',
    }
  ),
})

export const surveyUnitSchema = z.object({
  id: z.string(),
  questionnaireId: z.string(),
  personalization: z.array(z.object({
		name: z.string(),
		value: z.string(),
	})).optional(),
  data: surveyUnitDataSchema,
  comment: z.object({}).optional(), // not implemented yet, only present in test data
  stateData: stateDataSchema.optional(),
})
