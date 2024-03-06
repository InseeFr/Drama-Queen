import type { Thunks } from 'core/bootstrap'
import { isSurveyQueenV2Compatible } from 'core/tools/SurveyModelBreaking'
import { AxiosError } from 'axios'

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
          throw new Error(
            `Impossible de récupérer le questionnaire ${questionnaireId}.`
          )
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
              throw new Error(
                "Vous n'êtes pas autorisé à accéder aux données de cette unité enquêtée."
              )
            }
            // surveyUnit does not exist
            if (error.response?.status === 404) {
              throw new Error(
                "Il n'y a aucune donnée pour cette unité enquêtée."
              )
            }
            // other error cases
            throw new Error(
              "Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard."
            )
          }
          // unknown error
          throw new Error(
            "Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard."
          )
        })
        // check the association between surveyUnit and questionnaireId
        .then((surveyUnit) => {
          if (surveyUnit.questionnaireId !== questionnaireId) {
            throw new Error(
              `L'unité enquêtée ${surveyUnit.id} n'est pas associée au questionnaire ${questionnaireId}.`
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
