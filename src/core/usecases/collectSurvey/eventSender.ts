import type { EventQuestionnaireState } from '@/core/model/QuestionnaireState'

type UpdateSurveyUnitState = {
  type: string
  command: 'UPDATE_STATE'
  interrogationId: string
  state: string
}

type CloseQueenData = {
  type: string
  command: 'CLOSE_QUEEN'
  interrogationId: string
}

const eventType = 'QUEEN'

const sendEvent = (data: UpdateSurveyUnitState | CloseQueenData) => {
  const event = new CustomEvent(eventType, { detail: data })
  window.dispatchEvent(event)
}

export const sendQuestionnaireStateChangedEvent = (
  surveyUnitId: string,
  state: EventQuestionnaireState,
) => {
  const data: UpdateSurveyUnitState = {
    type: eventType,
    command: 'UPDATE_STATE',
    interrogationId: surveyUnitId,
    state: state,
  }
  sendEvent(data)
}

export const sendCloseEvent = (surveyUnitId: string) => {
  const data: CloseQueenData = {
    type: eventType,
    command: 'CLOSE_QUEEN',
    interrogationId: surveyUnitId,
  }
  sendEvent(data)
}
