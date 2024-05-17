import type { Questionnaire } from 'core/model'
import { getTranslation } from 'i18n'

const lunaticModelVersionBreaking = '2.2.10'

const { t } = getTranslation('errorMessage')

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
    console.info(t('lunaticModelVersionNotFound'))
    return true
  }

  return semverCompare(lunaticModelVersion, lunaticModelVersionBreaking) === 1
}
