import { z } from "zod";

export const campaignSchema = z.object({
  id: z.string(),
  questionnaireIds: z.string().array(),
});
