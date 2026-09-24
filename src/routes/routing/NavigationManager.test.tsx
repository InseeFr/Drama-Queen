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

  it('does not navigate if the path and search are the same', () => {
    const navigate = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
      pathname: '/same-path',
      search: '',
    } as any)

    vi.mocked(useNavigate).mockReturnValue(navigate)

    render(
      <NavigationManager>
        <div>Children</div>
      </NavigationManager>,
    )

    window.dispatchEvent(
      new CustomEvent('[Pearl] navigated', {
        detail: { pathname: '/same-path', search: '' },
      }),
    )

    expect(navigate).not.toHaveBeenCalled()
  })

  it('navigates with pathname and parsed search params when they differ', () => {
    const navigate = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
      pathname: '/current-path',
      search: '',
    } as any)

    vi.mocked(useNavigate).mockReturnValue(navigate)

    render(
      <NavigationManager>
        <div>Children</div>
      </NavigationManager>,
    )

    window.dispatchEvent(
      new CustomEvent('[Pearl] navigated', {
        detail: { pathname: '/new-path', search: '?foo=bar&baz=qux' },
      }),
    )

    expect(navigate).toHaveBeenCalledWith({
      to: '/new-path',
      search: { foo: 'bar', baz: 'qux' },
    })
  })

  it('navigates with undefined search when no search params are provided', () => {
    const navigate = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
      pathname: '/current-path',
      search: '',
    } as any)

    vi.mocked(useNavigate).mockReturnValue(navigate)

    render(
      <NavigationManager>
        <div>Children</div>
      </NavigationManager>,
    )

    window.dispatchEvent(
      new CustomEvent('[Pearl] navigated', {
        detail: { pathname: '/new-path', search: '' },
      }),
    )

    expect(navigate).toHaveBeenCalledWith({
      to: '/new-path',
      search: undefined,
    })
  })

  it('dispatches a custom event on navigation with pathname and search', () => {
    const navigate = vi.fn()
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')

    vi.mocked(useLocation).mockReturnValue({
      pathname: '/test-path',
      searchStr: '?foo=bar',
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
        detail: { pathname: '/test-path', search: '?foo=bar' },
      }),
    )
  })
})
