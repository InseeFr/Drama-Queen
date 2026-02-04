import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '@/tests/render'

import { MenuNavigationButton } from './MenuNavigationButton'

describe('MenuNavigationButton Component', () => {
  const onClickMock = vi.fn()

  const defaultProps = { label: 'button label', onClick: onClickMock }

  it('renders button with the correct label', () => {
    const { getByRole } = renderWithTheme(
      <MenuNavigationButton {...defaultProps} />,
    )

    expect(getByRole('button', { name: 'button label' })).toBeInTheDocument()
  })

  it('calls onClick when the button is clicked', () => {
    const { getByRole } = renderWithTheme(
      <MenuNavigationButton {...defaultProps} />,
    )

    fireEvent.click(getByRole('button', { name: 'button label' }))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('renders the button as disabled when disabled prop is true', () => {
    const props = { ...defaultProps, disabled: true }
    const { getByRole } = renderWithTheme(<MenuNavigationButton {...props} />)
    const button = getByRole('button', { name: 'button label' })
    expect(button).toBeDisabled()
  })

  it('applies autofocus attribute when autofocus prop is true', () => {
    const props = { ...defaultProps, autofocus: true }
    const { getByRole } = renderWithTheme(<MenuNavigationButton {...props} />)
    const button = getByRole('button', { name: 'button label' })
    expect(button).toHaveFocus()
  })

  it('renders startIcon and endIcon when provided', () => {
    const props = {
      ...defaultProps,
      startIcon: <span>Start Icon</span>,
      endIcon: <span>End Icon</span>,
    }
    const { getByText } = renderWithTheme(<MenuNavigationButton {...props} />)

    expect(getByText('Start Icon')).toBeInTheDocument()
    expect(getByText('End Icon')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const props = { ...defaultProps, className: 'custom-class' }
    const { getByRole } = renderWithTheme(<MenuNavigationButton {...props} />)
    const button = getByRole('button', { name: 'button label' })
    expect(button).toHaveClass('custom-class')
  })
})
