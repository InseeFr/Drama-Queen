import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useCore } from '@/core'
import type { SurveyUnit } from '@/core/model'
import { Modal } from '@/ui/components/Modal'
import { Orchestrator } from '@/ui/components/orchestrator/Orchestrator'
import { useLoaderData } from '@/ui/routing/utils'

import { Review } from './Review'

vi.mock('@/ui/routing/utils', () => ({
  useLoaderData: vi.fn(),
}))

vi.mock('@/core', () => ({
  useCore: vi.fn(),
}))

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('@/ui/components/Modal', () => ({
  Modal: vi.fn(),
}))

vi.mock('@/ui/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(),
}))

describe('Review', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders Orchestrator with correct props', () => {
    const mockLoaderData = {
      questionnaire: { id: 'q1' },
      surveyUnit: { id: 'su1' },
    }

    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData)

    const mockReviewSurvey = {
      getReferentiel: vi.fn(),
    }

    const mockCore = {
      functions: {
        reviewSurvey: mockReviewSurvey,
      },
    }

    vi.mocked(useCore).mockReturnValue(mockCore as any)

    render(<Review />)

    expect(Orchestrator).toHaveBeenCalledWith(
      expect.objectContaining({
        source: mockLoaderData.questionnaire,
        surveyUnit: mockLoaderData.surveyUnit,
        readonly: true,
        onQuit: expect.any(Function),
        onDefinitiveQuit: expect.any(Function),
        onChangePage: undefined,
        getReferentiel: mockReviewSurvey.getReferentiel,
      }),
      {},
    )
  })

  it('opens and closes the quit modal', () => {
    const mockLoaderData = {
      questionnaire: { id: 'q1' },
      surveyUnit: { id: 'su1' },
    }

    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData)

    const mockReviewSurvey = {
      getReferentiel: vi.fn(),
    }

    const mockCore = {
      functions: {
        reviewSurvey: mockReviewSurvey,
      },
    }

    vi.mocked(useCore).mockReturnValue(mockCore as any)

    const { rerender } = render(<Review />)

    // Simulate Orchestrator's onQuit call
    const { onQuit } = vi.mocked(Orchestrator).mock.calls[0][0]

    if (onQuit) {
      onQuit(mockLoaderData.surveyUnit as SurveyUnit)
    }

    rerender(<Review />)

    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        dialogTitle: 'reviewQuitTitle',
        dialogContent: 'reviewQuitContent',
        buttons: expect.arrayContaining([
          expect.objectContaining({ label: 'cancel', autoFocus: false }),
        ]),
        onClose: expect.any(Function),
      }),
      expect.anything(),
    )

    // Simulate Modal's onClose call
    const modalProps = vi.mocked(Modal).mock.calls[0][0]
    modalProps.onClose()

    // Rerender to reflect state change
    rerender(<Review />)

    expect(Modal).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
      }),
      expect.anything(),
    )
  })
})
