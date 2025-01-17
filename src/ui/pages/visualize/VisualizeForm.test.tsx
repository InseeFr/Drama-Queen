import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { VisualizeForm } from './VisualizeForm'
import { getSearchParams } from './getSearchParams'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(() => [
    new URLSearchParams(), // the first value is the URLSearchParams instance
    vi.fn(), // the second value is the setter function (setSearchParams)
  ]),
}))

vi.mock('./getSearchParams', () => ({
  getSearchParams: vi.fn(),
}))

describe('VisualizeForm Component', () => {
  it('renders form fields correctly', () => {
    render(<VisualizeForm />)

    expect(screen.getByLabelText('inputSurveyLabel')).toBeInTheDocument()
    expect(screen.getByLabelText('inputDataLabel')).toBeInTheDocument()
    expect(screen.getByLabelText('inputNomenclatureLabel')).toBeInTheDocument()
    expect(screen.getByLabelText('readonlyLabel')).toBeInTheDocument()
    expect(screen.getByText('visualizeButtonLabel')).toBeInTheDocument()
  })

  it('submits form with correct parameters', async () => {
    const mockSetSearchParams = vi.fn()
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ])

    // mock the getSearchParams(data) value
    const mockParams = {
      questionnaire: 'mockSurvey',
      data: 'mockData',
      nomenclature: '{}',
    }
    vi.mocked(getSearchParams).mockReturnValue(mockParams)

    const { getByLabelText, getByRole } = render(<VisualizeForm />)

    // Fill out the form
    fireEvent.change(getByLabelText('inputSurveyLabel'), {
      target: { value: 'my-survey' },
    })
    fireEvent.change(getByLabelText('inputDataLabel'), {
      target: { value: 'my-data' },
    })
    fireEvent.change(getByLabelText('inputNomenclatureLabel'), {
      target: { value: '{}' },
    })
    const submitButton = getByRole('button', { name: 'visualizeButtonLabel' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(getSearchParams).toHaveBeenCalledWith({
        questionnaire: 'my-survey',
        data: 'my-data',
        nomenclature: {},
        readonly: false,
      })
      expect(mockSetSearchParams).toHaveBeenCalledWith(mockParams)
    })
  })

  it('handles readonly switch', async () => {
    const mockSetSearchParams = vi.fn()
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ])

    const { getByRole } = render(<VisualizeForm />)

    fireEvent.click(getByRole('checkbox'), { name: 'readonlyLabel' })

    fireEvent.click(
      screen.getByRole('button', { name: 'visualizeButtonLabel' }),
    )

    // Ensure the readonly value is sent as true when the switch is toggled
    await waitFor(() => {
      expect(getSearchParams).toHaveBeenCalledWith({
        questionnaire: '',
        data: '',
        nomenclature: null,
        readonly: true,
      })
    })
  })
})
