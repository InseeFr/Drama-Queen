import type { EventQuestionnaireState } from '@/core/model/QuestionnaireState'

type UpdateInterrogationState = {
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

type RegainedControlData = {
  type: string
  command: 'REGAINED_CONTROL_DONE'
  interrogationId: string
}

const eventType = 'QUEEN'

const sendEvent = (
  data: UpdateInterrogationState | CloseQueenData | RegainedControlData,
) => {
  const event = new CustomEvent(eventType, { detail: data })
  window.dispatchEvent(event)
}

export const sendQuestionnaireStateChangedEvent = (
  interrogationId: string,
  state: EventQuestionnaireState,
) => {
  const data: UpdateInterrogationState = {
    type: eventType,
    command: 'UPDATE_STATE',
    interrogationId: interrogationId,
    state: state,
  }
  sendEvent(data)
}

export const sendCloseEvent = (interrogationId: string) => {
  const data: CloseQueenData = {
    type: eventType,
    command: 'CLOSE_QUEEN',
    interrogationId: interrogationId,
  }
  sendEvent(data)
}

export const sendRegainedControlDoneEvent = (interrogationId: string) => {
  const data: RegainedControlData = {
    type: eventType,
    command: 'REGAINED_CONTROL_DONE',
    interrogationId: interrogationId,
  }
  sendEvent(data)
}
