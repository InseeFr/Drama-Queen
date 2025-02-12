import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { PageTag, SurveyUnitData } from '@/core/model'

import { isIterationReachable } from '../tools/functions'
import { LoopPanel } from './LoopPanel'

const mockGoToPage = vi.fn()

vi.mock('@/ui/components/orchestrator/tools/functions', () => ({
  isIterationReachable: vi.fn(),
}))

describe('LoopPanel Component', () => {
  const mockLoopVariables = ['loopTitle']
  const mockData: SurveyUnitData = {
    COLLECTED: {
      loopTitle: {
        COLLECTED: ['Iteration 1', 'Iteration 2', 'Iteration 3'],
      },
    },
  }
  const mockLastReachedPage: PageTag = '2'

  const defaultProps = {
    loopVariables: mockLoopVariables,
    page: 1,
    subPage: undefined,
    iteration: undefined,
    lastReachedPage: mockLastReachedPage,
    data: mockData,
    goToPage: mockGoToPage,
  }

  it('renders correctly every iteration panel', () => {
    const { getAllByRole, getByText } = render(<LoopPanel {...defaultProps} />)

    const buttons = getAllByRole('button')

    expect(buttons).toHaveLength(3)
    expect(getByText('Iteration 1')).toBeInTheDocument()
    expect(getByText('Iteration 2')).toBeInTheDocument()
    expect(getByText('Iteration 3')).toBeInTheDocument()
  })

  it('disables buttons for unreachable iterations', () => {
    // we mock the isIterationReachable function : every iteration is reachable except iteration 1
    vi.mocked(isIterationReachable).mockImplementation(
      (_page, _lastReachedPage, iteration) => iteration !== 1,
    )

    const { getAllByRole } = render(<LoopPanel {...defaultProps} />)

    const buttons = getAllByRole('button')

    // considering isIterationReachable mock : only button for iteration 1 is disabled
    expect(buttons[0]).not.toBeDisabled()
    expect(buttons[1]).toBeDisabled()
    expect(buttons[2]).not.toBeDisabled()
  })

  it('go to the page {page, subPage:0} page on button click', () => {
    const { getAllByRole } = render(<LoopPanel {...defaultProps} />)

    const buttons = getAllByRole('button')

    // iteration 0
    fireEvent.click(buttons[0])
    expect(mockGoToPage).toHaveBeenCalledWith({
      page: 1,
      subPage: 0,
      iteration: 0,
    })

    // iteration 2
    fireEvent.click(buttons[2])
    expect(mockGoToPage).toHaveBeenCalledWith({
      page: 1,
      subPage: 0,
      iteration: 2,
    })
  })

  it('applies different styles for current and non-current iterations', () => {
    const props = { ...defaultProps, iteration: 1 }

    const { getAllByRole } = render(<LoopPanel {...props} />)

    const buttons = getAllByRole('button')
    expect(buttons[0].className).toContain('notCurrentIteration')
    expect(buttons[1].className).toContain('currentIteration')
    expect(buttons[2].className).toContain('notCurrentIteration')
  })

  it('returns null if loopVariables is empty (we are not in a loop)', () => {
    const props = { ...defaultProps, loopVariables: [] }

    const { container } = render(<LoopPanel {...props} />)
    expect(container.firstChild).toBeNull()
  })

  it('returns null if lastReachedPage is undefined', () => {
    const props = { ...defaultProps, lastReachedPage: undefined }

    const { container } = render(<LoopPanel {...props} />)
    expect(container.firstChild).toBeNull()
  })

  it('returns null if data.COLLECTED is undefined', () => {
    const props = { ...defaultProps, data: { COLLECTED: undefined } }

    const { container } = render(<LoopPanel {...props} />)
    expect(container.firstChild).toBeNull()
  })

  it('returns null if there is no data as title', () => {
    const props = {
      ...defaultProps,
      data: {
        COLLECTED: {
          loopTitle: {
            COLLECTED: undefined,
          },
        },
      },
    }

    const { container } = render(<LoopPanel {...props} />)
    expect(container.firstChild).toBeNull()
  })
})
