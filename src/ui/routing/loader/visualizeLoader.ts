import type { LoaderFunctionArgs } from 'react-router-dom'

import { prCore } from '@/createCore'

export async function visualizeLoader({ request }: LoaderFunctionArgs) {
  const { visualizeSurvey } = (await prCore).functions
  return visualizeSurvey.loader({ requestUrl: request.url })
}
