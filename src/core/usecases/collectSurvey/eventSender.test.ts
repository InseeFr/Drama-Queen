import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { EventQuestionnaireState } from '@/core/model/QuestionnaireState'

import {
  sendCloseEvent,
  sendQuestionnaireStateChangedEvent,
} from './eventSender'

describe('Event Dispatchers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch a "QUEEN" event for questionnaire state change', () => {
    const interrogationId = 'unit1'
    const state: EventQuestionnaireState = 'COMPLETED'

    const dispatchEventMock = vi.spyOn(window, 'dispatchEvent')

    sendQuestionnaireStateChangedEvent(interrogationId, state)

    expect(dispatchEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'QUEEN',
        detail: {
          type: 'QUEEN',
          command: 'UPDATE_STATE',
          interrogationId: interrogationId,
          state: state,
        },
      }),
    )
  })

  it('should dispatch a "QUEEN" event for closing the survey', () => {
    const interrogationId = 'unit2'

    const dispatchEventMock = vi.spyOn(window, 'dispatchEvent')

    sendCloseEvent(interrogationId)

    expect(dispatchEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'QUEEN',
        detail: {
          type: 'QUEEN',
          command: 'CLOSE_QUEEN',
          interrogationId: interrogationId,
        },
      }),
    )
  })
})
