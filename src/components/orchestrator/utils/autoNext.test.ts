import type { LunaticComponentProps } from '@inseefr/lunatic/components/type'
import { describe, expect, it, vi } from 'vitest'

import { shouldAutoNext, shouldSkipQuestion } from './autoNext'

describe('Is question skipped', () => {
  it("returns true in the case of a don't know / refusal", () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Text',
        id: 'a',
        value: 'v',
        handleChanges: vi.fn(),
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a_MISSING', value: 'DK' }]
    expect(shouldSkipQuestion(components, valueChange)).toBeTruthy()
  })

  it('returns false with response to components', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Radio',
        id: 'a',
        value: '',
        options: [
          { value: 'v1', label: 'my value' },
          { value: 'v2', label: 'my other value' },
        ],
        handleChanges: vi.fn(),
        response: { name: 'a' },
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a', value: 'v2' }]
    expect(shouldSkipQuestion(components, valueChange)).toBeFalsy()
  })
})

describe('Should auto next', () => {
  it('returns true with radio components', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Radio',
        id: 'a',
        value: '',
        options: [
          { value: 'v1', label: 'my value' },
          { value: 'v2', label: 'my other value' },
        ],
        handleChanges: vi.fn(),
        response: { name: 'a' },
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a', value: 'v2' }]
    expect(shouldAutoNext(components, valueChange)).toBeTruthy()
  })

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

  it("returns false in the case of a don't know / refusal", () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Radio',
        id: 'a',
        value: '',
        options: [
          { value: 'v1', label: 'my value' },
          { value: 'v2', label: 'my other value' },
        ],
        handleChanges: vi.fn(),
        response: { name: 'a' },
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a_MISSING', value: 'DK' }]
    expect(shouldAutoNext(components, valueChange)).toBeFalsy()
  })

  it('returns false when selected option ask for clarification', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Radio',
        id: 'a',
        value: '',
        options: [
          { value: 'v1', label: 'my value' },
          { value: 'v2', label: 'my other value', detailLabel: 'Précisez :' },
        ],
        handleChanges: vi.fn(),
        response: { name: 'a' },
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a', value: 'v2' }]
    expect(shouldAutoNext(components, valueChange)).toBeFalsy()
  })

  it('returns false when user is answering clarification', () => {
    const components: LunaticComponentProps[] = [
      {
        componentType: 'Radio',
        id: 'a',
        value: '',
        options: [
          { value: 'v1', label: 'my value' },
          { value: 'v2', label: 'my other value', detailLabel: 'Précisez :' },
        ],
        handleChanges: vi.fn(),
        response: { name: 'a' },
        missingResponse: { name: 'a_MISSING' },
      },
    ]
    const valueChange = [{ name: 'a_cl', value: 'parce que...' }]
    expect(shouldAutoNext(components, valueChange)).toBeFalsy()
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
            options: [
              { value: 'v1', label: 'my value' },
              { value: 'v2', label: 'my other value' },
            ],
            handleChanges: vi.fn(),
            response: { name: 'a' },
            missingResponse: { name: 'a_MISSING' },
          },
        ],
        value: {},
      },
    ]
    const valueChange = [{ name: 'a', value: 'v1' }]
    expect(shouldAutoNext(components, valueChange)).toBeTruthy()
  })
})
