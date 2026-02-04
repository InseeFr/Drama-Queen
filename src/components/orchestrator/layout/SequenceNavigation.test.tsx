import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Overview } from '@/models/lunaticType'
import { renderWithTheme } from '@/tests/render'

import { MenuNavigationButton } from './MenuNavigationButton'
import { SequenceNavigation } from './SequenceNavigation'

vi.mock('./MenuNavigationButton', () => ({
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
    const { getByText } = renderWithTheme(
      <SequenceNavigation {...defaultProps} />,
    )

    expect(getByText('Questionnaire Title')).toBeInTheDocument()
  })

  it('renders all sequences as MenuNavigationButton components', () => {
    renderWithTheme(<SequenceNavigation {...defaultProps} />)

    // first sequence
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[0].label,
        disabled: false,
        endIcon: undefined,
        onClick: expect.any(Function),
      }),
      undefined,
    )

    // second sequence
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[1].label,
        disabled: true,
        endIcon: undefined,
        onClick: expect.any(Function),
      }),
      undefined,
    )
  })

  it('triggers the sequenceOnClick when a sequence is clicked in the menu', () => {
    const { getByRole } = renderWithTheme(
      <SequenceNavigation {...defaultProps} />,
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

    renderWithTheme(<SequenceNavigation {...props} />)

    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[0].label,
        className: expect.stringContaining('sequenceOpen'),
      }),
      undefined,
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

    renderWithTheme(<SequenceNavigation {...props} />)

    // Third sequence has subSequences
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: props.overview[2].label,
        endIcon: expect.anything(),
      }),
      undefined,
    )

    // First sequence dos not have subSequences
    expect(MenuNavigationButton).toHaveBeenCalledWith(
      expect.objectContaining({
        label: defaultProps.overview[0].label,
        endIcon: undefined,
      }),
      undefined,
    )
  })
})
