import { act, renderHook } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { useFullscreen } from './useFullscreen'

beforeAll(() => {
  document.documentElement.requestFullscreen = vi
    .fn()
    .mockResolvedValue(undefined)
  document.exitFullscreen = vi.fn().mockResolvedValue(undefined)
})

describe('useFullscreen hook', () => {
  it('should initialize with fullscreen as false', () => {
    const { result } = renderHook(() => useFullscreen())

    expect(result.current.isFullscreen).toBe(false)
  })

  it('should toggle fullscreen state correctly', async () => {
    const { result } = renderHook(() => useFullscreen())

    // initially not in fullscreen
    expect(result.current.isFullscreen).toBe(false)

    // toggle fullscreen
    await act(async () => {
      await result.current.toggleFullscreen()
    })

    // check it is in fullscreen
    expect(result.current.isFullscreen).toBe(true)

    // toggle fullscreen again
    await act(async () => {
      await result.current.toggleFullscreen()
    })

    // check it is not in fulscreen
    expect(result.current.isFullscreen).toBe(false)
  })

  it('should exit fullscreen on component unmount', async () => {
    const { result, unmount } = renderHook(() => useFullscreen())

    // toggle fullscreen
    await act(async () => {
      await result.current.toggleFullscreen()
    })
    expect(result.current.isFullscreen).toBe(true)

    unmount()

    // check exitFullscreen has been called
    expect(document.exitFullscreen).toHaveBeenCalled()
  })
})
