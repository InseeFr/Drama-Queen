import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CenteredSpinner } from './CenteredSpinner'

describe('CenteredSpinner', () => {
  it('should render the CircularProgress spinner', () => {
    render(<CenteredSpinner />)

    const spinner = screen.getByRole('progressbar')
    expect(spinner).toBeInTheDocument()
  })
})
