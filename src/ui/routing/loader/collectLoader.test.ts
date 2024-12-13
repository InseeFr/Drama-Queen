import type { LoaderFunctionArgs } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { collectLoader } from './collectLoader'

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      collectSurvey: {
        loader: vi.fn(),
      },
    },
  },
}))

describe('collectLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call collectSurvey.loader with the correct parameters', async () => {
    const mockLoader = vi.fn()

    ;(await prCore).functions.collectSurvey.loader = mockLoader

    const mockParams = {
      questionnaireId: 'test-questionnaire-id',
      surveyUnitId: 'test-survey-unit-id',
    }

    const mockLoaderArgs = {
      params: mockParams,
    } as unknown as LoaderFunctionArgs

    await collectLoader(mockLoaderArgs)

    expect(mockLoader).toHaveBeenCalledWith({
      questionnaireId: mockParams.questionnaireId,
      surveyUnitId: mockParams.surveyUnitId,
    })
  })

  it('should throw an error if questionnaireId or surveyUnitId is undefined', async () => {
    await expect(
      collectLoader({
        params: {
          questionnaireId: undefined,
          surveyUnitId: 'test-survey-unit-id',
        },
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')

    await expect(
      collectLoader({
        params: {
          questionnaireId: 'questionnaireId',
          surveyUnitId: undefined,
        },
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')
  })
})
