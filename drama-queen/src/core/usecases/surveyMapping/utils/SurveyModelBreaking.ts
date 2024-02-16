import axios from 'axios'
import type { Questionnaire, SurveyUnit } from 'core/model'

const lunaticModelVersionBreaking = '2.2.10'

const semverCompare = new Intl.Collator('en', { numeric: true }).compare

/**
 *
 * @param params: { url : string}
 * @returns {Promise<T | undefined>} fetched data of type T or undefined if the request fails.
 * @template T - type of data expected to be fetched : Questionnaire or SurveyUnit
 */
export async function fetchUrl<T extends Questionnaire | SurveyUnit>(params: {
  url: string
}) {
  const { url } = params
  try {
    const response = await axios.get<T>(url)
    const data = response.data

    return data
  } catch (error) {
    console.error(`An error occured, we could not retrieve ${url}`, error)
  }
}

/**
 *
 * @param {Questionnaire}
 * @returns {boolean} true if this survey concerns QueenV2, false otherwise
 */
export const isSurveyQueenV2Compatible = (params: {
  questionnaire: Questionnaire
}) => {
  const {
    questionnaire: { lunaticModelVersion },
  } = params
  if (lunaticModelVersion === undefined) {
    console.info(
      'The survey has no lunaticModelVersion field, so by default we redirect to queen v2'
    )
    return true
  }

  return semverCompare(lunaticModelVersion, lunaticModelVersionBreaking) === 1
}
