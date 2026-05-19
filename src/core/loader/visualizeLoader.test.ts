import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { type VisualizeLoaderArgs, visualizeLoader } from './visualizeLoader'

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      userAuthentication: {
        loginIfNotLoggedIn: vi.fn(),
      },
      visualizeSurvey: {
        loader: vi.fn(),
      },
    },
  },
}))

describe('visualizeLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call collectSurvey.loader with the correct parameters', async () => {
    const mockLoader = vi.fn()
    ;(await prCore).functions.visualizeSurvey.loader = mockLoader

    const mockParams: VisualizeLoaderArgs = {
      location: {
        publicHref: '/url',
      },
    }

    await visualizeLoader(mockParams)

    expect(mockLoader).toHaveBeenCalledWith({
      requestUrl: 'http://localhost:3000/url',
    })
  })

  it('should call loginIfNotLoggedIn before loading the survey', async () => {
    const mockLoginIfNotLoggedIn = vi.fn()
    ;(await prCore).functions.userAuthentication.loginIfNotLoggedIn =
      mockLoginIfNotLoggedIn

    await visualizeLoader({ location: { publicHref: '/url' } })

    expect(mockLoginIfNotLoggedIn).toHaveBeenCalled()
  })
})
