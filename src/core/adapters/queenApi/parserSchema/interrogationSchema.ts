import { z } from 'zod'

import type { Interrogation, PageTag } from '@/core/model'
import { isPageTag } from '@/core/tools/pageTag'

import { interrogationDataSchema } from './interrogationDataSchema'

export const idAndQuestionnaireIdSchema = z.object({
  id: z.string(),
  questionnaireId: z.string(),
})

const FIRST_PAGE: PageTag = '1'

// PageTag being literal type, zod currently does not support it we need to force the type with a transform
const leafStateSchema = z.object({
  state: z.enum(['NOT_INIT', 'INIT', 'COMPLETED']).nullable(),
  date: z.number().int().min(0),
  cells: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
})

const stateDataSchema = z.object({
  // "IS_MOVED" is a state produced by the multimode events : the interrogation has to be
  // treated as a fresh one, so we map it to the "not started" state (null)
  state: z
    .enum([
      'INIT',
      'COMPLETED',
      'VALIDATED',
      'TOEXTRACT',
      'EXTRACTED',
      'IS_MOVED',
    ])
    .nullable()
    .transform((state) => (state === 'IS_MOVED' ? null : state)),
  date: z.number().int().min(0), //Should be improve when zod support unix timestamp
  // The web orchestrator (stromae) stores its own pages ("welcomePage", "validationPage",
  // "endPage") in currentPage : they are not lunatic page tags, so we fall back to the first page
  // instead of failing the whole synchronization
  currentPage: z
    .string()
    .transform((val) => (isPageTag(val) ? val : FIRST_PAGE)),
  leafStates: z.array(leafStateSchema).optional().nullable(),
})

export const interrogationSchema: z.ZodType<Interrogation> = z.object({
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
  data: interrogationDataSchema,
  comment: z.object({}).optional(), // not implemented yet, only present in test data
  stateData: stateDataSchema.optional(),
})
