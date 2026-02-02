import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { type CollectLoaderArgs, collectLoader } from './collectLoader'

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      collectSurvey: {
        loader: vi.fn(),
      },
    },
  },
}))

//TODO : replace any
export async function collectLoaderAdapter(args: any) {
  const url = new URL(args.request.url)
  const page = url.searchParams.get('page') || undefined

  return collectLoader({
    interrogationId: args.params.interrogationId,
    page,
  })
}

describe('collectLoader', () => {
  const mockParams: CollectLoaderArgs = {
    interrogationId: 'test-survey-unit-id',
    page: '12.3#5',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call collectSurvey.loader with the correct parameters', async () => {
    const mockLoader = vi.fn()

    ;(await prCore).functions.collectSurvey.loader = mockLoader

    await collectLoader(mockParams)

    expect(mockLoader).toHaveBeenCalledWith({
      interrogationId: mockParams.interrogationId,
    })
  })

  it('should throw an exception if interrogationId is undefined', async () => {
    await expect(
      collectLoader({
        page: '12.3#5',
      } as unknown as CollectLoaderArgs),
    ).rejects.toThrow()
  })

  it('should return page when a valid page param is provided', async () => {
    const mockLoader = vi.fn().mockResolvedValue({ some: 'data' })
    ;(await prCore).functions.collectSurvey.loader = mockLoader

    const mockRequest = new Request(
      'http://localhost/collect/test-survey-unit-id?page=12.3%235',
    )

    const result = await collectLoaderAdapter({
      params: { interrogationId: 'test-survey-unit-id' },
      request: mockRequest,
    })

    expect(result.page).toBe('12.3#5')
  })

  it('should not set page when page param is invalid', async () => {
    const mockLoader = vi.fn().mockResolvedValue({ some: 'data' })
    ;(await prCore).functions.collectSurvey.loader = mockLoader

    const mockParams = {
      interrogationId: 'suid',
    }

    // page is not a valid PageTag
    const mockRequest = new Request(
      `http://localhost/collect?suid=${mockParams.interrogationId}&page=15.15`,
    )

    const result = await collectLoaderAdapter({
      params: { interrogationId: 'test-survey-unit-id' },
      request: mockRequest,
    })

    expect(result.page).toBeUndefined()
  })
})
