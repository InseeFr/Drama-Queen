import { visualizeLoader } from '@/routes/routing/loader';
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { visualizeLoader, type VisualizeLoaderArgs } from './visualizeLoader'

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      visualizeSurvey: {
        loader: vi.fn(),
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
      ; (await prCore).functions.visualizeSurvey.loader = mockLoader

    const mockParams: VisualizeLoaderArgs = {
      location: {
        href: '/url',
      },
    }

    await visualizeLoader(mockParams)

    expect(mockLoader).toHaveBeenCalledWith({
      "requestUrl": "http://localhost:3000/url",
    })
  })
})
