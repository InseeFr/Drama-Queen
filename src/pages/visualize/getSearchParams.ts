import type { FormValues } from './models'

export function getSearchParams(data: FormValues) {
  // get encoded form values
  const params = {
    questionnaire: data.questionnaire,
    data: data.data ?? '',
    nomenclature: data.nomenclature ? JSON.stringify(data.nomenclature) : '',
    readonly: data.readonly,
  }
  // keep only form values that are filled
  const searchParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== ''),
  )

  return searchParams
}
