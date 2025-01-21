import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'

import { MenuNavigationButton } from './MenuNavigationButton'

describe('MenuNavigationButton Component', () => {
  const onClickMock = vi.fn()

  const defaultProps = { label: 'button label', onClick: onClickMock }

  it('renders button with the correct label', () => {
    const { getByRole } = render(
      <TestWrapper>
        <MenuNavigationButton {...defaultProps} />
      </TestWrapper>,
    )

    expect(getByRole('button', { name: 'button label' })).toBeInTheDocument()
  })

  it('calls onClick when the button is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <MenuNavigationButton {...defaultProps} />
      </TestWrapper>,
    )

    fireEvent.click(getByRole('button', { name: 'button label' }))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('renders the button as disabled when disabled prop is true', () => {
    const props = { ...defaultProps, disabled: true }
    const { getByRole } = render(
      <TestWrapper>
        <MenuNavigationButton {...props} />
      </TestWrapper>,
    )
    const button = getByRole('button', { name: 'button label' })
    expect(button).toBeDisabled()
  })

  it('applies autofocus attribute when autofocus prop is true', () => {
    const props = { ...defaultProps, autofocus: true }
    const { getByRole } = render(
      <TestWrapper>
        <MenuNavigationButton {...props} />
      </TestWrapper>,
    )
    const button = getByRole('button', { name: 'button label' })
    expect(button).toHaveFocus()
  })

  it('renders startIcon and endIcon when provided', () => {
    const props = {
      ...defaultProps,
      startIcon: <span>Start Icon</span>,
      endIcon: <span>End Icon</span>,
    }
    const { getByText } = render(
      <TestWrapper>
        <MenuNavigationButton {...props} />
      </TestWrapper>,
    )

    expect(getByText('Start Icon')).toBeInTheDocument()
    expect(getByText('End Icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const props = { ...defaultProps, className: 'custom-class' }
    const { getByRole } = render(
      <TestWrapper>
        <MenuNavigationButton {...props} />
      </TestWrapper>,
    )
    const button = getByRole('button', { name: 'button label' })
    expect(button).toHaveClass('custom-class')
  })
})
