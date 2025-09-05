import type { Thunks } from '@/core/bootstrap'
import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'
import { getTranslation } from '@/i18n'

const { t } = getTranslation('errorMessage')

export const name = 'reviewSurvey'

export const reducer = null

export const thunks = {
  loader:
    (params: { surveyUnitId: string }) =>
    async (...args) => {
      const [, , { queenApi }] = args

      const { surveyUnitId } = params

      const surveyUnit = await queenApi
        .getSurveyUnit(surveyUnitId)
        .then((surveyUnit) => {
          if (!surveyUnit) {
            throw new Error(t('surveyUnitNotFound', { surveyUnitId }))
          }
          return surveyUnit
        })

      const questionnaire = await queenApi
        .getQuestionnaire(surveyUnit.questionnaireId)
        .then((questionnaire) => {
          if (!isSurveyCompatibleWithQueen({ questionnaire })) {
            throw new Error(t('questionnaireNotCompatible'))
          }
          return questionnaire
        })

      return { surveyUnit, questionnaire }
    },
  getReferentiel:
    (name: string) =>
    (...args) => {
      const [, , { queenApi }] = args
      return queenApi.getNomenclature(name)
    },
} satisfies Thunks
