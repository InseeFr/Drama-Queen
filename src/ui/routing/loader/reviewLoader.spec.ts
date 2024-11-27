import { prCore } from 'createCore'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { reviewLoader } from './reviewLoader'

vi.mock('createCore', () => ({
  prCore: {
    functions: {
      reviewSurvey: {
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

    prCore.functions.reviewSurvey.loader = mockLoader

    const mockParams = {
      questionnaireId: 'test-questionnaire-id',
      surveyUnitId: 'test-survey-unit-id',
    }

    const mockLoaderArgs = {
      params: mockParams,
    } as unknown as LoaderFunctionArgs

    await reviewLoader(mockLoaderArgs)

    expect(mockLoader).toHaveBeenCalledWith({
      questionnaireId: mockParams.questionnaireId,
      surveyUnitId: mockParams.surveyUnitId,
    })
  })

  it('should throw an error if questionnaireId or surveyUnitId is undefined', async () => {
    await expect(
      reviewLoader({
        params: {
          questionnaireId: undefined,
          surveyUnitId: 'test-survey-unit-id',
        },
      } as unknown as LoaderFunctionArgs)
    ).rejects.toThrow('Wrong assertion encountered')

    await expect(
      reviewLoader({
        params: {
          questionnaireId: 'questionnaireId',
          surveyUnitId: undefined,
        },
      } as unknown as LoaderFunctionArgs)
    ).rejects.toThrow('Wrong assertion encountered')
  })
})
