import { act, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Modal } from '@/components/ui/Modal'
import { renderWithTheme } from '@/tests/render'

import { MenuNavigationButton } from './MenuNavigationButton'
import { StopNavigation } from './StopNavigation'

vi.mock('./MenuNavigationButton', () => ({
  MenuNavigationButton: vi
    .fn()
    .mockImplementation(({ label, onClick }) => (
      <button onClick={onClick}>{label}</button>
    )),
}))

vi.mock('@/components/ui/Modal', () => ({
  Modal: vi.fn(),
}))

describe('StopNavigation Component', () => {
  const mockQuit = vi.fn()
  const mockDefinitiveQuit = vi.fn()

  const defaultProps = {
    quit: mockQuit,
    definitiveQuit: mockDefinitiveQuit,
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title of nature of the stop', () => {
    const { getByText } = renderWithTheme(<StopNavigation {...defaultProps} />)

    expect(getByText('What is the nature of the stop?')).toBeInTheDocument()
  })

  it('renders temporary stop and definitive stop items as MenuNavigationButton components', () => {
    renderWithTheme(<StopNavigation {...defaultProps} />)

    // definitive stop
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label:
          '1. Definitive end to interview (refusal, unable to continue, etc.)',
        onClick: expect.any(Function),
      }),
      undefined,
    )

    // temporary stop
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: '2. Temporary interruption of the interview',
        onClick: expect.any(Function),
      }),
      undefined,
    )
  })

  it('does not open the modal initially', () => {
    renderWithTheme(<StopNavigation {...defaultProps} />)

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: false,
      }),
      undefined,
    )
  })

  it('opens the modal with correct content when definitive stop button is clicked', () => {
    const { getByRole } = renderWithTheme(<StopNavigation {...defaultProps} />)

    // Click on the definitive quit button
    const definitivequitButton = getByRole('button', {
      name: '1. Definitive end to interview (refusal, unable to continue, etc.)',
    })
    fireEvent.click(definitivequitButton)

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        dialogTitle: 'Definitive stop',
        dialogContent:
          'Do you confirm the definitive stop of the questionnaire ?',
        buttons: [
          expect.objectContaining({ label: 'Cancel', autoFocus: false }),
          expect.objectContaining({
            label: 'Confirm definitive stop',
            autoFocus: true,
          }),
        ],
        onClose: expect.any(Function),
      }),
      undefined,
    )
  })

  it('opens the modal with correct content when temporary stop button is clicked', () => {
    const { getByRole } = renderWithTheme(<StopNavigation {...defaultProps} />)

    // Click on the temporary quit button
    const temporaryQuitButton = getByRole('button', {
      name: '2. Temporary interruption of the interview',
    })
    fireEvent.click(temporaryQuitButton)

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        dialogTitle: 'Temporary interruption',
        dialogContent: 'You are about to leave the questionnaire',
        buttons: [
          expect.objectContaining({ label: 'Cancel', autoFocus: false }),
          expect.objectContaining({
            label: 'Confirm',
            autoFocus: true,
          }),
        ],
        onClose: expect.any(Function),
      }),
      undefined,
    )
  })

  it('closes the modal when the cancel button is clicked', () => {
    const { getByRole } = renderWithTheme(<StopNavigation {...defaultProps} />)

    // Open the definitive quit modal
    const definitivequitButton = getByRole('button', {
      name: '1. Definitive end to interview (refusal, unable to continue, etc.)',
    })
    fireEvent.click(definitivequitButton)

    // Get the modal props from the second render
    const modalProps = vi.mocked(Modal).mock.calls[1][0]
    // Simulate Modal's onClose call
    act(() => {
      modalProps.onClose()
    })

    expect(Modal).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
      }),
      undefined,
    )
  })

  it('calls definitiveQuit function when validate button is clicked in the modal', () => {
    const { getByRole } = renderWithTheme(<StopNavigation {...defaultProps} />)

    // Open the definitive quit modal
    const definitivequitButton = getByRole('button', {
      name: '1. Definitive end to interview (refusal, unable to continue, etc.)',
    })
    fireEvent.click(definitivequitButton)

    // Get the modal props from the second render
    const modalProps = vi.mocked(Modal).mock.calls[1][0]
    // Simulate Modal's validate button onClick call
    modalProps.buttons[1].onClick()

    expect(mockDefinitiveQuit).toHaveBeenCalledOnce()
    expect(mockQuit).not.toHaveBeenCalled()
  })

  it('calls quit function when validate button is clicked in the modal', () => {
    const { getByRole } = renderWithTheme(<StopNavigation {...defaultProps} />)

    // Click on the temporary quit button
    const temporaryQuitButton = getByRole('button', {
      name: '2. Temporary interruption of the interview',
    })
    fireEvent.click(temporaryQuitButton)

    // Get the modal props from the second render
    const modalProps = vi.mocked(Modal).mock.calls[1][0]
    // Simulate Modal's validate button onClick call
    modalProps.buttons[1].onClick()

    expect(mockQuit).toHaveBeenCalledOnce()
    expect(mockDefinitiveQuit).not.toHaveBeenCalled()
  })
})
