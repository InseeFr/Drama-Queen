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

    ;(await prCore).functions.collectSurvey.loader = mockLoader

    const mockParams = {
      surveyUnitId: 'test-survey-unit-id',
    }

    const mockLoaderArgs = {
      params: mockParams,
    } as unknown as LoaderFunctionArgs

    await collectLoader(mockLoaderArgs)

    expect(mockLoader).toHaveBeenCalledWith({
      surveyUnitId: mockParams.surveyUnitId,
    })
  })

  it('should throw an exception if surveyUnitId is undefined', async () => {
    await expect(
      collectLoader({
        params: {},
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')
  })
})
