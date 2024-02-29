import { AxiosError } from 'axios'
import type { Thunks } from 'core/bootstrap'
import type { SurveyUnit } from 'core/model'
import { isSurveyQueenV2Compatible } from 'core/tools/SurveyModelBreaking'

export const name = 'collectSurvey'

export const reducer = null

export const thunks = {
  retrieveQuestionnaireId:
    (params: { surveyUnitId: string }) =>
    (...args) => {
      const [, , { dataStore }] = args
      const { surveyUnitId } = params
      //TODO -> reject if undefined and handle error higher
      return dataStore
        .getSurveyUnit(surveyUnitId)
        .then((surveyUnit) => surveyUnit?.questionnaireId ?? null)
    },
  collectLoader:
    (params: {
      questionnaireId: string
      surveyUnitId: string
      standalone: boolean
    }) =>
    (...args) => {
      const [, , { queenApi, dataStore }] = args

      const { questionnaireId, surveyUnitId, standalone } = params

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

      const getSurveyUnitAPIPromise = () => {
        return queenApi
          .getSurveyUnit(surveyUnitId)
          .then((surveyUnit) => {
            // suceeded to get surveyUnit
            return {
              surveyUnit,
              surveyUnitsuccess: true,
              surveyUnitErrorType: undefined,
            }
          })
          .catch((error) => {
            // failed to get surveyUnit
            if (error instanceof AxiosError) {
              // unauthorized to get surveyUnit
              if (error.response?.status === 403) {
                console.error(
                  `Unauthorized access to surveyUnit ${surveyUnitId}.`,
                  error
                )
                return {
                  surveyUnit: undefined,
                  surveyUnitsuccess: false,
                  surveyUnitErrorType: 403,
                }
              }
              // surveyUnit does not exist
              if (error.response?.status === 404) {
                console.error(`No data for surveyUnit ${surveyUnitId}.`, error)
                return {
                  surveyUnit: undefined,
                  surveyUnitsuccess: false,
                  surveyUnitErrorType: 404,
                }
              }
              // other error cases
              console.error(error)
              return {
                surveyUnit: undefined,
                surveyUnitsuccess: false,
                surveyUnitErrorType: undefined,
              }
            }
            throw error
          })
      }

      const getSurveyUnitIDBPromise = () => {
        return (
          dataStore
            .getSurveyUnit(surveyUnitId)
            .then((surveyUnit) => {
              // succeeded to get surveyUnit
              if (surveyUnit) {
                return {
                  surveyUnit,
                  surveyUnitsuccess: true,
                  surveyUnitErrorType: undefined,
                }
              }
              // surveyUnit does not exist in index DB
              return {
                surveyUnit: undefined,
                surveyUnitsuccess: false,
                surveyUnitErrorType: undefined,
              }
            })
            // cannot search for surveyUnit in index DB
            .catch((error) => {
              console.error(error)
              return {
                surveyUnit: undefined,
                surveyUnitsuccess: false,
                surveyUnitErrorType: undefined,
              }
            })
        )
      }

      const surveyUnitPromise = (() => {
        if (standalone) {
          // get the surveyUnit from api
          return getSurveyUnitAPIPromise()
        }
        // get the surveyUnit from index DB
        return getSurveyUnitIDBPromise()
      })()

      const isRightQuestionnaireIdPromise = surveyUnitPromise.then(
        ({ surveyUnit }) => {
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
          { surveyUnit, surveyUnitsuccess, surveyUnitErrorType },
          isQueenV2,
          { questionnaire },
          isRightQuestionnaireId,
        ]) => {
          //check if there is an error to display
          const isError =
            !questionnaire || !surveyUnitsuccess || !isRightQuestionnaireId

          // set an error message to display
          const errorMessage = (() => {
            if (!questionnaire) {
              return "Le questionnaire n'existe pas."
            }
            if (!surveyUnitsuccess) {
              if (surveyUnitErrorType === 404 || !standalone) {
                return "Il n'y a aucune donnée pour ce répondant."
              }
              if (surveyUnitErrorType === 403) {
                return "Vous n'êtes pas autorisé à accéder aux données de ce répondant."
              }
              return "Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard."
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
  getReferentiel:
    (name: string) =>
    (...args) => {
      const [, , { queenApi }] = args
      return queenApi.getNomenclature(name)
    },
} satisfies Thunks
