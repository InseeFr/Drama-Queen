import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { TelemetryProvider } from '@/contexts/TelemetryContext'
import { useCore } from '@/core'
import { useLoaderData } from '@/routes/routing/utils'

import { Collect } from './Collect'

vi.mock('@/core', () => ({
  useCore: vi.fn(),
}))
vi.mock('@/routes/routing/utils', () => ({
  useLoaderData: vi.fn(),
}))
vi.mock('@/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(),
}))
vi.mock('@/contexts/TelemetryContext', () => ({
  TelemetryProvider: vi.fn(({ children }) => children),
}))

describe('Collect Component', () => {
  it('renders Orchestrator with the correct props', () => {
    const mockLoaderData = {
      questionnaire: { id: 'q1', title: 'Questionnaire 1' },
      interrogation: { id: 'interro1', name: 'Interrogation 1' },
      page: '2',
    }

    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData)

    const mockCollectSurvey = {
      loader: vi.fn(),
      getReferentiel: vi.fn(),
      changePage: vi.fn(),
      changeInterrogationState: vi.fn(),
      quit: vi.fn(),
      addParadata: vi.fn(),
    }

    const mockCore = {
      functions: {
        collectSurvey: mockCollectSurvey,
      },
    }

    vi.mocked(useCore).mockReturnValue(mockCore as any)

    render(<Collect />)

    expect(Orchestrator).toHaveBeenCalledWith(
      expect.objectContaining({
        initialPage: mockLoaderData.page,
        source: mockLoaderData.questionnaire,
        interrogation: mockLoaderData.interrogation,
        readonly: false,
        onQuit: mockCollectSurvey.quit,
        onDefinitiveQuit: mockCollectSurvey.quit,
        onChangePage: mockCollectSurvey.changePage,
        getReferentiel: mockCollectSurvey.getReferentiel,
        onChangeInterrogationState: mockCollectSurvey.changeInterrogationState,
      }),
      undefined,
    )
  })

  it('renders TelemetryProvider with correct addParadata', () => {
    const mockLoaderData = {
      questionnaire: { id: 'q1', title: 'Questionnaire 1' },
      interrogation: { id: 'interro1', name: 'Interrogation 1' },
    }

    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData)

    const mockCollectSurvey = {
      loader: vi.fn(),
      getReferentiel: vi.fn(),
      changePage: vi.fn(),
      changeInterrogationState: vi.fn(),
      quit: vi.fn(),
      addParadata: vi.fn(),
    }

    vi.mocked(useCore).mockReturnValue({
      functions: {
        collectSurvey: mockCollectSurvey,
      },
    } as any)

    render(<Collect />)

    // Check that TelemetryProvider was called with correct addParadata
    expect(TelemetryProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        addParadata: mockCollectSurvey.addParadata,
      }),
      undefined, // children
    )
  })
})
