import { prCore } from 'bootstrap'
import type { LoaderFunctionArgs } from 'react-router-dom'

export async function visualizeLoader({ request }: LoaderFunctionArgs) {
  const { visualizeSurvey } = (await prCore).functions
  return visualizeSurvey.loader({ requestUrl: request.url })
}
