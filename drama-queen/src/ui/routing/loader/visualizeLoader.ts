import { prCore } from 'bootstrap'
import type { LoaderFunctionArgs } from 'react-router-dom'

export async function visualizeLoader({ request }: LoaderFunctionArgs) {
  const { surveyMapping } = (await prCore).functions
  return surveyMapping.visualizeLoader({ requestUrl: request.url })
}
