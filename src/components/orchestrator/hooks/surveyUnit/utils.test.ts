import { describe, expect, it } from 'vitest'

import { computeUpdatedData, hasDataChanged } from './utils'

it('hasDataChanged checks if a new value has been inputted', () => {
  expect(
    hasDataChanged({ COLLECTED: { Q1: { COLLECTED: 'new value' } } }),
  ).toBeTruthy()

  expect(hasDataChanged({})).toBeFalsy()
  expect(hasDataChanged({ COLLECTED: {} })).toBeFalsy()
})

describe('computeUpdatedData', () => {
  it('merges survey data with new data', () => {
    expect(
      computeUpdatedData(
        {
          COLLECTED: {
            Q1: { COLLECTED: 'q1 value' },
          },
        },
        { COLLECTED: { Q2: { COLLECTED: 'new value' } } },
      ),
    ).toStrictEqual({
      CALCULATED: {},
      COLLECTED: {
        Q1: { COLLECTED: 'q1 value' },
        Q2: { COLLECTED: 'new value' },
      },
      EXTERNAL: {},
    })
  })

  it('overrides survey data with new data', () => {
    expect(
      computeUpdatedData(
        {
          COLLECTED: {
            Q1: { COLLECTED: 'q1 value' },
            Q2: { COLLECTED: 'q2 value' },
          },
        },
        { COLLECTED: { Q2: { COLLECTED: 'new value' } } },
      ),
    ).toStrictEqual({
      CALCULATED: {},
      COLLECTED: {
        Q1: { COLLECTED: 'q1 value' },
        Q2: { COLLECTED: 'new value' },
      },
      EXTERNAL: {},
    })
  })

  it('changes nothing when there is no new data', () => {
    expect(
      computeUpdatedData(
        {
          COLLECTED: {
            Q1: { COLLECTED: 'q1 value' },
            Q2: { COLLECTED: 'q2 value' },
          },
        },
        { COLLECTED: {} },
      ),
    ).toStrictEqual({
      COLLECTED: {
        Q1: { COLLECTED: 'q1 value' },
        Q2: { COLLECTED: 'q2 value' },
      },
    })
  })

  it('cleans null data', () => {
    expect(
      computeUpdatedData(
        {
          COLLECTED: {
            Q1: { COLLECTED: 'q1 value' },
            Q2: { COLLECTED: 'q2 value' },
          },
        },
        { COLLECTED: { Q2: { COLLECTED: null }, Q3: { COLLECTED: null } } },
      ),
    ).toStrictEqual({
      CALCULATED: {},
      COLLECTED: {
        Q1: { COLLECTED: 'q1 value' },
        Q2: {},
        Q3: {},
      },
      EXTERNAL: {},
    })
  })
})
