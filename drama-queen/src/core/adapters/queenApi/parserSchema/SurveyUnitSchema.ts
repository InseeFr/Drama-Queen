import { z } from "zod";
import { surveyUnitDataSchema } from "./surveyUnitDataSchema";

export const idAndQuestionnaireIdSchema = z.object({
  id: z.string(),
  questionnaireId: z.string(),
});

const stateDataSchema = z.object({
  state: z.enum(["INIT", "COMPLETED", "VALIDATED", "EXTRACTED"]).nullable(),
  date: z.number().int().min(0), //Should be improve when zod support unix timestamp
  currentPage: z.string(), //Same type as pager.page in Lunatic
});

export const surveyUnitSchema = z.object({
  id: z.string(),
  questionnaireId: z.string(),
  personalization: z.union([z.object({}).array(), z.object({})]),
  data: surveyUnitDataSchema,
  comment: z.object({}), // not implemented yet, only present in test data
  stateData: stateDataSchema.optional(),
});