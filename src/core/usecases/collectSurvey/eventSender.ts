import type { EventQuestionnaireState } from '@/core/model/QuestionnaireState'

type UpdateSurveyUnitData = {
  type: string
  command: 'UPDATE_SURVEY_UNIT'
  surveyUnit: string
  state: string
}

type CloseQueenData = {
  type: string
  command: 'CLOSE_QUEEN'
  surveyUnit: string
}

const eventType = 'QUEEN'

const sendEvent = (data: UpdateSurveyUnitData | CloseQueenData) => {
  const event = new CustomEvent(eventType, { detail: data })
  window.dispatchEvent(event)
}

export const sendQuestionnaireStateChangedEvent = (
  surveyUnitId: string,
  state: EventQuestionnaireState,
) => {
  const data: UpdateSurveyUnitData = {
    type: eventType,
    command: 'UPDATE_SURVEY_UNIT',
    surveyUnit: surveyUnitId,
    state: state,
  }
  sendEvent(data)
}

export const sendCloseEvent = (surveyUnitId: string) => {
  const data: CloseQueenData = {
    type: eventType,
    command: 'CLOSE_QUEEN',
    surveyUnit: surveyUnitId,
  }
  sendEvent(data)
}
