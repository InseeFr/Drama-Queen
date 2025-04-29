import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { useControls } from './useControls'

describe('Use controls', () => {
  test('prevents further navigation if an error is blocking', async () => {
    const compileControlsMock = vi.fn()
    compileControlsMock.mockReturnValue({
      currentErrors: {
        Q1: [
          { id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' },
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
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    act(() => result.current.handleNextPage())

    expect(result.current.isBlocking).toBeTruthy()
    expect(result.current.activeErrors).toStrictEqual({
      Q1: [{ id: 'id1', criticality: 'ERROR', errorMessage: 'blocking error' }],
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

  test('do not block further navigation if an error is a warning but user ignores them', async () => {
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
      }),
    )

    expect(result.current.isBlocking).toBeFalsy()

    act(() => result.current.handleNextPage(true))

    expect(result.current.isBlocking).toBeFalsy()
    expect(result.current.activeErrors).toBeUndefined()
    expect(goNextPageMock).toHaveBeenCalled()
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
})
