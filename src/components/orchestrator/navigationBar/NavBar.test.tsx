import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Overview } from '@/models/lunaticType'

import { NavBar } from './NavBar'
import { PageCount } from './PageCount'
import { PrevNext } from './PrevNext'
import { StepProgressBar } from './StepProgressBar'

vi.mock('./StepProgressBar', () => ({
  StepProgressBar: vi.fn(),
}))

vi.mock('./PageCount', () => ({
  PageCount: vi.fn(),
}))

vi.mock('./PrevNext', () => ({
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
      undefined,
    )
  })

  it('renders PageCount component for both page and subPage with the correct props', () => {
    const { rerender } = render(<NavBar {...defaultProps} />)

    // subPage count
    expect(PageCount).toHaveBeenCalledWith(
      {
        currentPage: defaultProps.subPage + 1,
        maxPage: defaultProps.nbSubPages,
      },
      undefined,
    )

    // page count
    expect(PageCount).toHaveBeenCalledWith(
      {
        currentPage: defaultProps.subPage + 1,
        maxPage: defaultProps.nbSubPages,
      },
      undefined,
    )

    // subPage count if subPage is undefined
    const propsWithoutSubPage = { ...defaultProps, subPage: undefined }
    rerender(<NavBar {...propsWithoutSubPage} />)

    expect(PageCount).toHaveBeenCalledWith(
      {
        currentPage: undefined,
        maxPage: defaultProps.nbSubPages,
      },
      undefined,
    )
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
      undefined,
    )
  })
})
