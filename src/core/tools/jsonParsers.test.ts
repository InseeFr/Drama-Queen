import { describe, expect, it } from 'vitest'

import { parseJSON, parseNomenclatureInput } from './jsonParsers'

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

describe('parseNomenclatureInput', () => {
  it('returns null for empty input', () => {
    expect(parseNomenclatureInput('')).toBeNull()
  })

  it('parses a valid JSON object', () => {
    const result = parseNomenclatureInput('{"key":"value"}')
    expect(result).toEqual({ key: 'value' })
  })

  it('parses an array of objects', () => {
    const result = parseNomenclatureInput('[{"a":"1"},{"b":"2"}]')
    expect(result).toEqual({ a: '1', b: '2' })
  })

  it('parses an array of strings with colon separator', () => {
    const result = parseNomenclatureInput('["key:value"]')
    expect(result).toEqual({ key: 'value' })
  })

  it('parses an array of strings without colon', () => {
    const result = parseNomenclatureInput('["justkey"]')
    expect(result).toEqual({ justkey: 'justkey' })
  })

  it('trims key and value from colon-separated strings', () => {
    const result = parseNomenclatureInput('["  key :  value  "]')
    expect(result).toEqual({ key: 'value' })
  })

  it('merges mixed objects and strings in an array', () => {
    const result = parseNomenclatureInput('[{"pre":"set"},"extra:val"]')
    expect(result).toEqual({ pre: 'set', extra: 'val' })
  })

  it('skips non-object and non-string items in an array', () => {
    const result = parseNomenclatureInput('[42, true, null, {"a":"b"}]')
    expect(result).toEqual({ a: 'b' })
  })

  it('returns an empty object for an empty array', () => {
    const result = parseNomenclatureInput('[]')
    expect(result).toEqual({})
  })

  it('normalizes single quotes and brackets into valid JSON', () => {
    const result = parseNomenclatureInput("['key':'value']")
    expect(result).toEqual({ key: 'value' })
  })

  it('returns null when normalization produces invalid JSON', () => {
    const result = parseNomenclatureInput('{invalid}')
    expect(result).toBeNull()
  })

  it('returns null for completely invalid input', () => {
    const result = parseNomenclatureInput('not even close')
    expect(result).toBeNull()
  })

  it('handles URI-encoded valid JSON', () => {
    const encoded = encodeURIComponent('{"key":"value"}')
    const result = parseNomenclatureInput(encoded)
    expect(result).toEqual({ key: 'value' })
  })
})
