import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorComponent } from '@/components/ui/ErrorComponent'

import { ErrorPage } from './Error'

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

    render(<ErrorPage error={mockError} />)

    expect(ErrorComponent).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Something went wrong' }),
      undefined,
    )
  })
})
