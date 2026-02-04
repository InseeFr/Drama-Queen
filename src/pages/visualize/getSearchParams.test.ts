import { describe, expect, it } from 'vitest'

import { getSearchParams } from './getSearchParams'
import type { FormValues } from './models'

describe('getSearchParams', () => {
  it('should return all fields when all fields are provided', () => {
    const input: FormValues = {
      questionnaire: 'my-survey',
      data: 'my-data',
      nomenclature: { key: 'value' },
      readonly: false,
    }

    const result = getSearchParams(input)

    expect(result).toEqual({
      questionnaire: 'my-survey',
      data: 'my-data',
      nomenclature: '{"key":"value"}',
      readonly: 'false',
    })
  })

  it('should exclude optional fields if they are undefined', () => {
    const input: FormValues = {
      questionnaire: 'my-survey',
      data: undefined,
      nomenclature: undefined,
      readonly: false,
    }

    const result = getSearchParams(input)

    expect(result).toEqual({
      questionnaire: 'my-survey',
      readonly: 'false',
    })
  })

  it('should exclude optional fields if they are empty strings', () => {
    const input: FormValues = {
      questionnaire: '',
      data: '',
      nomenclature: undefined,
      readonly: false,
    }

    const result = getSearchParams(input)

    expect(result).toEqual({
      readonly: 'false',
    })
  })

  it('should handle nomenclature objects correctly', () => {
    const input: FormValues = {
      questionnaire: 'my-survey',
      data: 'my-data',
      nomenclature: { key1: 'value1', key2: 'value2' },
      readonly: false,
    }

    const result = getSearchParams(input)

    expect(result).toEqual({
      questionnaire: 'my-survey',
      data: 'my-data',
      nomenclature: '{"key1":"value1","key2":"value2"}',
      readonly: 'false',
    })
  })

  it('should handle readonly values correctly', () => {
    const input: FormValues = {
      questionnaire: '',
      readonly: false,
    }

    const input2: FormValues = {
      questionnaire: '',
      readonly: true,
    }

    const result = getSearchParams(input)
    const result2 = getSearchParams(input2)

    expect(result).toEqual({
      readonly: 'false',
    })
    expect(result2).toEqual({
      readonly: 'true',
    })
  })
})
