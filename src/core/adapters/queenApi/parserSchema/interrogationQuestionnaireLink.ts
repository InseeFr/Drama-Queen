import z from 'zod'

import type { InterrogationAndQuestionnaireId } from '@/core/model'

export const interrogationQuestionnaireLink: z.ZodType<InterrogationAndQuestionnaireId> =
  z.object({
    interrogationId: z.string(),
    questionnaireId: z.string(),
  })
