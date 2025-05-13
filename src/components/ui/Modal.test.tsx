import { fireEvent, render } from '@testing-library/react'

import { TestWrapper } from '@/tests/TestWrapper'

import { Modal } from './Modal'

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    dialogTitle: 'Modal Title',
    dialogContent: 'This is the modal content',
    buttons: [
      { label: 'Close', onClick: vi.fn(), autoFocus: false },
      { label: 'Confirm', onClick: vi.fn(), autoFocus: true },
    ],
    onClose: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the modal with provided props', () => {
    const { getByText } = render(
      <TestWrapper>
        <Modal {...defaultProps} />
      </TestWrapper>,
    )

    expect(getByText('Modal Title')).toBeInTheDocument()
    expect(getByText('This is the modal content')).toBeInTheDocument()
    expect(getByText('Close')).toBeInTheDocument()
    expect(getByText('Confirm')).toBeInTheDocument()
  })

  it('should close the modal when close button is clicked', () => {
    const { getByLabelText } = render(
      <TestWrapper>
        <Modal {...defaultProps} />
      </TestWrapper>,
    )
    const closeButton = getByLabelText('close')

    fireEvent.click(closeButton)

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('should not close the modal when clicked outside if mandatory prop is true', () => {
    const props = { ...defaultProps, mandatory: true }
    const { getByTestId } = render(
      <TestWrapper>
        <Modal {...props} />
      </TestWrapper>,
    )

    const backdrop = getByTestId('modal-backdrop') // Backdrop div
    fireEvent.click(backdrop)

    expect(defaultProps.onClose).not.toHaveBeenCalled()
  })

  it('should trigger button onClick handler when buttons are clicked', () => {
    const { getByText } = render(
      <TestWrapper>
        <Modal {...defaultProps} />
      </TestWrapper>,
    )

    const confirmButton = getByText('Confirm')
    fireEvent.click(confirmButton)

    // Expect the onClick handler of the confirm button to be called
    expect(defaultProps.buttons[1].onClick).toHaveBeenCalledTimes(1)

    // as the mock buttons onClick does not do anything, the modal is still open so we can test other clicks
    const closeButton = getByText('Close')
    fireEvent.click(closeButton)

    // Expect the onClick handler of the close button to be called
    expect(defaultProps.buttons[0].onClick).toHaveBeenCalledTimes(1)
  })

  it('should not render the close button when mandatory is true', () => {
    const props = { ...defaultProps, mandatory: true }
    const { queryByLabelText } = render(
      <TestWrapper>
        <Modal {...props} />
      </TestWrapper>,
    )

    expect(queryByLabelText('close')).not.toBeInTheDocument()
  })

  it('should render the modal dialog as closed when isOpen is false', () => {
    const props = { ...defaultProps, isOpen: false }
    const { queryByRole } = render(
      <TestWrapper>
        <Modal {...props} />
      </TestWrapper>,
    )

    // Expect the dialog to not be in the document
    const dialog = queryByRole('dialog')
    expect(dialog).not.toBeInTheDocument()
  })
})
