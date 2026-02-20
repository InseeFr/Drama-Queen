import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithTheme } from '@/tests/render'

import { Continue } from './Continue'

describe('Continue Component', () => {
  const defaultProps = {
    label: 'Continue',
    endIcon: <span>Icon</span>,
    shortCutKey: 'Enter',
    shortCutLabel: 'Press Enter',
    onContinue: vi.fn(),
  }

  it('renders Button with label and endIcon', () => {
    // Given a Continue button
    const { getByText, getByRole } = renderWithTheme(
      <Continue {...defaultProps} />,
    )

    // Then the button is in the document
    expect(getByText('Continue')).toBeInTheDocument()
    expect(getByRole('button', { name: /continue/i })).toBeInTheDocument()
    expect(getByText('Icon')).toBeInTheDocument()

    // And the shortcut information
    expect(getByText('press')).toBeInTheDocument()
    expect(getByText('Press Enter')).toBeInTheDocument()
  })

  it('calls onContinue when button is clicked', async () => {
    // Given a Continue button
    const user = userEvent.setup()
    const foo = vi.fn()
    const { getByRole } = renderWithTheme(
      <Continue {...defaultProps} onContinue={foo} />,
    )

    // When we click the button
    await user.click(getByRole('button', { name: /continue/i }))

    // Then we continue
    expect(foo).toHaveBeenCalledOnce()
  })

  it.skip('calls onContinue when shortcut is typed', async () => {
    // Given a Continue button with a alt+enter shortcut
    const user = userEvent.setup()
    const foo = vi.fn()
    renderWithTheme(
      <Continue {...defaultProps} onContinue={foo} shortCutKey="alt+enter" />,
    )

    // When we type alt+enter
    await user.keyboard('{Alt>}{Enter}{/Alt}')

    // Then we continue
    expect(foo).toHaveBeenCalledOnce()
  })

  it('does not allow to continue when disabled', async () => {
    // Given a disabled Continue button with a alt+enter shortcut
    const user = userEvent.setup()
    const foo = vi.fn()
    renderWithTheme(
      <Continue
        {...defaultProps}
        isEnabled={false}
        onContinue={foo}
        shortCutKey="alt+enter"
      />,
    )

    // Then the button is disabled
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()

    // When we type alt+enter
    await user.keyboard('{Alt>}{Enter}{/Alt}')

    // Then nothing happens
    expect(foo).not.toHaveBeenCalled()
  })
})
