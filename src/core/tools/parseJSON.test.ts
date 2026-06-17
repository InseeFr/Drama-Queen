import { describe, expect, it } from 'vitest'

import { parseJSON } from './parseJSON'

describe('parseJSON', () => {
  it('parses a valid JSON string', () => {
    const result = parseJSON('{"key":"value"}', null)
    expect(result).toEqual({ key: 'value' })
  })

  it('returns null for empty string', () => {
    const result = parseJSON('', null)
    expect(result).toBeNull()
  })

  it('returns null for invalid JSON', () => {
    const result = parseJSON('not-json', null)
    expect(result).toBeNull()
  })

  it('parses a URI-encoded JSON string', () => {
    const encoded = encodeURIComponent('{"key":"value"}')
    const result = parseJSON<Record<string, string> | undefined>(
      encoded,
      undefined,
    )
    expect(result).toEqual({ key: 'value' })
  })

  it('returns fallback when both JSON.parse and decodeURIComponent fail', () => {
    const result = parseJSON('{invalid-input}', 'fallback')
    expect(result).toBe('fallback')
  })
})
