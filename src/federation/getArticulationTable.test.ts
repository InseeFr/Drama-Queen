import { getArticulationState } from '@inseefr/lunatic'
import { waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { getArticulationTable } from './getArticulationTable'

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

describe('getArticulationTable', () => {
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

    const data = await getArticulationTable('interro1')

    await waitFor(() => {
      expect(data).not.toBeNull()
      expect(data?.headers).toEqual(['name', 'age'])

      // first item
      expect(data?.rows[0].cells).toEqual([
        { label: 'name', value: 'Alice' },
        { label: 'age', value: '30' },
      ])
      expect(data?.rows[0].url).toContain(
        '/queen/interrogations/interro1?page=1.1%231', // for the page, `#` is encoded into `%23`
      )
      expect(data?.rows[0].label).toBe('Continuer')

      // second item
      expect(data?.rows[1].cells).toEqual([
        { label: 'name', value: 'Patrick' },
        { label: 'age', value: '25' },
      ])
      expect(data?.rows[1].url).toContain(
        '/queen/interrogations/interro1?page=1.1%232', // for the page, `#` is encoded into `%23`
      )
      expect(data?.rows[1].label).toBe('Complété')
    })
  })

  it('returns null if questionnaire has no articulation', async () => {
    mockLoader.mockResolvedValue({
      interrogation: { id: 'interro1' },
      questionnaire: null,
    })

    const data = await getArticulationTable('interro1')

    await waitFor(() => {
      expect(data).toBeNull()
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

    const data = await getArticulationTable('interro1')

    await waitFor(() => {
      expect(data).not.toBeNull()
      expect(data?.rows).toHaveLength(3)
      expect(data?.rows.map((r) => r.label)).toEqual([
        'Commencer',
        'Continuer',
        'Complété',
      ])
    })
  })

  it('builds rows from leafStates cells if no interrogation.data', async () => {
    mockLoader.mockResolvedValue({
      interrogation: {
        stateData: {
          leafStates: [
            {
              state: 'NOT_INIT',
              cells: [
                { label: 'Prénom', value: 'Bob' },
                { label: 'Sexe', value: 'Homme' },
                { label: 'Age', value: '23 ans' },
              ],
            },
            {
              state: 'INIT',
              cells: [
                { label: 'Prénom', value: 'Lucas' },
                { label: 'Sexe', value: 'Homme' },
                { label: 'Age', value: '34 ans' },
              ],
            },
            {
              state: 'COMPLETED',
              cells: [
                { label: 'Prénom', value: 'Sofia' },
                { label: 'Sexe', value: 'Femme' },
                { label: 'Age', value: '26 ans' },
              ],
            },
          ],
        },
      },
      questionnaire: { articulation: { items: [] } },
    })

    const data = await getArticulationTable('interro1')

    await waitFor(() => {
      expect(data).not.toBeNull()
      expect(data?.rows).toHaveLength(3)
      expect(data?.rows.map((r) => r.label)).toEqual([
        'Commencer',
        'Continuer',
        'Complété',
      ])
      expect(data?.rows[0].cells).toEqual([
        { label: 'Prénom', value: 'Bob' },
        { label: 'Sexe', value: 'Homme' },
        { label: 'Age', value: '23 ans' },
      ])
    })
  })

  it('returns null if articulation items is empty', async () => {
    mockLoader.mockResolvedValue({
      interrogation: { id: 'interro1', data: { foo: 'bar' } },
      questionnaire: { id: 'q1', articulation: { items: [] } },
    })
    ;(getArticulationState as any).mockReturnValue({ items: [] })

    const data = await getArticulationTable('su4')

    await waitFor(() => {
      expect(data).toBeNull()
    })
  })
})
