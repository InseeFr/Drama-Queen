import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getQueenVersion } from './getQueenVersion'

describe('getQueenVersion', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it('returns the app version from environment variables', () => {
    // Mock the import.meta.env.APP_VERSION
    vi.stubEnv('APP_VERSION', '3.0.0')

    const version = getQueenVersion()

    expect(version).toBe('3.0.0')
  })
})
