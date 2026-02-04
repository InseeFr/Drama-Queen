import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { reviewLoader } from './reviewLoader'

vi.mock('@/createCore', () => ({
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

    ;(await prCore).functions.reviewSurvey.loader = mockLoader

    const mockParams = {
      interrogationId: 'test-survey-unit-id',
    }

    const mockLoaderArgs = {
      params: mockParams,
    }

    await reviewLoader(mockLoaderArgs)

    expect(mockLoader).toHaveBeenCalledWith({
      interrogationId: mockParams.interrogationId,
    })
  })

  it('should throw an exception if interrogationId is undefined', async () => {
    await expect(
      reviewLoader({
        params: {},
      }),
    ).rejects.toThrow()
  })
})
