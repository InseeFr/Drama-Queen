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

  it('should return page when a valid page param is provided', async () => {
    const mockLoader = vi.fn().mockResolvedValue({ some: 'data' })
    ;(await prCore).functions.collectSurvey.loader = mockLoader

    const mockParams = {
      questionnaireId: 'test-questionnaire-id',
      surveyUnitId: 'test-survey-unit-id',
    }

    // encode the `#` for page as `%23` in url
    const mockRequest = new Request(
      `http://localhost/collect?qid=${mockParams.questionnaireId}&suid=${mockParams.surveyUnitId}&page=12.3%235`,
    )

    const result = await collectLoader({
      params: mockParams,
      request: mockRequest,
    } as unknown as LoaderFunctionArgs)

    expect(result.page).toBe('12.3#5')
  })

  it('should not set page when page param is invalid', async () => {
    const mockLoader = vi.fn().mockResolvedValue({ some: 'data' })
    ;(await prCore).functions.collectSurvey.loader = mockLoader

    const mockParams = {
      questionnaireId: 'qid',
      surveyUnitId: 'suid',
    }

    // page is not a valid PageTag
    const mockRequest = new Request(
      `http://localhost/collect?qid=${mockParams.questionnaireId}&suid=${mockParams.surveyUnitId}&page=15.15`,
    )

    const result = await collectLoader({
      params: mockParams,
      request: mockRequest,
    } as unknown as LoaderFunctionArgs)

    expect(result.page).toBeUndefined()
  })
})
