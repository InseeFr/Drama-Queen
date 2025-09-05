import type { LoaderFunctionArgs } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { reviewLoader } from './reviewLoader'

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      reviewSurvey: {
        retrieveQuestionnaireId: vi.fn(),
        loader: vi.fn(),
      },
      userAuthentication: {
        loginIfNotLoggedIn: vi.fn(),
      },
    },
  },
}))

describe('reviewLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call collectSurvey.loader with the correct parameters', async () => {
    const mockLoader = vi.fn()
    const mockRetrieveQuestionnaireId = vi
      .fn()
      .mockResolvedValue('test-questionnaire-id')

    ;(await prCore).functions.reviewSurvey.loader = mockLoader
    ;(await prCore).functions.reviewSurvey.retrieveQuestionnaireId =
      mockRetrieveQuestionnaireId

    const mockParams = {
      surveyUnitId: 'test-survey-unit-id',
    }

    const mockLoaderArgs = {
      params: mockParams,
    } as unknown as LoaderFunctionArgs

    await reviewLoader(mockLoaderArgs)

    expect(mockLoader).toHaveBeenCalledWith({
      questionnaireId: 'test-questionnaire-id',
      surveyUnitId: mockParams.surveyUnitId,
    })
  })

  it('should throw an exception if surveyUnitId is undefined', async () => {
    const mockLoader = vi.fn().mockResolvedValueOnce(undefined)

    ;(await prCore).functions.reviewSurvey.retrieveQuestionnaireId = mockLoader

    await expect(
      reviewLoader({
        params: {},
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')
  })

  it('should throw an exception if questionnaireId is undefined', async () => {
    const mockRetrieveQuestionnaireId = vi.fn().mockResolvedValueOnce(undefined)

    ;(await prCore).functions.reviewSurvey.retrieveQuestionnaireId =
      mockRetrieveQuestionnaireId

    await expect(
      reviewLoader({
        params: {
          surveyUnitId: 'test-survey-unit-id',
        },
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')
  })
})
