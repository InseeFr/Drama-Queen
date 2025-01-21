import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { GoToPage, OverviewItem } from '../lunaticType'
import { Breadcrumb } from './Breadcrumb'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('Breadcrumb Component', () => {
  const goToPageMock: GoToPage = vi.fn()

  const mockSequence: OverviewItem = {
    id: '1',
    type: 'sequence',
    page: '1',
    label: 'Sequence Label',
    description: 'Sequence Description',
    reached: true,
    current: true,
    children: [],
  }

  const mockSubSequence: OverviewItem = {
    id: '2',
    type: 'subSequence',
    page: '2',
    label: 'SubSequence Label',
    description: 'SubSequence Description',
    reached: true,
    current: true,
    children: [],
  }

  it('renders sequence and subSequence buttons when both are provided', () => {
    const { getByText } = render(
      <Breadcrumb
        sequence={mockSequence}
        subSequence={mockSubSequence}
        goToPage={goToPageMock}
      />,
    )

    expect(getByText('Sequence Label')).toBeInTheDocument()
    expect(getByText('SubSequence Label')).toBeInTheDocument()
  })

  it('calls goToSequencePage when sequence button is clicked', () => {
    const { getByText } = render(
      <Breadcrumb
        sequence={mockSequence}
        subSequence={mockSubSequence}
        goToPage={goToPageMock}
      />,
    )

    const sequenceButton = getByText('Sequence Label')
    fireEvent.click(sequenceButton)

    expect(goToPageMock).toHaveBeenCalledWith({ page: '1' })
  })

  it('calls goToSubSequencePage when subSequence button is clicked', () => {
    const { getByText } = render(
      <Breadcrumb
        sequence={mockSequence}
        subSequence={mockSubSequence}
        goToPage={goToPageMock}
      />,
    )

    const subSequenceButton = getByText('SubSequence Label')
    fireEvent.click(subSequenceButton)

    expect(goToPageMock).toHaveBeenCalledWith({ page: '2' })
  })

  it('renders only the sequence button when subSequence is undefined', () => {
    const { getByText, queryByText } = render(
      <Breadcrumb
        sequence={mockSequence}
        subSequence={undefined}
        goToPage={goToPageMock}
      />,
    )

    expect(getByText('Sequence Label')).toBeInTheDocument()
    expect(queryByText('SubSequence Label')).toBeNull()
  })

  it('renders only the subSequence button when sequence is undefined', () => {
    const { getByText, queryByText } = render(
      <Breadcrumb
        sequence={undefined}
        subSequence={mockSubSequence}
        goToPage={goToPageMock}
      />,
    )

    expect(getByText('SubSequence Label')).toBeInTheDocument()
    expect(queryByText('Sequence Label')).toBeNull()
  })
})
