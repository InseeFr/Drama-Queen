import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { protectedRouteLoader } from './protectedLoader'

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      userAuthentication: {
        loginIfNotLoggedIn: vi.fn(),
      },
    },
  },
}))

describe('protectedRouteLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call collectSurvey.loader with the correct parameters', async () => {
    const mockLoader = vi.fn()
    ;(await prCore).functions.userAuthentication.loginIfNotLoggedIn = mockLoader

    await protectedRouteLoader()

    expect(mockLoader).toHaveBeenCalledWith()
  })
})
