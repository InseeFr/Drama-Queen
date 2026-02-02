import { useNavigate } from '@tanstack/react-router'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import type { Interrogation } from '@/core/model'
import { Route as VisualizeRoute } from '@/routes/_layout/visualize/route'
import { downloadAsJson } from '@/utils/files'

import { Visualize } from './Visualize'
import { VisualizeForm } from './VisualizeForm'

vi.mock('@/routes/_layout/visualize/route', () => ({
  Route: {
    useLoaderData: vi.fn(),
  },
}))

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
  createFileRoute: vi.fn(() => vi.fn()),
}))

vi.mock('@/utils/files', () => ({
  downloadAsJson: vi.fn(),
}))

vi.mock('@/components/orchestrator/Orchestrator', () => ({
  Orchestrator: vi.fn(),
}))

vi.mock('./VisualizeForm', () => ({
  VisualizeForm: vi.fn(),
}))

describe('Visualize Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders Orchestrator when loaderData is available', async () => {
    const mockLoaderData = {
      source: 'mockSource',
      interrogation: { id: 'mockInterrogation' },
      readonly: true,
      getReferentiel: vi.fn(),
    }

    vi.mocked(VisualizeRoute.useLoaderData).mockReturnValue(mockLoaderData)

    render(<Visualize />)

    expect(Orchestrator).toHaveBeenCalledWith(
      expect.objectContaining({
        source: mockLoaderData.source,
        interrogation: mockLoaderData.interrogation,
        readonly: mockLoaderData.readonly,
        onQuit: expect.any(Function),
        onDefinitiveQuit: expect.any(Function),
        onChangePage: undefined,
        getReferentiel: mockLoaderData.getReferentiel,
      }),
      {},
    )
  })

  it('renders VisualizeForm when loaderData is null', async () => {
    vi.mocked(VisualizeRoute.useLoaderData).mockReturnValue(null as any)

    render(<Visualize />)

    expect(VisualizeForm).toHaveBeenCalled()
  })

  it('calls onQuit with interrogation and navigates to /visualize', async () => {
    const mockLoaderData = {
      source: 'mockSource',
      interrogation: { id: 'mockInterrogation' },
      readonly: true,
      getReferentiel: vi.fn(),
    }

    vi.mocked(VisualizeRoute.useLoaderData).mockReturnValue(mockLoaderData)

    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(<Visualize />)

    // Simulate Orchestrator's onQuit call
    const { onQuit } = vi.mocked(Orchestrator).mock.calls[0][0]

    if (onQuit) {
      onQuit(mockLoaderData.interrogation as Interrogation)
    }

    expect(downloadAsJson).toHaveBeenCalledWith({
      data: mockLoaderData.interrogation,
    })
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/visualize' })
  })
})
