import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'

import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'
import type { Overview } from '../../lunaticType'
import { SequenceNavigation } from './SequenceNavigation'

vi.mock('../../buttons/MenuNavigationButton/MenuNavigationButton', () => ({
  MenuNavigationButton: vi
    .fn()
    .mockImplementation(({ label, onClick }) => (
      <button onClick={onClick}>{label}</button>
    )),
}))

describe('SequenceNavigation Component', () => {
  const mockSequenceOnClick = vi.fn()

  const defaultOverview: Overview = [
    {
      id: 'seq-1',
      type: 'sequence',
      page: '1',
      label: 'Sequence 1',
      description: 'Description 1',
      reached: true,
      current: false,
      children: [],
    },
    {
      id: 'seq-2',
      type: 'sequence',
      page: '2',
      label: 'Sequence 2',
      description: 'Description 2',
      reached: false,
      current: false,
      children: [],
    },
  ]

  const defaultProps = {
    questionnaireTitle: 'Questionnaire Title',
    overview: defaultOverview,
    selectedSequence: undefined,
    sequenceOnClick: mockSequenceOnClick,
  }

  it('renders the questionnaire title', () => {
    const { getByText } = render(
      <TestWrapper>
        <SequenceNavigation {...defaultProps} />
      </TestWrapper>,
    )

    expect(getByText('Questionnaire Title')).toBeInTheDocument()
  })

  it('renders all sequences as MenuNavigationButton components', () => {
    render(
      <TestWrapper>
        <SequenceNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // first sequence
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[0].label,
        disabled: false,
        endIcon: undefined,
        onClick: expect.any(Function),
      }),
      {},
    )

    // second sequence
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[1].label,
        disabled: true,
        endIcon: undefined,
        onClick: expect.any(Function),
      }),
      {},
    )
  })

  it('triggers the sequenceOnClick when a sequence is clicked in the menu', () => {
    const { getByRole } = render(
      <TestWrapper>
        <SequenceNavigation {...defaultProps} />
      </TestWrapper>,
    )

    // click on the second sequence button
    const button = getByRole('button', {
      name: defaultProps.overview[1].label as string,
    })

    fireEvent.click(button)

    expect(mockSequenceOnClick).toHaveBeenCalledWith(defaultProps.overview[1])
  })

  it('highlights the selected sequence', () => {
    const props = {
      ...defaultProps,
      selectedSequence: defaultProps.overview[0],
    }

    render(
      <TestWrapper>
        <SequenceNavigation {...props} />
      </TestWrapper>,
    )

    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[0].label,
        className: expect.stringContaining('sequenceOpen'),
      }),
      {},
    )
  })

  it('displays icon only for sequences with subSequences', () => {
    const overview: Overview = [
      ...defaultProps.overview,
      {
        id: 'seq-3',
        type: 'sequence',
        page: '3',
        label: 'Sequence 3',
        description: 'Description 3',
        reached: true,
        current: false,
        children: [
          {
            id: 'sub-seq-1',
            type: 'sub-sequence',
            page: '4',
            label: 'Sub-Sequence 1',
            description: 'Description 4',
            reached: true,
            current: false,
            children: [],
          },
        ],
      },
    ]

    const props = {
      ...defaultProps,
      overview: overview,
    }

    render(
      <TestWrapper>
        <SequenceNavigation {...props} />
      </TestWrapper>,
    )

    // Third sequence has subSequences
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: props.overview[2].label,
        endIcon: expect.anything(),
      }),
      {},
    )

    // First sequence dos not have subSequences
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[0].label,
        endIcon: undefined,
      }),
      {},
    )
  })
})
