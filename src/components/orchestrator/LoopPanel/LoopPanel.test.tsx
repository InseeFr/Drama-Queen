import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { InterrogationData, PageTag } from '@/core/model'

import { LoopPanel } from './LoopPanel'
import { isIterationReachable } from './utils'

const mockGoToPage = vi.fn()

vi.mock('./utils', () => ({
  isIterationReachable: vi.fn(),
}))

describe('LoopPanel Component', () => {
  const mockLoopVariables: string[] = ['loopTitle']
  const mockRoundaboutLoopVariables: string[] = ['loopTitle']
  const mockData: InterrogationData = {
    COLLECTED: {
      loopTitle: {
        COLLECTED: ['Iteration 1', 'Iteration 2', 'Iteration 3'],
      },
    },
  }
  const mockLastReachedPage: PageTag = '2'

  describe('simple loop', () => {
    const defaultProps = {
      loopVariables: mockLoopVariables,
      roundaboutLoopVariables: [],
      page: 1,
      subPage: 1,
      iteration: 0,
      lastReachedPage: mockLastReachedPage,
      data: mockData,
      goToPage: mockGoToPage,
    }

    it('renders correctly every iteration panel', () => {
      const { getAllByRole, getByText } = render(
        <LoopPanel {...defaultProps} />,
      )

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

    it('goes to the page {page, subPage:0} on button click', () => {
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

    it('displays the right arrow icon for every iteration, even disabled ones', () => {
      // we mock the isIterationReachable function : every iteration is reachable except iteration 1
      vi.mocked(isIterationReachable).mockImplementation(
        (_page, _lastReachedPage, iteration) => iteration !== 1,
      )

      const { container } = render(<LoopPanel {...defaultProps} />)

      const arrowIcon = container.querySelectorAll(
        'svg[data-testid="ChevronRightIcon"]',
      )
      expect(arrowIcon.length).toBe(3)
    })
  })

  describe('roundabout loop', () => {
    const defaultProps = {
      loopVariables: [],
      roundaboutLoopVariables: mockRoundaboutLoopVariables,
      page: 1,
      subPage: 1,
      iteration: 0,
      lastReachedPage: mockLastReachedPage,
      data: mockData,
      goToPage: mockGoToPage,
    }

    it('renders correctly every iteration panel', () => {
      const { getAllByRole, getByText } = render(
        <LoopPanel {...defaultProps} />,
      )

      const buttons = getAllByRole('button')

      expect(buttons).toHaveLength(3)
      expect(getByText('Iteration 1')).toBeInTheDocument()
      expect(getByText('Iteration 2')).toBeInTheDocument()
      expect(getByText('Iteration 3')).toBeInTheDocument()
    })

    it('disables all iteration panel buttons', () => {
      const { getAllByRole } = render(<LoopPanel {...defaultProps} />)

      const buttons = getAllByRole('button')

      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).toBeDisabled()
      expect(buttons[2]).toBeDisabled()
    })

    it('applies different styles for current and non-current iterations', () => {
      const props = { ...defaultProps, iteration: 1 }

      const { getAllByRole } = render(<LoopPanel {...props} />)

      const buttons = getAllByRole('button')
      expect(buttons[0].className).toContain('notCurrentIteration')
      expect(buttons[1].className).toContain('currentIteration')
      expect(buttons[2].className).toContain('notCurrentIteration')
    })

    it('does not display the right arrow icon on any iteration', () => {
      // we mock the isIterationReachable function : every iteration is reachable except iteration 1
      vi.mocked(isIterationReachable).mockImplementation(
        (_page, _lastReachedPage, iteration) => iteration !== 1,
      )

      const { container } = render(<LoopPanel {...defaultProps} />)

      const arrowIcon = container.querySelectorAll(
        'svg[data-testid="ChevronRightIcon"]',
      )
      expect(arrowIcon.length).toBe(0)
    })
  })

  describe('no loop panel', () => {
    const defaultProps = {
      loopVariables: mockLoopVariables,
      roundaboutLoopVariables: [],
      page: 1,
      subPage: undefined,
      iteration: undefined,
      lastReachedPage: mockLastReachedPage,
      data: mockData,
      goToPage: mockGoToPage,
    }

    it('returns null if both loopVariables and roundaboutLoopVariables are empty', () => {
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

    it('returns null in an occurrence paginated loop (titleData is a scalar variable)', () => {
      const props = {
        ...defaultProps,
        data: {
          COLLECTED: {
            loopTitle: {
              COLLECTED: 3,
            },
          },
        },
      }

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
})
