import { tss } from "tss-react/mui";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { makeSearchParamsObjSchema } from "ui/tools/makeSearchParamsObjectSchema";
import { VisualizeForm } from "./VisualizeForm";

const searchParamsSchema = z.object({
  questionnaire: z.string().optional(),
  data: z.string().optional(),
  nomenclature: z.record(z.string()).optional(),
  readonly: z.boolean().optional()
})


export function Visualize() {

  //const { classes } = useStyles();

  const [searchParams] = useSearchParams()

  const params = makeSearchParamsObjSchema(searchParamsSchema).safeParse(searchParams)

  console.log(params.success ? params.data : params.error);

  return (
    <VisualizeForm />
  )
}


const useStyles = tss.create(
  () => ({

  })
)