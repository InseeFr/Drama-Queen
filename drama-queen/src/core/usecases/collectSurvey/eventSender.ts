import type { EventQuestionnaireState } from 'core/model/QuestionnaireState'

type EventData = {
  type: string
  command: string
  surveyUnit: string
  state: EventQuestionnaireState
}

const eventType = 'QUEEN'

const sendEvent = (data: EventData) => {
  const event = new CustomEvent(eventType, { detail: data })
  console.log(event)
  window.dispatchEvent(event)
}

export const sendQuestionnaireStateChangedEvent = (
  surveyUnitId: string,
  state: EventQuestionnaireState
) => {
  const data = {
    type: eventType,
    command: 'UPDATE_SURVEY_UNIT',
    surveyUnit: surveyUnitId,
    state: state,
  }
  sendEvent(data)
}
