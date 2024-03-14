import axios from 'axios'
import type { Questionnaire, SurveyUnit } from 'core/model'
import { getTranslation } from 'i18n/i18n'

const lunaticModelVersionBreaking = '2.2.2'

const { t } = getTranslation('errorMessage')

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
    console.info(t('lunaticModelVersionNotFound'))
    return true
  }

  return semverCompare(lunaticModelVersion, lunaticModelVersionBreaking) === 1
}
