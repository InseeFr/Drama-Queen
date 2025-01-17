import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useCore } from '@/core'
import { Orchestrator } from '@/ui/components/orchestrator/Orchestrator'
import { useLoaderData } from '@/ui/routing/utils'

import { Collect } from './Collect'

vi.mock('@/core', () => ({
  useCore: vi.fn(),
}))
vi.mock('@/ui/routing/utils', () => ({
  useLoaderData: vi.fn(),
}))
vi.mock('@/ui/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(),
}))

describe('Collect Component', () => {
  it('renders Orchestrator with the correct props', () => {
    const mockLoaderData = {
      questionnaire: { id: 'q1', title: 'Questionnaire 1' },
      surveyUnit: { id: 'su1', name: 'Survey Unit 1' },
    }

    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData)

    const mockCollectSurvey = {
      getReferentiel: vi.fn(),
      changePage: vi.fn(),
      changeSurveyUnitState: vi.fn(),
      quit: vi.fn(),
      retrieveQuestionnaireId: vi.fn(),
      loader: vi.fn(),
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
        source: mockLoaderData.questionnaire,
        surveyUnit: mockLoaderData.surveyUnit,
        readonly: false,
        onQuit: mockCollectSurvey.quit,
        onDefinitiveQuit: mockCollectSurvey.quit,
        onChangePage: mockCollectSurvey.changePage,
        getReferentiel: mockCollectSurvey.getReferentiel,
        onChangeSurveyUnitState: mockCollectSurvey.changeSurveyUnitState,
      }),
      {},
    )
  })
})
