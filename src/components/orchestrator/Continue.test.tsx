import { fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ShortCut } from '@/components/ui/ShortCut'
import { renderWithTheme } from '@/tests/render'

import { Continue } from './Continue'

vi.mock('@/components/ui/ShortCut', () => ({
  ShortCut: vi.fn(),
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
    const { getByText, getByRole } = renderWithTheme(
      <Continue {...defaultProps} />,
    )

    expect(getByText('Continue')).toBeInTheDocument()
    expect(getByRole('button', { name: /continue/i })).toBeInTheDocument()
    expect(getByText('Icon')).toBeInTheDocument()
  })

  it('renders helper labels correctly', () => {
    const { getByText } = renderWithTheme(<Continue {...defaultProps} />)

    expect(getByText('press')).toBeInTheDocument()
    expect(getByText('Press Enter')).toBeInTheDocument()
  })

  it('calls onContinue when button is clicked', () => {
    const { getByRole } = renderWithTheme(<Continue {...defaultProps} />)

    fireEvent.click(getByRole('button', { name: /continue/i }))
    expect(onContinueMock).toHaveBeenCalledTimes(1)
  })

  it('renders ShortCut with correct props', () => {
    renderWithTheme(<Continue {...defaultProps} />)

    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: defaultProps.shortCutKey,
        onClickMethod: onContinueMock,
      }),
      undefined,
    )
  })
})
