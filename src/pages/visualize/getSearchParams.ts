import type { FormValues } from './models'

export function getSearchParams(data: FormValues) {
  // get encoded form values
  const stringParams = {
    questionnaire: data.questionnaire,
    data: data.data ?? '',
    nomenclature: data.nomenclature ? JSON.stringify(data.nomenclature) : '',
    readonly: data.readonly.toString(),
  }
  // keep only form values that are filled
  const searchParams = Object.fromEntries(
    Object.entries(stringParams).filter(([, value]) => value !== ''),
  )

  return searchParams
}
