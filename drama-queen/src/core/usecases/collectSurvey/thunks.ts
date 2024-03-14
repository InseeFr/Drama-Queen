import type { Thunks } from 'core/bootstrap'
import type { SurveyUnit } from 'core/model'
import type { QuestionnaireState } from 'core/model/QuestionnaireState'
import { isSurveyQueenV2Compatible } from 'core/tools/SurveyModelBreaking'
import {
  sendCloseEvent,
  sendQuestionnaireStateChangedEvent,
} from './eventSender'
import { getTranslation } from 'i18n/i18n'

const { t } = getTranslation('errorMessage')

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
  loader:
    (params: { questionnaireId: string; surveyUnitId: string }) =>
    async (...args) => {
      const [, , { queenApi, dataStore }] = args

      const { questionnaireId, surveyUnitId } = params

      const questionnairePromise = queenApi
        .getQuestionnaire(questionnaireId)
        .catch(() => {
          throw new Error(t('questionnaireNotFound', { questionnaireId }))
        })

      const isQueenV2Promise = questionnairePromise.then((questionnaire) =>
        isSurveyQueenV2Compatible({ questionnaire })
      )

      const surveyUnitPromise = dataStore
        .getSurveyUnit(surveyUnitId)
        .catch(() => {
          throw new Error(t('surveyUnitNotRetrievable'))
        })
        .then((surveyUnit) => {
          if (!surveyUnit) {
            throw new Error(t('surveyUnitNotFound', { surveyUnitId }))
          }
          return surveyUnit
        })
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
  onChangePage:
    (surveyUnit: SurveyUnit) =>
    (...args) => {
      const [, , { dataStore }] = args

      const updateSurveyUnitPromise = () => {
        return (
          dataStore
            .updateSurveyUnit(surveyUnit)
            // Dexie put method returns a Promise<string>, we need a Promise<void>
            .then(() => {})
            // cannot search for surveyUnit in index DB
            .catch((error) => {
              console.error('Error updating or inserting record:', error)
            })
        )
      }

      // update surveyUnit
      updateSurveyUnitPromise()
    },
  onChangeSurveyUnitState:
    (params: { surveyUnitId: string; newState: QuestionnaireState }) =>
    (...args) => {
      const { surveyUnitId, newState } = params

      // send event for changing questionnaire state
      switch (newState) {
        case 'INIT':
          // event name for 'INIT' is 'STARTED'
          return sendQuestionnaireStateChangedEvent(surveyUnitId, 'STARTED')
        case 'COMPLETED':
        case 'VALIDATED':
          return sendQuestionnaireStateChangedEvent(surveyUnitId, newState)
        default:
          // we do nothing for the other state values
          return
      }
    },
  onQuit:
    (surveyUnit: SurveyUnit) =>
    (...args) => {
      const [dispatch] = args

      // we apply same treatments than when page changes
      dispatch(thunks.onChangePage(surveyUnit))

      // send event for closing Queen
      return sendCloseEvent(surveyUnit.id)
    },
} satisfies Thunks
