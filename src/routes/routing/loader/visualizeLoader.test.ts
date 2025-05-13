import type { LoaderFunctionArgs } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { visualizeLoader } from './visualizeLoader'

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
    ;(await prCore).functions.visualizeSurvey.loader = mockLoader

    await visualizeLoader({ request: { url: 'url' } } as LoaderFunctionArgs)

    expect(mockLoader).toHaveBeenCalledWith({
      requestUrl: 'url',
    })
  })
})
