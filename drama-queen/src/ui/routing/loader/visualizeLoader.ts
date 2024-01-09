import { prCore } from "bootstrap";
import type { LoaderFunctionArgs } from "react-router-dom";
import { makeSearchParamsObjSchema } from "ui/tools/makeSearchParamsObjectSchema";
import { z } from "zod";

export async function visualizeLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const result = makeSearchParamsObjSchema(searchParamsSchema).safeParse(
    url.searchParams
  );

  if (!result.success) {
    console.error(result.error);
    return null;
  }

  const { questionnaire } = result.data;

  if (!questionnaire) {
    return null;
  }

  const { visualizeSurvey } = (await prCore).functions;
  const isQueenV2 = await visualizeSurvey.isQueenV2Survey({
    questionnaireUrl: questionnaire,
  });
  return { ...result.data, isQueenV2 };
}

const searchParamsSchema = z.object({
  questionnaire: z.string().optional(),
  data: z.string().optional(),
  nomenclature: z.record(z.string()).optional(),
  readonly: z.boolean().optional(),
});
