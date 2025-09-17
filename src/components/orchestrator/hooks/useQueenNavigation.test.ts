import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { useQueenNavigation } from './useQueenNavigation'

describe('Use queen navigation', () => {
  test('updates data on quit', async () => {
    const getChangedDataMock = vi.fn()
    const onQuitMock = vi.fn()
    const updateInterrogationMock = vi.fn()

    getChangedDataMock.mockReturnValueOnce('my data')
    updateInterrogationMock.mockReturnValueOnce('my updated interrogation')

    const { result } = renderHook(() =>
      useQueenNavigation({
        getChangedData: getChangedDataMock,
        getData: vi.fn(),
        onDefinitiveQuit: vi.fn(),
        onQuit: onQuitMock,
        updateInterrogation: updateInterrogationMock,
      }),
    )

    act(() => {
      result.current.orchestratorOnQuit('3')
    })

    expect(updateInterrogationMock).toHaveBeenCalledOnce()
    expect(updateInterrogationMock).toHaveBeenCalledWith('my data', {
      currentPage: '3',
    })
    expect(onQuitMock).toHaveBeenCalledOnce()
    expect(onQuitMock).toHaveBeenCalledWith('my updated interrogation')
  })

  test('updates state on definitive quit', async () => {
    const getChangedDataMock = vi.fn()
    const onDefinitiveQuitMock = vi.fn()
    const updateInterrogationMock = vi.fn()

    getChangedDataMock.mockReturnValueOnce('my new data')
    updateInterrogationMock.mockReturnValue({
      data: 'my updated interrogation data',
    })

    const { result } = renderHook(() =>
      useQueenNavigation({
        getChangedData: getChangedDataMock,
        getData: vi.fn(),
        onDefinitiveQuit: onDefinitiveQuitMock,
        onQuit: vi.fn(),
        updateInterrogation: updateInterrogationMock,
      }),
    )

    act(() => {
      result.current.orchestratorOnDefinitiveQuit('3')
    })

    expect(updateInterrogationMock).toHaveBeenCalledTimes(3)
    expect(updateInterrogationMock).toHaveBeenCalledWith('my new data', {
      currentPage: '3',
    })
    expect(updateInterrogationMock).toHaveBeenCalledWith(
      'my updated interrogation data',
      { currentPage: '3', forcedState: 'COMPLETED' },
    )
    expect(updateInterrogationMock).toHaveBeenCalledWith(
      'my updated interrogation data',
      { currentPage: '3', forcedState: 'VALIDATED' },
    )
    expect(onDefinitiveQuitMock).toHaveBeenCalledOnce()
    expect(onDefinitiveQuitMock).toHaveBeenCalledWith({
      data: 'my updated interrogation data',
    })
  })

  test('includes calculated variables', async () => {
    const getDataMock = vi.fn()
    const onQuitMock = vi.fn()
    const updateInterrogationMock = vi.fn()

    getDataMock.mockReturnValueOnce('my new data with calculated variables')
    updateInterrogationMock.mockReturnValueOnce('my updated interrogation')

    const { result } = renderHook(() =>
      useQueenNavigation({
        getChangedData: vi.fn(),
        getData: getDataMock,
        includeCalculatedVariables: true,
        onDefinitiveQuit: vi.fn(),
        onQuit: onQuitMock,
        updateInterrogation: updateInterrogationMock,
      }),
    )

    act(() => {
      result.current.orchestratorOnQuit('3')
    })

    expect(updateInterrogationMock).toHaveBeenCalledOnce()
    expect(updateInterrogationMock).toHaveBeenCalledWith(
      'my new data with calculated variables',
      { currentPage: '3' },
    )
    expect(onQuitMock).toHaveBeenCalledOnce()
    expect(onQuitMock).toHaveBeenCalledWith('my updated interrogation')
  })
})
