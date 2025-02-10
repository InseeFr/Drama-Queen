import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PrevNext } from '../buttons/PrevNext/PrevNext'
import type { Overview } from '../lunaticType'
import { NavBar } from './NavBar'
import { StepProgressBar } from './StepProgressBar'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('./StepProgressBar', () => ({
  StepProgressBar: vi.fn(),
}))

vi.mock('../buttons/PrevNext/PrevNext', () => ({
  PrevNext: vi.fn(),
}))

describe('NavBar Component', () => {
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
      label: 'Sequence 1',
      description: 'Description 2',
      reached: true,
      current: true,
      children: [],
    },
    {
      id: 'seq-3',
      type: 'sequence',
      page: '3',
      label: 'Sequence 3',
      description: 'Description 3',
      reached: true,
      current: false,
      children: [],
    },
  ]

  const defaultProps = {
    overview: defaultOverview,
    page: 2,
    maxPage: 5,
    subPage: 1,
    nbSubPages: 3,
    isPreviousEnabled: true,
    isNextEnabled: true,
    onPrevious: vi.fn(),
    onNext: vi.fn(),
  }

  it('renders StepProgressBar with correct props', () => {
    render(<NavBar {...defaultProps} />)

    expect(StepProgressBar).toHaveBeenCalledWith(
      {
        currentStep: 2, // index of the current sequence + 1 in the overview
        maxStep: 3, // number of sequences in the overview
      },
      {},
    )
  })

  it('displays correctly the page and subPage count', () => {
    const { getAllByText, getByText } = render(<NavBar {...defaultProps} />)

    // pageNumber is displayed twice : for page and for subPage
    expect(getAllByText('pageNumber')).toHaveLength(2)

    // page count : `${page}/${maxPage}`
    expect(getByText('2/5')).toBeInTheDocument()

    // subPage count : subPage is an index starting at 0, we display ${subPage}+1
    expect(getByText('2/3')).toBeInTheDocument()
  })

  it('hides the subPage information if subPage is undefined', () => {
    const props = { ...defaultProps, subPage: undefined, nbSubPages: undefined }

    const { container } = render(<NavBar {...props} />)
    const subPageStack = container.querySelector('#progress-subPage')
    expect(subPageStack).toBeInTheDocument()
    expect(subPageStack).toHaveStyle('visibility: hidden')
  })

  it('renders PrevNext component with the correct props', () => {
    render(<NavBar {...defaultProps} />)

    expect(PrevNext).toHaveBeenCalledWith(
      {
        isPreviousEnabled: defaultProps.isPreviousEnabled,
        isNextEnabled: defaultProps.isNextEnabled,
        onPrevious: defaultProps.onPrevious,
        onNext: defaultProps.onNext,
      },
      {},
    )
  })
})
