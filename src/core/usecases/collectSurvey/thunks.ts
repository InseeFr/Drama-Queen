import type { Thunks } from '@/core/bootstrap'
import type { SurveyUnit } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'
import { getTranslation } from '@/i18n'

import {
  sendCloseEvent,
  sendQuestionnaireStateChangedEvent,
} from './eventSender'

const { t } = getTranslation('errorMessage')

export const name = 'collectSurvey'

export const reducer = null

export const thunks = {
  loader:
    (params: { surveyUnitId: string }) =>
    async (...args) => {
      const [, , { queenApi, dataStore }] = args

      const { surveyUnitId } = params

      const surveyUnit = await dataStore
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
  changePage:
    (surveyUnit: SurveyUnit) =>
    (...args) => {
      const [, , { dataStore }] = args

      dataStore.updateSurveyUnit(surveyUnit).catch((error) => {
        console.error('Error updating or inserting record:', error)
      })
    },
  changeSurveyUnitState:
    (params: { surveyUnitId: string; newState: QuestionnaireState }) => () => {
      const { surveyUnitId, newState } = params

      // send event for changing questionnaire state
      switch (newState) {
        case 'INIT':
          // event name for 'INIT' is 'STARTED'
          sendQuestionnaireStateChangedEvent(surveyUnitId, 'STARTED')
          break
        case 'COMPLETED':
        case 'VALIDATED':
          sendQuestionnaireStateChangedEvent(surveyUnitId, newState)
          break
        default:
          // we do nothing for the other state values
          break
      }
    },
  quit:
    (surveyUnit: SurveyUnit) =>
    (...args) => {
      const [dispatch] = args

      // we apply same treatments than when page changes
      dispatch(thunks.changePage(surveyUnit))

      // send event for closing Queen
      sendCloseEvent(surveyUnit.id)
    },
} satisfies Thunks
