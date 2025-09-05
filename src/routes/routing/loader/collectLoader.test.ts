import type { LoaderFunctionArgs } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { collectLoader } from './collectLoader'

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      collectSurvey: {
        retrieveQuestionnaireId: vi.fn(),
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
    const mockRetrieveQuestionnaireId = vi
      .fn()
      .mockResolvedValue('test-questionnaire-id')

    ;(await prCore).functions.collectSurvey.loader = mockLoader
    ;(await prCore).functions.collectSurvey.retrieveQuestionnaireId =
      mockRetrieveQuestionnaireId

    const mockParams = {
      surveyUnitId: 'test-survey-unit-id',
    }

    const mockLoaderArgs = {
      params: mockParams,
    } as unknown as LoaderFunctionArgs

    await collectLoader(mockLoaderArgs)

    expect(mockRetrieveQuestionnaireId).toHaveBeenCalledWith({
      surveyUnitId: mockParams.surveyUnitId,
    })

    expect(mockLoader).toHaveBeenCalledWith({
      questionnaireId: 'test-questionnaire-id',
      surveyUnitId: mockParams.surveyUnitId,
    })
  })

  it('should throw an exception if surveyUnitId is undefined', async () => {
    const mockLoader = vi.fn().mockResolvedValueOnce(undefined)

    ;(await prCore).functions.collectSurvey.retrieveQuestionnaireId = mockLoader

    await expect(
      collectLoader({
        params: {},
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')
  })

  it('should throw an exception if questionnaireId is undefined', async () => {
    const mockRetrieveQuestionnaireId = vi.fn().mockResolvedValueOnce(undefined)

    ;(await prCore).functions.collectSurvey.retrieveQuestionnaireId =
      mockRetrieveQuestionnaireId

    await expect(
      collectLoader({
        params: {
          surveyUnitId: 'test-survey-unit-id',
        },
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')
  })
})
