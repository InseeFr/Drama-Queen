import { z } from 'zod'

import { parseJSON } from './jsonParsers'

function searchParamsToValues(
  searchParams: URLSearchParams,
): Record<string, unknown> {
  return Array.from(searchParams.keys()).reduce(
    (record, key) => {
      const values = searchParams.getAll(key).map((s) => parseJSON(s, s))
      return { ...record, [key]: values.length > 1 ? values : values[0] }
    },
    {} as Record<string, unknown>,
  )
}

export function makeSearchParamsObjSchema<
  Schema extends z.ZodObject<z.ZodRawShape>,
>(schema: Schema) {
  return z
    .instanceof(URLSearchParams)
    .transform(searchParamsToValues)
    .pipe(schema)
}
