import type { Thunks } from 'core/bootstrap'
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
    (params: { questionnaireId: string; surveyUnitId: string }) =>
    (...args) => {
      const [, , { queenApi, dataStore }] = args
      const { questionnaireId, surveyUnitId } = params
      const surveyUnitPromise = dataStore.getSurveyUnit(surveyUnitId)
      const questionnairePromise = queenApi
        .getQuestionnaire(questionnaireId)
        .then((questionnaire) => {
          const isQueenV2 = isSurveyQueenV2Compatible({ questionnaire })
          return { questionnaire, isQueenV2 }
        })
      return Promise.all([surveyUnitPromise, questionnairePromise]).then(
        ([surveyUnit, { questionnaire, isQueenV2 }]) => {
          return { surveyUnit, questionnaire, isQueenV2 }
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
