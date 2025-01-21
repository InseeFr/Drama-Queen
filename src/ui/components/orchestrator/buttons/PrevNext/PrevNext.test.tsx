import { fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'
import { SHORTCUT_NEXT, SHORTCUT_PREVIOUS } from '@/ui/constants'

import { ShortCut } from '../ShortCut/ShortCut'
import { PrevNext } from './PrevNext'

vi.mock('../ShortCut/ShortCut', () => ({
  ShortCut: vi.fn(),
}))

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('PrevNext Component', () => {
  const onPreviousMock = vi.fn()
  const onNextMock = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders previous and next buttons helper labels', () => {
    const { getByText } = render(
      <TestWrapper>
        <PrevNext
          isPreviousEnabled={true}
          isNextEnabled={true}
          onPrevious={onPreviousMock}
          onNext={onNextMock}
        />
      </TestWrapper>,
    )

    expect(getByText('previousHelper')).toBeInTheDocument()
    expect(getByText('nextHelper')).toBeInTheDocument()
  })

  it('renders disabled previous and next buttons when not enabled', () => {
    const { getByRole } = render(
      <TestWrapper>
        <PrevNext
          isPreviousEnabled={false}
          isNextEnabled={false}
          onPrevious={onPreviousMock}
          onNext={onNextMock}
        />
      </TestWrapper>,
    )

    expect(getByRole('button', { name: 'previous' })).toBeDisabled()
    expect(getByRole('button', { name: 'next' })).toBeDisabled()
  })

  it('calls onPrevious when previous button is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <PrevNext
          isPreviousEnabled={true}
          isNextEnabled={true}
          onPrevious={onPreviousMock}
          onNext={onNextMock}
        />
      </TestWrapper>,
    )

    fireEvent.click(getByRole('button', { name: 'previous' }))
    expect(onPreviousMock).toHaveBeenCalledTimes(1)
  })

  it('calls onNext when next button is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <PrevNext
          isPreviousEnabled={true}
          isNextEnabled={true}
          onPrevious={onPreviousMock}
          onNext={onNextMock}
        />
      </TestWrapper>,
    )

    fireEvent.click(getByRole('button', { name: 'next' }))
    expect(onNextMock).toHaveBeenCalledTimes(1)
  })

  it('renders ShortCut component for enabled buttons with correct key', () => {
    render(
      <TestWrapper>
        <PrevNext
          isPreviousEnabled={true}
          isNextEnabled={true}
          onPrevious={onPreviousMock}
          onNext={onNextMock}
        />
      </TestWrapper>,
    )

    // renders ShortCut for previous button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_PREVIOUS,
        onClickMethod: onPreviousMock,
      }),
      {},
    )

    // renders ShortCut for next button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_NEXT,
        onClickMethod: onNextMock,
      }),
      {},
    )
  })

  it('does not render ShortCut component for disabled buttons', () => {
    render(
      <TestWrapper>
        <PrevNext
          isPreviousEnabled={false}
          isNextEnabled={false}
          onPrevious={onPreviousMock}
          onNext={onNextMock}
        />
      </TestWrapper>,
    )

    expect(ShortCut).not.toHaveBeenCalled()
  })
})
