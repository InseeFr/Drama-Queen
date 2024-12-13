import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { makeSearchParamsObjSchema } from './makeSearchParamsObjectSchema'

describe('makeSearchParamsObjSchema', () => {
  it('should correctly parse and validate valid URLSearchParams', () => {
    const schema = makeSearchParamsObjSchema(
      z.object({
        key1: z.string(),
        key2: z.number(),
        key3: z.boolean(),
      }),
    )

    const searchParams = new URLSearchParams()
    searchParams.append('key1', 'value1')
    searchParams.append('key2', '42')
    searchParams.append('key3', 'true')

    const result = schema.safeParse(searchParams)

    expect(result.success).toBe(true)
    expect(result.data).toEqual({
      key1: 'value1',
      key2: 42,
      key3: true,
    })
  })

  it('should handle arrays for repeated keys', () => {
    const schema = makeSearchParamsObjSchema(
      z.object({
        key1: z.string().array(),
        key2: z.string(),
      }),
    )

    const searchParams = new URLSearchParams()
    searchParams.append('key1', 'value1')
    searchParams.append('key1', 'value2')
    searchParams.append('key2', 'value3')

    const result = schema.safeParse(searchParams)

    expect(result.success).toBe(true)
    expect(result.data).toEqual({
      key1: ['value1', 'value2'],
      key2: 'value3',
    })
  })

  it('should fail validation when the data does not match the schema', () => {
    const schema = makeSearchParamsObjSchema(
      z.object({
        key1: z.string(),
        key2: z.number(),
      }),
    )

    const searchParams = new URLSearchParams()
    searchParams.append('key1', 'value1')
    searchParams.append('key2', 'notANumber')

    const result = schema.safeParse(searchParams)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should handle partial schemas', () => {
    const schema = makeSearchParamsObjSchema(
      z.object({
        key1: z.string(),
        key2: z.number().optional(),
      }),
    )

    const searchParams = new URLSearchParams()
    searchParams.append('key1', 'value1')

    const result = schema.safeParse(searchParams)

    expect(result.success).toBe(true)
    expect(result.data).toEqual({
      key1: 'value1',
    })
  })

  it('should handle empty URLSearchParams', () => {
    const schema = makeSearchParamsObjSchema(
      z.object({
        key1: z.string().optional(),
      }),
    )

    const searchParams = new URLSearchParams()

    const result = schema.safeParse(searchParams)

    expect(result.success).toBe(true)
    expect(result.data).toEqual({})
  })
})
