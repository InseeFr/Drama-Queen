import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '@/tests/render'

import { WelcomeBackModal } from './WelcomeBackModal'

describe('WelcomeBackModal', () => {
  it('is displayed when isOpen', () => {
    const { getByText } = renderWithTheme(
      <WelcomeBackModal isOpen={true} onClose={vi.fn()} onGoBack={vi.fn()} />,
    )

    expect(getByText('Welcome')).toBeInTheDocument()
    expect(
      getByText(
        'You have already started filling out the questionnaire. Would you like to resume where you left off or return to the first page ?',
      ),
    ).toBeInTheDocument()
    expect(getByText('Return to the first page')).toBeInTheDocument()
    expect(getByText('Resume where I left off')).toBeInTheDocument()
  })

  it('is not displayed when not isOpen', () => {
    const { queryByText } = renderWithTheme(
      <WelcomeBackModal isOpen={false} onClose={vi.fn()} onGoBack={vi.fn()} />,
    )

    expect(queryByText('Welcome')).toBeNull()
    expect(
      queryByText(
        'You have already started filling out the questionnaire. Would you like to resume where you left off or return to the first page ?',
      ),
    ).toBeNull()
    expect(queryByText('Return to the first page')).toBeNull()
    expect(queryByText('Resume where I left off')).toBeNull()
  })

  it('correctly triggers button functions', () => {
    const onClose = vi.fn()
    const onGoBack = vi.fn()

    const { getByText } = renderWithTheme(
      <WelcomeBackModal isOpen={true} onClose={onClose} onGoBack={onGoBack} />,
    )

    const closeButton = getByText('Return to the first page')
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)

    const goBackButton = getByText('Resume where I left off')
    fireEvent.click(goBackButton)

    expect(onGoBack).toHaveBeenCalledTimes(1)
  })
})
