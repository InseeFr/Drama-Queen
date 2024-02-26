import type { FormValues } from './VisualizeForm'

function encodeNomenclature(nomenclature?: Record<string, string>) {
  // Return an empty object if nomenclature is undefined or null
  if (!nomenclature) {
    return {}
  }
  // return nomenclature object with encoding urls values
  const encodedNomenclature = Object.fromEntries(
    Object.entries(nomenclature).map(([key, value]) => [
      key,
      encodeURIComponent(value),
    ])
  )

  return encodedNomenclature
}

export function encodeParams(data: FormValues) {
  // get encoded form values
  const fullParams = {
    questionnaire: encodeURIComponent(data.questionnaire),
    data: data.data ? encodeURIComponent(data.data) : '',
    nomenclature: data.nomenclature
      ? JSON.stringify(encodeNomenclature(data.nomenclature))
      : '',
    readonly: encodeURIComponent(data.readonly),
  }
  // keep only form values that are filled
  const encodedParams = Object.fromEntries(
    Object.entries(fullParams).filter(([, value]) => value !== '')
  )

  return encodedParams
}
