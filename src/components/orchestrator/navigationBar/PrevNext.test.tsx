import { fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ShortCut } from '@/components/ui/ShortCut'
import { SHORTCUT_NEXT, SHORTCUT_PREVIOUS } from '@/constants/shortcuts'
import { renderWithTheme } from '@/tests/render'

import { PrevNext } from './PrevNext'

vi.mock('@/components/ui/ShortCut', () => ({
  ShortCut: vi.fn(),
}))

describe('PrevNext Component', () => {
  const onPreviousMock = vi.fn()
  const onNextMock = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders previous and next buttons helper labels', () => {
    const { getByText } = renderWithTheme(
      <PrevNext
        isPreviousEnabled={true}
        isNextEnabled={true}
        onPrevious={onPreviousMock}
        onNext={onNextMock}
      />,
    )

    expect(getByText('PREV.')).toBeInTheDocument()
    expect(getByText('NEXT')).toBeInTheDocument()
  })

  it('renders disabled previous and next buttons when not enabled', () => {
    const { getByRole } = renderWithTheme(
      <PrevNext
        isPreviousEnabled={false}
        isNextEnabled={false}
        onPrevious={onPreviousMock}
        onNext={onNextMock}
      />,
    )

    expect(getByRole('button', { name: 'previous' })).toBeDisabled()
    expect(getByRole('button', { name: 'next' })).toBeDisabled()
  })

  it('calls onPrevious when previous button is clicked', () => {
    const { getByRole } = renderWithTheme(
      <PrevNext
        isPreviousEnabled={true}
        isNextEnabled={true}
        onPrevious={onPreviousMock}
        onNext={onNextMock}
      />,
    )

    fireEvent.click(getByRole('button', { name: 'previous' }))
    expect(onPreviousMock).toHaveBeenCalledTimes(1)
  })

  it('calls onNext when next button is clicked', () => {
    const { getByRole } = renderWithTheme(
      <PrevNext
        isPreviousEnabled={true}
        isNextEnabled={true}
        onPrevious={onPreviousMock}
        onNext={onNextMock}
      />,
    )

    fireEvent.click(getByRole('button', { name: 'next' }))
    expect(onNextMock).toHaveBeenCalledTimes(1)
  })

  it('renders ShortCut component for enabled buttons with correct key', () => {
    renderWithTheme(
      <PrevNext
        isPreviousEnabled={true}
        isNextEnabled={true}
        onPrevious={onPreviousMock}
        onNext={onNextMock}
      />,
    )

    // renders ShortCut for previous button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_PREVIOUS,
        onClickMethod: onPreviousMock,
      }),
      undefined,
    )

    // renders ShortCut for next button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_NEXT,
        onClickMethod: onNextMock,
      }),
      undefined,
    )
  })

  it('does not render ShortCut component for disabled buttons', () => {
    renderWithTheme(
      <PrevNext
        isPreviousEnabled={false}
        isNextEnabled={false}
        onPrevious={onPreviousMock}
        onNext={onNextMock}
      />,
    )

    expect(ShortCut).not.toHaveBeenCalled()
  })
})
