import type { Questionnaire } from 'core/model'

const lunaticModelVersionBreaking = '2.2.2'

const semverCompare = new Intl.Collator('en', { numeric: true }).compare

/**
 * Checks if the survey is compatible with Queen version 2 based on lunaticModelVersion.
 * @param {Questionnaire} params - The questionnaire object.
 * @returns {boolean} Returns true if the survey is compatible with Queen version 2, false otherwise.
 */
export const isSurveyCompatibleWithQueenV2 = (params: {
  questionnaire: Questionnaire
}) => {
  const {
    questionnaire: { lunaticModelVersion },
  } = params
  if (lunaticModelVersion === undefined) {
    console.info(
      'The survey has no lunaticModelVersion field, so by default we redirect to Queen v2'
    )
    return true
  }

  return semverCompare(lunaticModelVersion, lunaticModelVersionBreaking) === 1
}
