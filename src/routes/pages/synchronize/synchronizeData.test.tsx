import { render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCore, useCoreState } from '@/core'

import { SynchronizeData } from './SynchronizeData'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
  getTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('@/core') // Global mock of `useCore` and `useCoreState`

const mockUpload = vi.fn()
const mockAttach = vi.fn()

describe('SynchronizeData', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    // Default Mock Implementations
    vi.mocked(useCoreState).mockReturnValue({
      hideProgress: false,
      isUploading: false,
      isDownloading: false,
      uploadInterrogationProgress: 0,
    })

    vi.mocked(useCore).mockReturnValue({
      functions: {
        synchronizeData: {
          upload: mockUpload,
        },
      },
      evts: {
        evtSynchronizeData: {
          $attach: mockAttach,
        },
      },
    } as any) // type issues
  })

  afterEach(() => vi.clearAllMocks())

  it('should call synchronizeData.upload on mount', async () => {
    render(<SynchronizeData />)

    await waitFor(() => {
      expect(mockUpload).toHaveBeenCalled()
    })
  })

  it('should render the loading display with upload progress', async () => {
    vi.mocked(useCoreState).mockReturnValue({
      hideProgress: false,
      isUploading: true,
      isDownloading: false,
      uploadInterrogationProgress: 50,
      uploadParadataProgress: 30,
    })

    const { getByText, getAllByRole } = render(<SynchronizeData />)

    // Check that loading display is rendered with upload progress
    expect(getByText('synchronizationInProgress')).toBeInTheDocument()
    expect(getByText('uploadingData')).toBeInTheDocument()

    // Check that all progress bars are rendered
    const progressBars = getAllByRole('progressbar')
    expect(progressBars).toHaveLength(2)
    expect(progressBars[0]).toHaveAttribute('aria-valuenow', '50') // interrogation
    expect(progressBars[1]).toHaveAttribute('aria-valuenow', '30') // paradata
  })

  it('should render the loading display with download progress', () => {
    vi.mocked(useCoreState).mockReturnValue({
      hideProgress: false,
      isUploading: false,
      isDownloading: true,
      surveyProgress: 10,
      nomenclatureProgress: 20,
      interrogationProgress: 30,
      externalResourcesProgress: 15,
      externalResourcesProgressCount: {
        totalExternalResources: 10,
        externalResourcesCompleted: 2,
      },
    })

    const { getByText, getAllByRole } = render(<SynchronizeData />)

    // Check that loading display is rendered with download progress
    expect(getByText('synchronizationInProgress')).toBeInTheDocument()
    expect(getByText('downloadingData')).toBeInTheDocument()

    // Check that all progress bars are rendered
    const progressBars = getAllByRole('progressbar')
    expect(progressBars).toHaveLength(4)
    expect(progressBars[0]).toHaveAttribute('aria-valuenow', '10') // survey
    expect(progressBars[1]).toHaveAttribute('aria-valuenow', '20') // nomenclature
    expect(progressBars[2]).toHaveAttribute('aria-valuenow', '30') // interrogation
    expect(progressBars[3]).toHaveAttribute('aria-valuenow', '15') // external resources

    // Check that extra title for external resources progress is displayed
    expect(getByText('externalResourcesProgress: 2 / 10')).toBeInTheDocument()
  })

  it('should not render external resources progress bar only if externalResourcesProgress and externalResourcesProgressCount are undefined', () => {
    vi.mocked(useCoreState).mockReturnValue({
      hideProgress: false,
      isUploading: false,
      isDownloading: true,
      surveyProgress: 10,
      nomenclatureProgress: 20,
      interrogationProgress: 30,
      externalResourcesProgress: undefined, // No external resources
      externalResourcesProgressCount: undefined,
    } as any)

    const { getAllByRole, queryByText } = render(<SynchronizeData />)

    // Check that all progress bars are rendered except external resources
    const progressBars = getAllByRole('progressbar')
    expect(progressBars).toHaveLength(3)

    // Check that the external resources progress is not displayed
    expect(queryByText('externalResourcesProgress')).not.toBeInTheDocument()
  })

  it('should not render anything if hideProgress is true', () => {
    vi.mocked(useCoreState).mockReturnValue({
      hideProgress: true,
    })

    const { queryByText } = render(<SynchronizeData />)

    expect(queryByText('synchronizationInProgress')).toBeNull()
  })

  it('should handle redirect event correctly', async () => {
    render(<SynchronizeData />)

    // Check that window.location is updated
    await waitFor(() => {
      // Normalize both URLs before comparison. No better idea since the redirect adds a "/" at the end of url
      const actualLocation = window.location.toString().replace(/\/$/, '')
      const expectedLocation = window.location.origin.replace(/\/$/, '')

      expect(actualLocation).toBe(expectedLocation)
    })
  })
})
