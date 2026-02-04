import { LUNATIC_MODEL_VERSION_BREAKING } from '@/core/constants'
import type { Questionnaire } from '@/core/model'
import i18n from '@/libs/i18n'

const semverCompare = new Intl.Collator('en', { numeric: true }).compare

/**
 * Checks if the survey is compatible with Queen version 2 based on lunaticModelVersion.
 * @param {Questionnaire} params - The questionnaire object.
 * @returns {boolean} Returns true if the survey is compatible with Queen version 2, false otherwise.
 */
export const isSurveyCompatibleWithQueen = (params: {
  questionnaire: Questionnaire
}) => {
  const {
    questionnaire: { lunaticModelVersion },
  } = params
  if (lunaticModelVersion === undefined) {
    console.info(i18n.t('error.lunaticModelVersionNotFound'))
    return true
  }

  return (
    semverCompare(lunaticModelVersion, LUNATIC_MODEL_VERSION_BREAKING) === 1
  )
}
