import { AxiosError } from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'

import { thunks } from './thunks'

vi.mock('@/core/tools/SurveyModelBreaking', () => ({
  isSurveyCompatibleWithQueen: vi.fn(),
}))

const mockGet = vi.fn()
const mockContext = {
  visualizeClient: { get: mockGet },
}

describe('loader', () => {
  beforeEach(() => {
    // mock console.error to avoid useless logs during tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch and return interrogation correctly', async () => {
    const requestUrl =
      'http://example.com?questionnaire=my-questionnaire&data=my-interrogation'
    const questionnaire = { id: 'Q001' }
    const interrogation = { id: 'INTERRO001' }

    mockGet.mockImplementation(async (url: string) => {
      // since get is called for both questionnaire and interrogation, needs to mock both results
      if (url.includes('interrogation')) return interrogation
      return questionnaire
    })
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({ requestUrl })(
      undefined as any,
      undefined as any,
      mockContext as any,
    )
    expect(result?.interrogation).toEqual(interrogation)
  })

  it('should handle a wrapped questionnaire', async () => {
    const requestUrl = 'http://example.com?questionnaire=my-questionnaire'
    const wrappedQuestionnaire = { value: { id: 'Q001' } }
    mockGet.mockResolvedValue(wrappedQuestionnaire)
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({ requestUrl })(
      undefined as any,
      undefined as any,
      mockContext as any,
    )
    expect(result?.source).toEqual({ id: 'Q001' })
  })

  it('should return getReferentiel function when nomenclature is available', async () => {
    const requestUrl =
      'https://example.com?questionnaire=my-questionnaire&nomenclature={"countries"%3A"https%3A%2F%2Fnomenclature.com%2Fcountries"%2C"cities"%3A"https%3A%2F%2Fnomenclature.com%2Fcities"}'
    const questionnaire = { id: 'Q001' }
    const interrogation = { id: 'INTERRO001' }
    const nomenclatureParam = {
      countries: 'https://nomenclature.com/countries',
      cities: 'https://nomenclature.com/cities',
    }

    mockGet.mockImplementation(async (url: string) => {
      // needs to mock result for interrogation & questionnaire to avoid the early fetch errors
      if (url.includes('interrogation')) return interrogation
      if (url.includes('questionnaire')) return questionnaire
      return url
    })

    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({ requestUrl })(
      undefined as any,
      undefined as any,
      mockContext as any,
    )

    await result?.getReferentiel!('countries')
    expect(mockGet).toHaveBeenCalledWith(nomenclatureParam.countries)

    await result?.getReferentiel!('cities')
    expect(mockGet).toHaveBeenCalledWith(nomenclatureParam.cities)
  })

  it('should return null if questionnaire is missing', async () => {
    const result = await thunks.loader({ requestUrl: 'https://example.com' })(
      undefined as any,
      undefined as any,
      mockContext as any,
    )
    expect(result).toBeNull()
  })

  it('should throw an error if fetchUrl fails with an AxiosError', async () => {
    const requestUrl = 'http://example.com?questionnaire=my-questionnaire'

    const axiosError = new AxiosError('Request failed')
    axiosError.response = { status: 404 } as any

    mockGet.mockRejectedValue(axiosError)

    await expect(
      thunks.loader({ requestUrl })(
        undefined as any,
        undefined as any,
        mockContext as any,
      ),
    ).rejects.toThrow('Unable to retrieve questionnaire .')
  })

  it('should throw an error if the questionnaire is not compatible', async () => {
    const requestUrl = 'http://example.com?questionnaire=my-questionnaire'
    mockGet.mockResolvedValue({ id: 'Q001' })
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(false)

    await expect(
      thunks.loader({ requestUrl })(
        undefined as any,
        undefined as any,
        mockContext as any,
      ),
    ).rejects.toThrow(
      "The questionnaire is not compatible. The 'lunaticModelVersion' must be higher than 2.2.10",
    )
  })
})
