import { render } from '@testing-library/react'
import {
  MemoryRouter,
  matchRoutes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { NavigationManager } from './NavigationManager'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
    matchRoutes: vi.fn(),
  }
})

describe('NavigationManager', () => {
  let useLocationMock: ReturnType<typeof vi.fn>
  let useNavigateMock: ReturnType<typeof vi.fn>
  let matchRoutesMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    useLocationMock = vi.fn()
    useNavigateMock = vi.fn()
    matchRoutesMock = vi.fn()

    // Mock hooks used by the component
    vi.mocked(useLocation).mockImplementation(useLocationMock)
    vi.mocked(useNavigate).mockImplementation(() => useNavigateMock)
    vi.mocked(matchRoutes).mockImplementation(matchRoutesMock)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not navigate if the path is the same', () => {
    const mockLocation = { pathname: '/same-path' }
    const mockNavigate = vi.fn()

    useLocationMock.mockReturnValue(mockLocation)
    useNavigateMock.mockImplementation(() => mockNavigate)
    matchRoutesMock.mockImplementation(
      (routes, { pathname }) => pathname === '/same-path',
    )

    render(
      <MemoryRouter initialEntries={['/same-path']}>
        <NavigationManager>
          <div>Children</div>
        </NavigationManager>
      </MemoryRouter>,
    )

    const event = new CustomEvent('[Pearl] navigated', { detail: '/same-path' })
    window.dispatchEvent(event)

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('dispatches a custom event on navigation', () => {
    const mockLocation = { pathname: '/test-path' }

    useLocationMock.mockReturnValue(mockLocation)

    const customEventSpy = vi.spyOn(window, 'dispatchEvent')

    render(
      <MemoryRouter initialEntries={['/test-path']}>
        <NavigationManager>
          <div>Children</div>
        </NavigationManager>
      </MemoryRouter>,
    )

    expect(customEventSpy).toHaveBeenCalledWith(
      new CustomEvent('[Drama Queen] navigated', { detail: '/test-path' }),
    )
  })
})
