import type { Thunks } from 'core/bootstrap'
import { isSurveyQueenV2Compatible } from 'core/tools/SurveyModelBreaking'

export const name = 'reviewSurvey'

export const reducer = null

export const thunks = {
  // WARNING : initialize from what was done on collectSurvey, to update
  reviewLoader:
    (params: { questionnaireId: string; surveyUnitId: string }) =>
    (...args) => {
      const [, , { queenApi }] = args

      const { questionnaireId, surveyUnitId } = params

      // get questionnaire from API with questionnaireId
      const questionnairePromise = queenApi
        .getQuestionnaire(questionnaireId)
        .then((questionnaire) => {
          return { questionnaire }
        })
        .catch(() => {
          console.error(`We could not find questionnaire ${questionnaireId}`)
          return { questionnaire: undefined }
        })

      // check if questionnaire is queenV2-compatible. True by default
      const isQueenV2Promise = questionnairePromise.then(
        ({ questionnaire }) => {
          if (questionnaire) {
            return isSurveyQueenV2Compatible({ questionnaire })
          }
          return true
        }
      )

      const surveyUnitPromise = queenApi.getSurveyUnit(surveyUnitId)

      const isRightQuestionnaireIdPromise = surveyUnitPromise.then(
        (surveyUnit) => {
          try {
            if (surveyUnit?.questionnaireId === questionnaireId) {
              return true
            }
            throw new Error(
              `Invalid questionnaireId for surveyUnit ${surveyUnitId}`
            )
          } catch (error) {
            console.error(error)
            return false
          }
        }
      )

      return Promise.all([
        surveyUnitPromise,
        isQueenV2Promise,
        questionnairePromise,
        isRightQuestionnaireIdPromise,
      ]).then(
        ([
          surveyUnit,
          isQueenV2,
          { questionnaire },
          isRightQuestionnaireId,
        ]) => {
          //check if there is an error to display
          const isError =
            !questionnaire || !surveyUnit || !isRightQuestionnaireId

          // set an error message to display
          const errorMessage = (() => {
            if (!questionnaire) {
              return "Le questionnaire n'existe pas."
            }
            if (!surveyUnit) {
              return "Il n'y a aucune donnée pour ce répondant."
            }
            if (!isRightQuestionnaireId) {
              return "Il est impossible d'accéder à ce questionnaire pour ce répondant."
            }
            return "Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard."
          })()

          // only need to return other variables for QueenV1
          if (questionnaire && !isQueenV2) {
            return { isQueenV2 }
          }

          // only need to return error variables for displaying it
          if (isError) {
            return { isError, errorMessage }
          }

          return {
            surveyUnit,
            questionnaire,
            isQueenV2,
          }
        }
      )
    },
} satisfies Thunks
