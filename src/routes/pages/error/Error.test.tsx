import { render } from '@testing-library/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorComponent } from '@/components/ui/ErrorComponent'

import { ErrorPage } from './Error'

vi.mock('react-router-dom', () => ({
  useRouteError: vi.fn(),
  isRouteErrorResponse: vi.fn(),
}))
vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))
vi.mock('@/components/ui/ErrorComponent', () => ({
  ErrorComponent: vi.fn(),
}))

beforeEach(() => {
  // mock console.error to avoid useless logs during tests
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('ErrorPage', () => {
  it('calls ErrorComponent with the correct message for instance of Error', () => {
    const mockError = new Error('Something went wrong')
    vi.mocked(useRouteError).mockReturnValue(mockError)

    render(<ErrorPage />)

    expect(ErrorComponent).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Something went wrong' }),
      {},
    )
  })

  it('renders ErrorComponent with the correct message for RouteErrorResponse', () => {
    const mockRouteError = { status: 404, statusText: 'Not Found' }
    vi.mocked(useRouteError).mockReturnValue(mockRouteError)
    vi.mocked(isRouteErrorResponse).mockReturnValue(true)

    render(<ErrorPage />)

    expect(ErrorComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'error 404 : Not Found',
      }),
      {},
    )
  })
})
