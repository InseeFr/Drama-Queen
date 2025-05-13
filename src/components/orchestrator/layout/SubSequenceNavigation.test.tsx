import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { OverviewItem } from '@/models/lunaticType'
import { TestWrapper } from '@/tests/TestWrapper'

import { MenuNavigationButton } from './MenuNavigationButton'
import { SubSequenceNavigation } from './SubSequenceNavigation'

vi.mock('./MenuNavigationButton', () => ({
  MenuNavigationButton: vi
    .fn()
    .mockImplementation(({ label, onClick }) => (
      <button onClick={onClick}>{label}</button>
    )),
}))

describe('SubSequenceNavigation Component', () => {
  const mockSubSequenceOnClick = vi.fn()

  const defaultSequence: OverviewItem = {
    id: 'seq-1',
    type: 'sequence',
    page: '1',
    label: 'Sequence 1',
    description: 'Description 1',
    reached: true,
    current: false,
    children: [
      {
        id: 'sub-seq-1',
        type: 'sub-sequence',
        page: '2',
        label: 'Sub-Sequence 1',
        description: 'Description 2',
        reached: true,
        current: false,
        children: [],
      },
      {
        id: 'sub-seq-2',
        type: 'sub-sequence',
        page: '3',
        label: 'Sub-Sequence 2',
        description: 'Description 3',
        reached: false,
        current: false,
        children: [],
      },
    ],
  }

  const defaultProps = {
    sequence: defaultSequence,
    subSequenceOnClick: mockSubSequenceOnClick,
  }

  it('renders the parent sequence as a MenuNavigationButton', () => {
    render(
      <TestWrapper>
        <SubSequenceNavigation {...defaultProps} />
      </TestWrapper>,
    )

    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.sequence.label,
        onClick: expect.any(Function),
      }),
      {},
    )
  })

  it('triggers the subSequenceOnClick when the parent sequence is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <SubSequenceNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // click on the parent sequence button
    const button = getByRole('button', {
      name: defaultProps.sequence.label as string,
    })

    fireEvent.click(button)

    expect(mockSubSequenceOnClick).toHaveBeenCalledWith(defaultProps.sequence)
  })

  it('renders all subSequences as a MenuNavigationButton', () => {
    render(
      <TestWrapper>
        <SubSequenceNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // first subSequence
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.sequence.children[0].label,
        disabled: false,
        onClick: expect.any(Function),
      }),
      {},
    )

    // second subSequence
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.sequence.children[1].label,
        disabled: true,
        onClick: expect.any(Function),
      }),
      {},
    )
  })

  it('triggers the subSequenceOnClick when a subSequence is clicked', () => {
    const { getByRole } = render(
      <TestWrapper>
        <SubSequenceNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // click on the first subSequence button
    const button = getByRole('button', {
      name: defaultProps.sequence.children[0].label as string,
    })

    fireEvent.click(button)

    expect(mockSubSequenceOnClick).toHaveBeenCalledWith(
      defaultProps.sequence.children[0],
    )
  })
})
