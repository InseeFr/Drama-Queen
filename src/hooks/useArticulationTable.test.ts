import { getArticulationState } from '@inseefr/lunatic'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import React from 'react'

import { prCore } from '@/createCore'

import { useArticulationTable } from './useArticulationTable'

vi.mock('@/createCore', () => {
  return {
    prCore: Promise.resolve({
      functions: {
        collectSurvey: {
          loader: vi.fn(),
        },
      },
    }),
  }
})

vi.mock('@inseefr/lunatic', () => ({
  getArticulationState: vi.fn(),
}))

const mockLoader = vi.fn()

describe('useArticulationTable', () => {
  beforeEach(async () => {
    const core = await prCore
    core.functions.collectSurvey.loader = mockLoader

    vi.clearAllMocks()
  })

  it('builds rows from articulation items if available', async () => {
    mockLoader.mockResolvedValue({
      interrogation: { id: 'interro1', data: { foo: 'bar' } },
      questionnaire: { id: 'q1', articulation: { items: [] } },
    })
    ;(getArticulationState as any).mockReturnValue({
      items: [
        {
          cells: [
            {
              label: 'name',
              value: 'Alice',
            },
            {
              label: 'age',
              value: '30',
            },
          ],
          page: '1.1#1',
          progress: 0,
        },
        {
          cells: [
            {
              label: 'name',
              value: 'Patrick',
            },
            {
              label: 'age',
              value: '25',
            },
          ],
          page: '1.1#2',
          progress: 1,
        },
      ],
    })

    const { result } = renderHook(() => useArticulationTable(React, 'interro1'))

    await waitFor(() => {
      expect(result.current).not.toBeNull()
      expect(result.current?.headers).toEqual(['name', 'age'])

      // first item
      expect(result.current?.rows[0].cells).toEqual([
        { label: 'name', value: 'Alice' },
        { label: 'age', value: '30' },
      ])
      expect(result.current?.rows[0].url).toContain(
        '/queen/interrogations/interro1?page=1.1%231', // for the page, `#` is encoded into `%23`
      )
      expect(result.current?.rows[0].label).toBe('Continuer')

      // second item
      expect(result.current?.rows[1].cells).toEqual([
        { label: 'name', value: 'Patrick' },
        { label: 'age', value: '25' },
      ])
      expect(result.current?.rows[1].url).toContain(
        '/queen/interrogations/interro1?page=1.1%232', // for the page, `#` is encoded into `%23`
      )
      expect(result.current?.rows[1].label).toBe('Complété')
    })
  })

  it('returns null if questionnaire has no articulation', async () => {
    mockLoader.mockResolvedValue({
      interrogation: { id: 'interro1' },
      questionnaire: null,
    })

    const { result } = renderHook(() => useArticulationTable(React, 'interro1'))

    await waitFor(() => {
      expect(result.current).toBeNull()
    })
  })

  it('builds rows from leafStates if no interrogation.data', async () => {
    mockLoader.mockResolvedValue({
      interrogation: {
        stateData: {
          leafStates: [
            { state: 'NOT_INIT' },
            { state: 'INIT' },
            { state: 'COMPLETED' },
          ],
        },
      },
      questionnaire: { articulation: { items: [] } },
    })

    const { result } = renderHook(() => useArticulationTable(React, 'interro1'))

    await waitFor(() => {
      expect(result.current).not.toBeNull()
      expect(result.current?.rows).toHaveLength(3)
      expect(result.current?.rows.map((r) => r.label)).toEqual([
        'Commencer',
        'Continuer',
        'Complété',
      ])
    })
  })

  it('returns null if articulation items is empty', async () => {
    mockLoader.mockResolvedValue({
      interrogation: { id: 'interro1', data: { foo: 'bar' } },
      questionnaire: { id: 'q1', articulation: { items: [] } },
    })
    ;(getArticulationState as any).mockReturnValue({ items: [] })

    const { result } = renderHook(() => useArticulationTable(React, 'su4'))

    await waitFor(() => {
      expect(result.current).toBeNull()
    })
  })
})
