import type { Thunks } from 'core/bootstrap'
import { isSurveyCompatibleWithQueenV2 } from 'core/tools/SurveyModelBreaking'
import { AxiosError } from 'axios'
import { getTranslation } from 'i18n/i18n'

const { t } = getTranslation('errorMessage')

export const name = 'reviewSurvey'

export const reducer = null

export const thunks = {
  loader:
    (params: { questionnaireId: string; surveyUnitId: string }) =>
    async (...args) => {
      const [, , { queenApi }] = args

      const { questionnaireId, surveyUnitId } = params

      const questionnairePromise = queenApi.getQuestionnaire(questionnaireId)

      const isQueenV2Promise = questionnairePromise.then((questionnaire) =>
        isSurveyCompatibleWithQueenV2({ questionnaire })
      )

      const surveyUnitPromise = queenApi
        .getSurveyUnit(surveyUnitId)
        // check the association between surveyUnit and questionnaireId
        .then((surveyUnit) => {
          if (surveyUnit.questionnaireId !== questionnaireId) {
            throw new Error(
              t('wrongQuestionnaire', {
                surveyUnitId,
                questionnaireId,
              })
            )
          }
          return surveyUnit
        })

      const [surveyUnit, isQueenV2, questionnaire] = await Promise.all([
        surveyUnitPromise,
        isQueenV2Promise,
        questionnairePromise,
      ])

      return { surveyUnit, isQueenV2, questionnaire }
    },
  getReferentiel:
    (name: string) =>
    (...args) => {
      const [, , { queenApi }] = args
      return queenApi.getNomenclature(name)
    },
} satisfies Thunks
