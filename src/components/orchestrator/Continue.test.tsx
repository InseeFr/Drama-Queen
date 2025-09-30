import { fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SHORTCUT_NEXT } from '@/constants/shortcuts'
import { TestWrapper } from '@/tests/TestWrapper'

import { Continue } from './Continue'
import { useShortcut } from './hooks/useShortcut'

vi.mock('./hooks/useShortcut', () => ({
  useShortcut: vi.fn(),
}))

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('Continue Component', () => {
  const onContinueMock = vi.fn()
  const defaultProps = {
    label: 'Continue',
    endIcon: <span>Icon</span>,
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

    expect(useShortcut).toHaveBeenCalledWith(
      SHORTCUT_NEXT,
      onContinueMock,
      true,
    )
  })
})
