import { useLocation, useNavigate } from '@tanstack/react-router'
import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { NavigationManager } from './NavigationManager'

vi.mock('@tanstack/react-router', () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}))

describe('NavigationManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not navigate if the path is the same', () => {
    const navigate = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
      pathname: '/same-path',
    } as any)

    vi.mocked(useNavigate).mockReturnValue(navigate)

    render(
      <NavigationManager>
        <div>Children</div>
      </NavigationManager>,
    )

    window.dispatchEvent(
      new CustomEvent('[Pearl] navigated', {
        detail: '/same-path',
      }),
    )

    expect(navigate).not.toHaveBeenCalled()
  })

  it('dispatches a custom event on navigation', () => {
    const navigate = vi.fn()
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

    vi.mocked(useLocation).mockReturnValue({
      pathname: '/test-path',
    } as any)

    vi.mocked(useNavigate).mockReturnValue(navigate)

    render(
      <NavigationManager>
        <div />
      </NavigationManager>,
    )

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Drama Queen] navigated',
        detail: '/test-path',
      }),
    )
  })
})
