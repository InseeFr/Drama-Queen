import type { Thunks } from 'core/bootstrap'
import { isSurveyQueenV2Compatible } from 'core/tools/SurveyModelBreaking'
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

      const questionnairePromise = queenApi
        .getQuestionnaire(questionnaireId)
        .catch(() => {
          throw new Error(t('questionnaireNotFound', { questionnaireId }))
        })

      const isQueenV2Promise = questionnairePromise.then((questionnaire) =>
        isSurveyQueenV2Compatible({ questionnaire })
      )

      const surveyUnitPromise = queenApi
        .getSurveyUnit(surveyUnitId)
        .catch((error) => {
          // failed to get surveyUnit
          if (error instanceof AxiosError) {
            // unauthorized to get surveyUnit
            if (error.response?.status === 403) {
              throw new Error(t('surveyUnitUnauthorized'))
            }
            // surveyUnit does not exist
            if (error.response?.status === 404) {
              throw new Error(t('surveyUnitNotFound', { surveyUnitId }))
            }
            // other error cases
            throw new Error(t('longUnknownError'))
          }
          // unknown error
          throw new Error(t('longUnknownError'))
        })
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
