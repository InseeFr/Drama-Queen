import axios from 'axios'
import type { Questionnaire, SurveyUnit } from 'core/model'

const lunaticModelVersionBreaking = '2.2.2'

const semverCompare = new Intl.Collator('en', { numeric: true }).compare

/**
 *
 * @param {Questionnaire}
 * @returns {boolean} false if this survey concerns Queen V1, true otherwise
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
