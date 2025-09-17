import { act, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { Modal } from '@/components/ui/Modal'
import { useCore } from '@/core'
import type { Interrogation } from '@/core/model'
import { useLoaderData } from '@/routes/routing/utils'

import { Review } from './Review'

vi.mock('@/routes/routing/utils', () => ({
  useLoaderData: vi.fn(),
}))

vi.mock('@/core', () => ({
  useCore: vi.fn(),
}))

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('@/components/ui/Modal', () => ({
  Modal: vi.fn(),
}))

vi.mock('@/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(),
}))

describe('Review', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders Orchestrator with correct props', () => {
    const mockLoaderData = {
      questionnaire: { id: 'q1' },
      interrogation: { id: 'interro1' },
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
        interrogation: mockLoaderData.interrogation,
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
      interrogation: { id: 'interro1' },
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

    // Simulate Orchestrator's onQuit call
    const { onQuit } = vi.mocked(Orchestrator).mock.calls[0][0]

    if (onQuit) {
      act(() => {
        onQuit(mockLoaderData.interrogation as Interrogation)
      })
    }

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
    act(() => {
      modalProps.onClose()
    })

    expect(Modal).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
      }),
      expect.anything(),
    )
  })
})
