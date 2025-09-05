import type { Thunks } from '@/core/bootstrap'
import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'
import { getTranslation } from '@/i18n'

const { t } = getTranslation('errorMessage')

export const name = 'reviewSurvey'

export const reducer = null

export const thunks = {
  retrieveQuestionnaireId:
    (params: { surveyUnitId: string }) =>
    (...args) => {
      const [, , { dataStore }] = args
      const { surveyUnitId } = params
      return dataStore.getSurveyUnit(surveyUnitId).then((surveyUnit) => {
        if (!surveyUnit || !surveyUnit.questionnaireId) {
          return Promise.reject(
            new Error(t('surveyUnitQuestionnaireNotFound', { surveyUnitId })),
          )
        }
        return surveyUnit.questionnaireId
      })
    },
  loader:
    (params: { questionnaireId: string; surveyUnitId: string }) =>
    async (...args) => {
      const [, , { queenApi }] = args

      const { questionnaireId, surveyUnitId } = params

      const questionnairePromise = queenApi
        .getQuestionnaire(questionnaireId)
        .then((questionnaire) => {
          if (!isSurveyCompatibleWithQueen({ questionnaire })) {
            throw new Error(t('questionnaireNotCompatible'))
          }
          return questionnaire
        })

      const surveyUnitPromise = queenApi
        .getSurveyUnit(surveyUnitId)
        // check the association between surveyUnit and questionnaireId
        .then((surveyUnit) => {
          if (surveyUnit.questionnaireId !== questionnaireId) {
            throw new Error(
              t('wrongQuestionnaire', {
                surveyUnitId,
                questionnaireId,
              }),
            )
          }
          return surveyUnit
        })

      const [surveyUnit, questionnaire] = await Promise.all([
        surveyUnitPromise,
        questionnairePromise,
      ])

      return { surveyUnit, questionnaire }
    },
  getReferentiel:
    (name: string) =>
    (...args) => {
      const [, , { queenApi }] = args
      return queenApi.getNomenclature(name)
    },
} satisfies Thunks
