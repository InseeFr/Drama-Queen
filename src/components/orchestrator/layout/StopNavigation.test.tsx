import { act, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Modal } from '@/components/ui/Modal'
import { TestWrapper } from '@/tests/TestWrapper'

import { MenuNavigationButton } from './MenuNavigationButton'
import { StopNavigation } from './StopNavigation'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

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
    const { getByText } = render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    expect(getByText('questionnaireStopNature')).toBeInTheDocument()
  })

  it('renders temporary stop and definitive stop items as MenuNavigationButton components', () => {
    render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // definitive stop
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: '1. definitiveQuestionnaireStop',
        onClick: expect.any(Function),
      }),
      {},
    )

    // temporary stop
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: '2. temporaryQuestionnaireStop',
        onClick: expect.any(Function),
      }),
      {},
    )
  })

  it('does not open the modal initially', () => {
    render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: false,
      }),
      {},
    )
  })

  it('opens the modal with correct content when definitive stop button is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // Click on the definitive quit button
    const definitivequitButton = getByRole('button', {
      name: '1. definitiveQuestionnaireStop',
    })
    fireEvent.click(definitivequitButton)

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        dialogTitle: 'definitiveQuitTitle',
        dialogContent: 'definitiveQuitContent',
        buttons: [
          expect.objectContaining({ label: 'cancel', autoFocus: false }),
          expect.objectContaining({
            label: 'definitiveQuitValidate',
            autoFocus: true,
          }),
        ],
        onClose: expect.any(Function),
      }),
      {},
    )
  })

  it('opens the modal with correct content when temporary stop button is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // Click on the temporary quit button
    const temporaryQuitButton = getByRole('button', {
      name: '2. temporaryQuestionnaireStop',
    })
    fireEvent.click(temporaryQuitButton)

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        dialogTitle: 'temporaryQuitTitle',
        dialogContent: 'temporaryQuitContent',
        buttons: [
          expect.objectContaining({ label: 'cancel', autoFocus: false }),
          expect.objectContaining({
            label: 'temporaryQuitValidate',
            autoFocus: true,
          }),
        ],
        onClose: expect.any(Function),
      }),
      {},
    )
  })

  it('closes the modal when the cancel button is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // Open the definitive quit modal
    const definitivequitButton = getByRole('button', {
      name: '1. definitiveQuestionnaireStop',
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
      {},
    )
  })

  it('calls definitiveQuit function when validate button is clicked in the modal', () => {
    const { getByRole } = render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // Open the definitive quit modal
    const definitivequitButton = getByRole('button', {
      name: '1. definitiveQuestionnaireStop',
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
    const { getByRole } = render(
      <TestWrapper>
        <StopNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // Click on the temporary quit button
    const temporaryQuitButton = getByRole('button', {
      name: '2. temporaryQuestionnaireStop',
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
