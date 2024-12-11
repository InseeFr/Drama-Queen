import { z } from 'zod'

const eventSchema = z.object({
  type: z.enum(['click', 'session-started', 'orchestrator-create']),
  timestamp: z.number().int().min(0),
  userAgent: z.string(),
  idSurveyUnit: z.string(),
  idOrchestrator: z.enum([
    'orchestrator-collect',
    'orchestrator-readonly',
    'orchestrator-vizualisation',
  ]),
  idQuestionnaire: z.string(),
  idParadataObject: z.string(),
  typeParadataObject: z.enum(['orchestrator', 'session']),
  page: z.string().nullable(),
})

export const paradataSchema = z.object({
  idSu: z.string(),
  event: eventSchema.array(),
})
