import LinearProgress from '@mui/material/LinearProgress'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { LoadingDisplay } from './LoadingDisplay'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('@mui/material/LinearProgress', () => ({
  __esModule: true,
  default: vi.fn(),
}))

afterEach(() => {
  vi.clearAllMocks()
})

describe('LoadingDisplay Component', () => {
  it('renders synchronization title and step title', () => {
    const props = {
      syncStepTitle: 'sync step',
      progressBars: [{ label: 'Progress 1', progress: 50 }],
    }

    const { getByText } = render(<LoadingDisplay {...props} />)

    expect(getByText('synchronizationInProgress')).toBeInTheDocument()
    expect(getByText('sync step')).toBeInTheDocument()
  })

  it('renders progress bars with labels', () => {
    const props = {
      syncStepTitle: 'sync step',
      progressBars: [
        { label: 'Progress 1', progress: 50 },
        { label: 'Progress 2', progress: 75, count: 'Extra Info' },
      ],
    }

    const { getByText } = render(<LoadingDisplay {...props} />)

    // Check progress labels
    expect(getByText('Progress 1')).toBeInTheDocument()
    expect(getByText('Progress 2: Extra Info')).toBeInTheDocument()

    // Check progress bars
    expect(LinearProgress).toHaveBeenCalledTimes(2)
    expect(LinearProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'determinate',
        value: 50,
      }),
      undefined,
    )
    expect(LinearProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'determinate',
        value: 75,
      }),
      undefined,
    )
  })

  it('renders progress bars without labels', () => {
    const props = {
      syncStepTitle: 'sync step',
      progressBars: [{ progress: 50 }, { progress: 75 }],
    }

    render(<LoadingDisplay {...props} />)

    // Check progress bars
    expect(LinearProgress).toHaveBeenCalledTimes(2)
    expect(LinearProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'determinate',
        value: 50,
      }),
      undefined,
    )
    expect(LinearProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'determinate',
        value: 75,
      }),
      undefined,
    )
  })

  it('handles empty progressBars', () => {
    const props = { syncStepTitle: 'sync step', progressBars: [] }
    render(<LoadingDisplay {...props} />)

    // Check that no progress bars are rendered
    expect(LinearProgress).not.toHaveBeenCalled()
  })
})
