import type { Thunks } from '@/core/bootstrap'
import type { Interrogation } from '@/core/model'
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
    (params: { interrogationId: string }) =>
    async (...args) => {
      const [, , { queenApi, dataStore }] = args

      const { interrogationId } = params

      const interrogation = await dataStore
        .getInterrogation(interrogationId)
        .catch(() => {
          throw new Error(t('interrogationNotRetrievable'))
        })
        .then((interrogation) => {
          if (!interrogation) {
            throw new Error(t('interrogationNotFound', { interrogationId }))
          }
          return interrogation
        })

      const questionnaire = await queenApi
        .getQuestionnaire(interrogation.questionnaireId)
        .then((questionnaire) => {
          if (!isSurveyCompatibleWithQueen({ questionnaire })) {
            throw new Error(t('questionnaireNotCompatible'))
          }
          return questionnaire
        })

      return { interrogation, questionnaire }
    },
  getReferentiel:
    (name: string) =>
    (...args) => {
      const [, , { queenApi }] = args
      return queenApi.getNomenclature(name)
    },
  changePage:
    (interrogation: Interrogation) =>
    (...args) => {
      const [, , { dataStore }] = args

      dataStore.updateInterrogation(interrogation).catch((error) => {
        console.error('Error updating or inserting record:', error)
      })
    },
  changeInterrogationState:
    (params: { interrogationId: string; newState: QuestionnaireState }) =>
    () => {
      const { interrogationId, newState } = params

      // send event for changing questionnaire state
      switch (newState) {
        case 'INIT':
          // event name for 'INIT' is 'STARTED'
          sendQuestionnaireStateChangedEvent(interrogationId, 'STARTED')
          break
        case 'COMPLETED':
        case 'VALIDATED':
          sendQuestionnaireStateChangedEvent(interrogationId, newState)
          break
        default:
          // we do nothing for the other state values
          break
      }
    },
  quit:
    (interrogation: Interrogation) =>
    (...args) => {
      const [dispatch] = args

      // we apply same treatments than when page changes
      dispatch(thunks.changePage(interrogation))

      // send event for closing Queen
      sendCloseEvent(interrogation.id)
    },
} satisfies Thunks
