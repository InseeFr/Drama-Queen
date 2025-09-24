import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'

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
        pushEvent: vi.fn(),
        triggerBatchTelemetryCallback: vi.fn(),
      }),
    )

    await act(async () => {
      await result.current.orchestratorOnQuit('3')
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
        pushEvent: vi.fn(),
        triggerBatchTelemetryCallback: vi.fn(),
      }),
    )

    await act(async () => {
      await result.current.orchestratorOnDefinitiveQuit('3')
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
        pushEvent: vi.fn(),
        triggerBatchTelemetryCallback: vi.fn(),
      }),
    )

    await act(async () => {
      await result.current.orchestratorOnQuit('3')
    })

    expect(updateInterrogationMock).toHaveBeenCalledOnce()
    expect(updateInterrogationMock).toHaveBeenCalledWith(
      'my new data with calculated variables',
      { currentPage: '3' },
    )
    expect(onQuitMock).toHaveBeenCalledOnce()
    expect(onQuitMock).toHaveBeenCalledWith('my updated interrogation')
  })

  it('calls pushEvent with QUIT source on orchestratorOnQuit, and triggers telemetry batch', async () => {
    const pushEventMock = vi.fn()
    const triggerBatchMock = vi.fn()

    const { result } = renderHook(() =>
      useQueenNavigation({
        getChangedData: vi.fn().mockReturnValue('data'),
        getData: vi.fn(),
        onDefinitiveQuit: vi.fn(),
        onQuit: vi.fn(),
        updateInterrogation: vi.fn(),
        pushEvent: pushEventMock,
        triggerBatchTelemetryCallback: triggerBatchMock,
        isTelemetryInitialized: true, // ensure telemetry is enabled
      }),
    )

    await act(async () => {
      await result.current.orchestratorOnQuit('3')
    })

    expect(pushEventMock).toHaveBeenCalledOnce()
    expect(pushEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TELEMETRY_EVENT_TYPE.EXIT,
        source: TELEMETRY_EVENT_EXIT_SOURCE.QUIT,
      }),
    )
    expect(triggerBatchMock).toHaveBeenCalledOnce()
  })

  it('calls pushEvent with DEFINITIVE_QUIT source on orchestratorOnDefinitiveQuit, and triggers telemetry batch', async () => {
    const pushEventMock = vi.fn()
    const triggerBatchMock = vi.fn()
    const updateInterrogationMock = vi.fn()

    updateInterrogationMock.mockReturnValue({
      data: 'my updated interrogation data',
    })

    const { result } = renderHook(() =>
      useQueenNavigation({
        getChangedData: vi.fn().mockReturnValue('data'),
        getData: vi.fn(),
        onDefinitiveQuit: vi.fn(),
        onQuit: vi.fn(),
        updateInterrogation: updateInterrogationMock,
        pushEvent: pushEventMock,
        triggerBatchTelemetryCallback: triggerBatchMock,
        isTelemetryInitialized: true, // ensure telemetry is enabled
      }),
    )

    await act(async () => {
      await result.current.orchestratorOnDefinitiveQuit('3')
    })

    expect(pushEventMock).toHaveBeenCalledOnce()
    expect(pushEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TELEMETRY_EVENT_TYPE.EXIT,
        source: TELEMETRY_EVENT_EXIT_SOURCE.DEFINITIVE_QUIT,
      }),
    )
    expect(triggerBatchMock).toHaveBeenCalledOnce()
  })
})
