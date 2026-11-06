import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorComponent } from '@/components/ui/ErrorComponent'

import { ErrorPage } from './Error'

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

    render(<ErrorPage error={mockError} />)

    expect(ErrorComponent).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Something went wrong' }),
      undefined,
    )
  })

  it.each([
    ['a string', 'Something went wrong'],
    ['an object', { message: 'Something went wrong' }],
    ['undefined', undefined],
  ])(
    'calls ErrorComponent with unknown error message when error is %s',
    (_, error) => {
      render(<ErrorPage error={error} />)

      expect(ErrorComponent).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'error.unknownError.short' }),
        undefined,
      )
    },
  )
})
