import type { LunaticComponentProps } from '@inseefr/lunatic/components/type'
import { describe, expect, it, vi } from 'vitest'

import { shouldAutoNext } from './useAutoNext'

describe('Should auto next', () => {
  it('returns false with non-radio and non-checkbox components', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Text',
        id: 'a',
        value: 'v',
        handleChanges: vi.fn(),
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a', value: 'v2' }]
    expect(shouldAutoNext(components, valueChange)).toBeFalsy()
  })
  it('returns true with radio components', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Radio',
        id: 'a',
        value: '',
        options: [],
        handleChanges: vi.fn(),
        response: { name: 'a' },
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a', value: 'v2' }]
    expect(shouldAutoNext(components, valueChange)).toBeTruthy()
  })
  it('returns true with missing value', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Radio',
        id: 'a',
        value: '',
        options: [],
        handleChanges: vi.fn(),
        response: { name: 'a' },
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a_MISSING', value: 'DK' }]
    expect(shouldAutoNext(components, valueChange)).toBeTruthy()
  })
  it('returns true with a radio in a question component', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Question',
        id: 'q',
        components: [
          {
            componentType: 'Radio',
            id: 'a',
            value: '',
            options: [],
            handleChanges: vi.fn(),
            response: { name: 'a' },
            missingResponse: { name: 'a_MISSING' },
          },
        ],
        value: {},
      },
    ]
    const valueChange = [{ name: 'a', value: 'v2' }]
    expect(shouldAutoNext(components, valueChange)).toBeTruthy()
  })
})
