import { describe, expect, it } from 'vitest'

import { chunk } from './array'

describe('chunk function', () => {
  it('splits an array into chunks of the specified size', () => {
    const array = [1, 2, 3, 4, 5]
    const result = chunk(array, 2)
    expect(result).toEqual([[1, 2], [3, 4], [5]])
  })

  it('returns an empty array if input array is empty', () => {
    const result = chunk([], 3)
    expect(result).toEqual([])
  })

  it('throws an error if chunkSize is not strictly positive', () => {
    const array = [1, 2, 3]
    expect(() => chunk(array, 0)).toThrow(
      'chunkSize must be a strictly positive integer',
    )
    expect(() => chunk(array, -2)).toThrow(
      'chunkSize must be a strictly positive integer',
    )
    expect(() => chunk(array, 0.5)).toThrow(
      'chunkSize must be a strictly positive integer',
    )
  })

  it('handles chunkSize larger than the array length', () => {
    const array = [1, 2, 3]
    const result = chunk(array, 10)
    expect(result).toEqual([[1, 2, 3]])
  })

  it('works with arrays of objects', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = chunk(array, 2)
    expect(result).toEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }]])
  })

  it('works with mixed-type arrays', () => {
    const array = [1, 'a', true, null]
    const result = chunk(array, 2)
    expect(result).toEqual([
      [1, 'a'],
      [true, null],
    ])
  })
})
