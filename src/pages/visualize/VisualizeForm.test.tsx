import { useNavigate } from '@tanstack/react-router'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithTheme } from '@/tests/render'

import { VisualizeForm } from './VisualizeForm'
import { getSearchParams } from './getSearchParams'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
}))

vi.mock('./getSearchParams', () => ({
  getSearchParams: vi.fn(),
}))

describe('VisualizeForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('renders form fields correctly', () => {
    vi.mocked(useNavigate).mockReturnValue(vi.fn())

    renderWithTheme(<VisualizeForm />)

    expect(screen.getByLabelText('Questionnaire')).toBeInTheDocument()
    expect(screen.getByLabelText('Data')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Dictionary of nomenclatures'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Read-only')).toBeInTheDocument()
    expect(screen.getByText('Visualize')).toBeInTheDocument()
  })

  it('submits form with correct parameters', async () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    // mock the getSearchParams(data) value
    const mockParams = {
      questionnaire: 'mockSurvey',
      data: 'mockData',
      nomenclature: '{}',
    }
    vi.mocked(getSearchParams).mockReturnValue(mockParams)

    const { getByLabelText, getByRole } = renderWithTheme(<VisualizeForm />)

    // Fill out the form
    fireEvent.change(getByLabelText('Questionnaire'), {
      target: { value: 'my-survey' },
    })
    fireEvent.change(getByLabelText('Data'), {
      target: { value: 'my-data' },
    })
    fireEvent.change(getByLabelText('Dictionary of nomenclatures'), {
      target: { value: '{}' },
    })
    const submitButton = getByRole('button', { name: 'Visualize' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(getSearchParams).toHaveBeenCalledWith({
        questionnaire: 'my-survey',
        data: 'my-data',
        nomenclature: {},
        readonly: false,
      })
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/visualize',
        search: mockParams,
      })
    })
  })

  it('handles readonly switch', async () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    const mockParams = {
      questionnaire: '',
      data: '',
      nomenclature: '{}',
      readonly: 'true',
    }
    vi.mocked(getSearchParams).mockReturnValue(mockParams)

    const { getByRole } = renderWithTheme(<VisualizeForm />)

    fireEvent.click(getByRole('checkbox', { name: 'Read-only' }))

    fireEvent.click(screen.getByRole('button', { name: 'Visualize' }))

    // Ensure the readonly value is sent as true when the switch is toggled
    await waitFor(() => {
      expect(getSearchParams).toHaveBeenCalledWith({
        questionnaire: '',
        data: '',
        nomenclature: null,
        readonly: true,
      })
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/visualize',
        search: mockParams,
      })
    })
  })
})
