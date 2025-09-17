import { act, renderHook } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'

import { useInterrogation } from './useInterrogation'

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2024, 9, 28, 17, 7, 33, 11))
})

afterAll(() => {
  vi.useRealTimers()
})

describe('Use interrogation', () => {
  it('does not create state data if it did not exist and data did no change', () => {
    const onChangeInterrogationStateMock = vi.fn()

    const { result } = renderHook(() =>
      useInterrogation(
        { id: 'id', questionnaireId: 'qid', data: {} },
        onChangeInterrogationStateMock,
      ),
    )

    act(() => {
      const res = result.current.updateInterrogation({}, { currentPage: '2' })
      expect(res.stateData).toBeUndefined()
    })
  })

  test('inits interrogation data', async () => {
    const onChangeInterrogationStateMock = vi.fn()

    const { result } = renderHook(() =>
      useInterrogation(
        { id: 'id', questionnaireId: 'qid', data: {} },
        onChangeInterrogationStateMock,
      ),
    )

    expect(onChangeInterrogationStateMock).not.toHaveBeenCalled()
    expect(result.current.interrogationData).toStrictEqual({})

    act(() => {
      const res = result.current.updateInterrogation(
        {
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
        },
        { currentPage: '1' },
      )
      expect(res).toStrictEqual({
        data: {
          CALCULATED: {},
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
          EXTERNAL: {},
        },
        id: 'id',
        questionnaireId: 'qid',
        stateData: {
          currentPage: '1',
          date: vi.getMockedSystemTime()?.valueOf(),
          state: 'INIT',
        },
      })
    })

    expect(onChangeInterrogationStateMock).toHaveBeenCalledOnce()
    expect(onChangeInterrogationStateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        newState: 'INIT',
        interrogationId: 'id',
      }),
    )
    expect(result.current.interrogationData).toStrictEqual({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })

  test('do not trigger state update if it did not change', async () => {
    const onChangeInterrogationStateMock = vi.fn()

    const { result } = renderHook(() =>
      useInterrogation(
        {
          id: 'id',
          questionnaireId: 'qid',
          data: {},
          stateData: { state: 'INIT', date: 123, currentPage: '1' },
        },
        onChangeInterrogationStateMock,
      ),
    )

    act(() => {
      const res = result.current.updateInterrogation({
        COLLECTED: { Q1: { COLLECTED: 'new data' } },
      })
      expect(res).toStrictEqual({
        data: {
          CALCULATED: {},
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
          EXTERNAL: {},
        },
        id: 'id',
        questionnaireId: 'qid',
        stateData: {
          currentPage: '1',
          date: vi.getMockedSystemTime()?.valueOf(),
          state: 'INIT',
        },
      })
    })

    expect(onChangeInterrogationStateMock).not.toHaveBeenCalled()
    expect(result.current.interrogationData).toStrictEqual({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })

  test('do not trigger data update if no data change', async () => {
    const onChangeInterrogationStateMock = vi.fn()

    const { result } = renderHook(() =>
      useInterrogation(
        {
          id: 'id',
          questionnaireId: 'qid',
          data: { COLLECTED: { Q1: { COLLECTED: 'new data' } } },
          stateData: { state: 'INIT', date: 123, currentPage: '1' },
        },
        onChangeInterrogationStateMock,
      ),
    )

    act(() => {
      const res = result.current.updateInterrogation(
        {
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
        },
        { currentPage: '1' },
      )
      expect(res).toStrictEqual({
        data: {
          CALCULATED: {},
          COLLECTED: { Q1: { COLLECTED: 'new data' } },
          EXTERNAL: {},
        },
        id: 'id',
        questionnaireId: 'qid',
        stateData: {
          currentPage: '1',
          date: vi.getMockedSystemTime()?.valueOf(),
          state: 'INIT',
        },
      })
    })

    expect(onChangeInterrogationStateMock).not.toHaveBeenCalled()
    expect(result.current.interrogationData).toStrictEqual({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })
})
