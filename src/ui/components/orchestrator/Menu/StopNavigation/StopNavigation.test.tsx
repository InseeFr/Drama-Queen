import { fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'
import { Modal } from '@/ui/components/Modal'

import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'
import { StopNavigation } from './StopNavigation'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('../../buttons/MenuNavigationButton/MenuNavigationButton', () => ({
  MenuNavigationButton: vi
    .fn()
    .mockImplementation(({ label, onClick }) => (
      <button onClick={onClick}>{label}</button>
    )),
}))

vi.mock('@/ui/components/Modal', () => ({
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
    modalProps.onClose()

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: false,
      }),
      {},
    )
  })
})
