import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'

import { useControls } from './useControls'

describe('Use controls', () => {
  test('prevents further navigation if an error is blocking', async () => {
    const compileControlsMock = vi.fn()
    compileControlsMock.mockReturnValue({
      currentErrors: {
        Q1: [
          { id: 'id1', criticality: 'WARN', errorMessage: 'warning error' },
          { id: 'id2', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
      },
    })
    const goNextPageMock = vi.fn()

    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: goNextPageMock,
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: vi.fn(),
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeTruthy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [
        { id: 'id2', criticality: 'ERROR', errorMessage: 'blocking error' },
        { id: 'id1', criticality: 'WARN', errorMessage: 'warning error' },
      ],
    })
    expect(goNextPageMock).not.toHaveBeenCalled()

    act(() => result.current.handleNextPage())
    expect(goNextPageMock).not.toHaveBeenCalled()
  })

  test('do not block further navigation if an error is an acknowledged warning', async () => {
    const compileControlsMock = vi.fn()
    compileControlsMock.mockReturnValue({
      currentErrors: {
        Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
      },
    })

    const goNextPageMock = vi.fn()

    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: goNextPageMock,
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: vi.fn(),
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeFalsy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
    })
    expect(goNextPageMock).not.toHaveBeenCalled()

    act(() => result.current.handleNextPage())
    expect(result.current.activeErrors).toBeUndefined()
    expect(goNextPageMock).toHaveBeenCalled()
  })

  test('do not block further navigation if an error is a non mandatory error but user ignores them', async () => {
    const compileControlsMock = vi.fn()
    compileControlsMock.mockReturnValue({
      currentErrors: {
        Q1: [{ id: 'id1', criticality: 'ERROR', errorMessage: 'error' }],
      },
    })

    const goNextPageMock = vi.fn()

    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: goNextPageMock,
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: vi.fn(),
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    act(() => result.current.handleNextPage(true))

    expect(result.current.isBlocking).toBeFalsy()
    expect(result.current.activeErrors).toBeUndefined()
    expect(goNextPageMock).toHaveBeenCalled()
  })

  test('block further navigation if an error is a mandatory error', async () => {
    const compileControlsMock = vi.fn()
    compileControlsMock.mockReturnValue({
      currentErrors: {
        Q1: [
          {
            id: 'id1',
            criticality: 'ERROR',
            errorMessage: 'error',
            typeOfControl: 'MANDATORY',
          },
        ],
      },
    })

    const goNextPageMock = vi.fn()

    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: goNextPageMock,
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: vi.fn(),
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    act(() => result.current.handleNextPage(true))

    expect(result.current.isBlocking).toBeTruthy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [
        {
          id: 'id1',
          criticality: 'ERROR',
          errorMessage: 'error',
          typeOfControl: 'MANDATORY',
        },
      ],
    })
    expect(goNextPageMock).not.toHaveBeenCalled()
  })

  test('block further navigation if warning acknowledged but user triggers another warning', async () => {
    const compileControlsMock = vi.fn()
    const goNextPageMock = vi.fn()

    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: goNextPageMock,
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: vi.fn(),
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
      },
    })
    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeFalsy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
    })
    expect(goNextPageMock).not.toHaveBeenCalled()

    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [{ id: 'id2', criticality: 'WARN', errorMessage: 'warning' }],
      },
    })
    act(() => result.current.handleNextPage())
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [{ id: 'id2', criticality: 'WARN', errorMessage: 'warning' }],
    })
    expect(goNextPageMock).not.toHaveBeenCalled()
  })

  test('resets errors on navigation', async () => {
    const compileControlsMock = vi.fn()
    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: vi.fn(),
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: vi.fn(),
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [
          { id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
      },
    })
    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeTruthy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [{ id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' }],
    })

    /** Go next reset */
    compileControlsMock.mockReturnValueOnce({ currentErrors: undefined })
    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeFalsy()
    expect(result.current.activeErrors).toBeUndefined()

    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [
          { id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
      },
    })
    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeTruthy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [{ id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' }],
    })

    /** Go previous reset */
    act(() => result.current.handlePreviousPage())

    expect(result.current.isBlocking).toBeFalsy()
    expect(result.current.activeErrors).toBeUndefined()

    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [
          { id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
      },
    })
    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeTruthy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [{ id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' }],
    })

    /** Go to page reset */
    act(() => result.current.handleGoToPage({ page: '3' }))

    expect(result.current.isBlocking).toBeFalsy()
    expect(result.current.activeErrors).toBeUndefined()
  })

  test('sends telemetry event for blocking errors', async () => {
    const compileControlsMock = vi.fn()
    const pushEventMock = vi.fn()

    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [
          { id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' },
          { id: 'id2', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
        Q2: [
          { id: 'id3', criticality: 'ERROR', errorMessage: 'blocking error' },
        ],
      },
    })

    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: vi.fn(),
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: pushEventMock,
        isTelemetryInitialized: true, // ensure telemetry is active
      }),
    )

    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeTruthy()
    expect(pushEventMock).toHaveBeenCalledTimes(1)
    expect(pushEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TELEMETRY_EVENT_TYPE.CONTROL,
        controlIds: ['Q1', 'Q2'], // ids of current errors
      }),
    )
  })

  test('sends telemetry event when a warning is skipped', async () => {
    const compileControlsMock = vi.fn()
    const pushEventMock = vi.fn()
    const goNextPageMock = vi.fn()

    const { result } = renderHook(() =>
      useControls({
        compileControls: compileControlsMock,
        goNextPage: goNextPageMock,
        goPreviousPage: vi.fn(),
        goToPage: vi.fn(),
        pushEvent: pushEventMock,
        isTelemetryInitialized: true, // ensure telemetry is active
      }),
    )

    // First time, triggers warning control
    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
      },
    })

    act(() => result.current.handleNextPage())

    expect(pushEventMock).not.toHaveBeenCalled() // warning display does not send "skip" event

    // Second time, same warning triggers skip
    compileControlsMock.mockReturnValueOnce({
      currentErrors: {
        Q1: [{ id: 'id1', criticality: 'WARN', errorMessage: 'warning' }],
      },
    })
    act(() => result.current.handleNextPage())

    expect(pushEventMock).toHaveBeenCalledTimes(1)
    expect(pushEventMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TELEMETRY_EVENT_TYPE.CONTROL_SKIP,
        controlIds: ['Q1'],
      }),
    )
  })
})
