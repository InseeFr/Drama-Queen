import { render } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import type { SurveyUnit } from '@/core/model'
import { useLoaderData } from '@/routes/routing/utils'
import { downloadAsJson } from '@/utils/files'

import { Visualize } from './Visualize'
import { VisualizeForm } from './VisualizeForm'

vi.mock('@/routes/routing/utils', () => ({
  useLoaderData: vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))
vi.mock('@/utils/files', () => ({
  downloadAsJson: vi.fn(),
}))
vi.mock('@/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(),
}))
vi.mock('./VisualizeForm', () => ({
  VisualizeForm: vi.fn(),
}))

describe('Visualize Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders Orchestrator when loaderData is available', async () => {
    const mockLoaderData = {
      source: 'mockSource',
      surveyUnit: { id: 'mockSurveyUnit' },
      readonly: true,
      getReferentiel: vi.fn(),
    }

    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData)

    render(<Visualize />)

    expect(Orchestrator).toHaveBeenCalledWith(
      expect.objectContaining({
        source: mockLoaderData.source,
        surveyUnit: mockLoaderData.surveyUnit,
        readonly: mockLoaderData.readonly,
        onQuit: expect.any(Function),
        onDefinitiveQuit: expect.any(Function),
        onChangePage: undefined,
        getReferentiel: mockLoaderData.getReferentiel,
      }),
      {},
    )
  })

  it('renders VisualizeForm when loaderData is null', async () => {
    vi.mocked(useLoaderData).mockReturnValue(null as any) // type issue even if loaderData can be null

    render(<Visualize />)

    expect(VisualizeForm).toHaveBeenCalled()
  })

  it('calls onQuit with surveyUnit and navigates to /visualize', async () => {
    const mockLoaderData = {
      source: 'mockSource',
      surveyUnit: { id: 'mockSurveyUnit' },
      readonly: true,
      getReferentiel: vi.fn(),
    }

    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData)

    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(<Visualize />)

    // Simulate Orchestrator's onQuit call
    const { onQuit } = vi.mocked(Orchestrator).mock.calls[0][0]

    if (onQuit) {
      onQuit(mockLoaderData.surveyUnit as SurveyUnit)
    }

    expect(downloadAsJson).toHaveBeenCalledWith({
      data: mockLoaderData.surveyUnit,
    })
    expect(mockNavigate).toHaveBeenCalledWith('/visualize')
  })
})
