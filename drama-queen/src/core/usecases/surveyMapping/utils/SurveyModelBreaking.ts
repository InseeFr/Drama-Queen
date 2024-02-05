import axios from 'axios'
import type { Questionnaire } from 'core/model'

const lunaticModelVersionBreaking = '2.2.10'

const semverCompare = new Intl.Collator('en', { numeric: true }).compare

/**
 *
 * @param params: { questionnaireUrl : string}
 * @returns {boolean} true if this survey concerns QueenV2, false otherwise
 */
export const fetchSurveyModelVersionCompatibility = async (params: {
  questionnaireUrl: string
}) => {
  const { questionnaireUrl } = params
  try {
    const questionnaire = await axios
      .get<Questionnaire>(questionnaireUrl)
      .then(({ data }) => data)

    return isSurveyQueenV2Compatible({ questionnaire })
  } catch (error) {
    console.error(
      'An error occured, we could not retrieve the survey, we fallback to queen v2',
      error
    )
    return true
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
