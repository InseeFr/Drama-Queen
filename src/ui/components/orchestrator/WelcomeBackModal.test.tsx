import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'

import { WelcomeBackModal } from './WelcomeBackModal'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('WelcomeBackModal', () => {
  it('is displayed when isOpen', () => {
    const { getByText } = render(
      <TestWrapper>
        <WelcomeBackModal isOpen={true} onClose={vi.fn()} onGoBack={vi.fn()} />
      </TestWrapper>,
    )

    expect(getByText('welcomeModalTitle')).toBeInTheDocument()
    expect(getByText('welcomeModalContent')).toBeInTheDocument()
    expect(getByText('welcomeModalFirstPage')).toBeInTheDocument()
    expect(getByText('welcomeModalGoBack')).toBeInTheDocument()
  })

  it('is not displayed when not isOpen', () => {
    const { queryByText } = render(
      <TestWrapper>
        <WelcomeBackModal isOpen={false} onClose={vi.fn()} onGoBack={vi.fn()} />
      </TestWrapper>,
    )

    expect(queryByText('welcomeModalTitle')).toBeNull()
    expect(queryByText('welcomeModalContent')).toBeNull()
    expect(queryByText('welcomeModalFirstPage')).toBeNull()
    expect(queryByText('welcomeModalGoBack')).toBeNull()
  })

  it('correctly triggers button functions', () => {
    const onClose = vi.fn()
    const onGoBack = vi.fn()

    const { getByText } = render(
      <TestWrapper>
        <WelcomeBackModal isOpen={true} onClose={onClose} onGoBack={onGoBack} />
      </TestWrapper>,
    )

    const closeButton = getByText('welcomeModalFirstPage')
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)

    const goBackButton = getByText('welcomeModalGoBack')
    fireEvent.click(goBackButton)

    expect(onGoBack).toHaveBeenCalledTimes(1)
  })
})
