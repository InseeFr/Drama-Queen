import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StepProgressBar } from './StepProgressBar'

describe('StepProgressBar', () => {
  const defaultProps = { currentStep: 3, maxStep: 5 }

  it('renders the correct number of steps', () => {
    const { container } = render(<StepProgressBar {...defaultProps} />)

    // Check that there are 5 steps rendered in total
    const steps = [...Array(5)].map((_, index) =>
      container.querySelector(`#step-${index}`),
    )

    // Check all 5 steps are in the document
    steps.forEach((step) => {
      expect(step).toBeInTheDocument()
    })
  })

  it('marks as active all steps <= currentStep', () => {
    const { container } = render(<StepProgressBar {...defaultProps} />)

    const steps = [...Array(5)].map((_, index) =>
      container.querySelector(`#step-${index}`),
    )

    // Check that the first three steps are marked as active
    steps.forEach((step, index) => {
      if (index < 3) {
        expect(step).toHaveClass(/active/) // cannot check 'active' directly since tss-react generates dynamic class name with prefix
      } else {
        expect(step).not.toHaveClass(/active/)
      }
    })
  })
})
