import { act, renderHook } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'

import { useSurveyUnit } from './useSurveyUnit'

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2024, 9, 28, 17, 7, 33, 11))
})

afterAll(() => {
  vi.useRealTimers()
})

describe('Use survey unit', () => {
  it('does not create state data if it did not exist and data did no change', () => {
    const onChangeSurveyUnitStateMock = vi.fn()

    const { result } = renderHook(() =>
      useSurveyUnit(
        { id: 'id', questionnaireId: 'qid', data: {} },
        onChangeSurveyUnitStateMock,
      ),
    )

    act(() => {
      const res = result.current.updateSurveyUnit({}, { currentPage: '2' })
      expect(res.stateData).toBeUndefined()
    })
  })

  test('inits survey unit data', async () => {
    const onChangeSurveyUnitStateMock = vi.fn()

    const { result } = renderHook(() =>
      useSurveyUnit(
        { id: 'id', questionnaireId: 'qid', data: {} },
        onChangeSurveyUnitStateMock,
      ),
    )

    expect(onChangeSurveyUnitStateMock).not.toHaveBeenCalled()
    expect(result.current.surveyUnitData).toStrictEqual({})

    act(() => {
      const res = result.current.updateSurveyUnit(
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

    expect(onChangeSurveyUnitStateMock).toHaveBeenCalledOnce()
    expect(onChangeSurveyUnitStateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        newState: 'INIT',
        surveyUnitId: 'id',
      }),
    )
    expect(result.current.surveyUnitData).toStrictEqual({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })

  test('do not trigger state update if it did not change', async () => {
    const onChangeSurveyUnitStateMock = vi.fn()

    const { result } = renderHook(() =>
      useSurveyUnit(
        {
          id: 'id',
          questionnaireId: 'qid',
          data: {},
          stateData: { state: 'INIT', date: 123, currentPage: '1' },
        },
        onChangeSurveyUnitStateMock,
      ),
    )

    act(() => {
      const res = result.current.updateSurveyUnit({
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

    expect(onChangeSurveyUnitStateMock).not.toHaveBeenCalled()
    expect(result.current.surveyUnitData).toStrictEqual({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })

  test('do not trigger data update if no data change', async () => {
    const onChangeSurveyUnitStateMock = vi.fn()

    const { result } = renderHook(() =>
      useSurveyUnit(
        {
          id: 'id',
          questionnaireId: 'qid',
          data: { COLLECTED: { Q1: { COLLECTED: 'new data' } } },
          stateData: { state: 'INIT', date: 123, currentPage: '1' },
        },
        onChangeSurveyUnitStateMock,
      ),
    )

    act(() => {
      const res = result.current.updateSurveyUnit(
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

    expect(onChangeSurveyUnitStateMock).not.toHaveBeenCalled()
    expect(result.current.surveyUnitData).toStrictEqual({
      CALCULATED: {},
      COLLECTED: { Q1: { COLLECTED: 'new data' } },
      EXTERNAL: {},
    })
  })
})
