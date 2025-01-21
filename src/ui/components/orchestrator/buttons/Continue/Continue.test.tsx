import { fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'

import { ShortCut } from '../ShortCut/ShortCut'
import { Continue } from './Continue'

vi.mock('../ShortCut/ShortCut', () => ({
  ShortCut: vi.fn(),
}))

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('Continue Component', () => {
  const onContinueMock = vi.fn()
  const defaultProps = {
    label: 'Continue',
    endIcon: <span>Icon</span>,
    shortCutKey: 'Enter',
    shortCutLabel: 'Press Enter',
    onContinue: onContinueMock,
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders Button with label and endIcon', () => {
    const { getByText, getByRole } = render(
      <TestWrapper>
        <Continue {...defaultProps} />
      </TestWrapper>,
    )

    expect(getByText('Continue')).toBeInTheDocument()
    expect(getByRole('button', { name: /continue/i })).toBeInTheDocument()
    expect(getByText('Icon')).toBeInTheDocument()
  })

  it('renders helper labels correctly', () => {
    const { getByText } = render(
      <TestWrapper>
        <Continue {...defaultProps} />
      </TestWrapper>,
    )

    expect(getByText('continueHelper')).toBeInTheDocument()
    expect(getByText('Press Enter')).toBeInTheDocument()
  })

  it('calls onContinue when button is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <Continue {...defaultProps} />
      </TestWrapper>,
    )

    fireEvent.click(getByRole('button', { name: /continue/i }))
    expect(onContinueMock).toHaveBeenCalledTimes(1)
  })

  it('renders ShortCut with correct props', () => {
    render(
      <TestWrapper>
        <Continue {...defaultProps} />
      </TestWrapper>,
    )

    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: defaultProps.shortCutKey,
        onClickMethod: onContinueMock,
      }),
      {},
    )
  })
})
