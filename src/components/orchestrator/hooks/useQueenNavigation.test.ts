import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { useQueenNavigation } from './useQueenNavigation'

describe('Use queen navigation', () => {
  test('updates data on quit', async () => {
    const getChangedDataMock = vi.fn()
    const onQuitMock = vi.fn()
    const updateSurveyUnitMock = vi.fn()

    getChangedDataMock.mockReturnValueOnce('my data')
    updateSurveyUnitMock.mockReturnValueOnce('my updated survey unit')

    const { result } = renderHook(() =>
      useQueenNavigation({
        getChangedData: getChangedDataMock,
        onDefinitiveQuit: vi.fn(),
        onQuit: onQuitMock,
        updateSurveyUnit: updateSurveyUnitMock,
      }),
    )

    act(() => {
      result.current.orchestratorOnQuit('3')
    })

    expect(updateSurveyUnitMock).toHaveBeenCalledOnce()
    expect(updateSurveyUnitMock).toHaveBeenCalledWith('my data', {
      currentPage: '3',
    })
    expect(onQuitMock).toHaveBeenCalledOnce()
    expect(onQuitMock).toHaveBeenCalledWith('my updated survey unit')
  })

  test('updates state on definitive quit', async () => {
    const getChangedDataMock = vi.fn()
    const onDefinitiveQuitMock = vi.fn()
    const updateSurveyUnitMock = vi.fn()

    getChangedDataMock.mockReturnValueOnce('my new data')
    updateSurveyUnitMock.mockReturnValue({
      data: 'my updated survey unit data',
    })

    const { result } = renderHook(() =>
      useQueenNavigation({
        getChangedData: getChangedDataMock,
        onDefinitiveQuit: onDefinitiveQuitMock,
        onQuit: vi.fn(),
        updateSurveyUnit: updateSurveyUnitMock,
      }),
    )

    act(() => {
      result.current.orchestratorOnDefinitiveQuit('3')
    })

    expect(updateSurveyUnitMock).toHaveBeenCalledTimes(3)
    expect(updateSurveyUnitMock).toHaveBeenCalledWith('my new data', {
      currentPage: '3',
    })
    expect(updateSurveyUnitMock).toHaveBeenCalledWith(
      'my updated survey unit data',
      { currentPage: '3', forcedState: 'COMPLETED' },
    )
    expect(updateSurveyUnitMock).toHaveBeenCalledWith(
      'my updated survey unit data',
      { currentPage: '3', forcedState: 'VALIDATED' },
    )
    expect(onDefinitiveQuitMock).toHaveBeenCalledOnce()
    expect(onDefinitiveQuitMock).toHaveBeenCalledWith({
      data: 'my updated survey unit data',
    })
  })
})
