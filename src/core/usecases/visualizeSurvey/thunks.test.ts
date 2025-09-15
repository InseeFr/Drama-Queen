import { AxiosError } from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { isSurveyCompatibleWithQueen } from '@/core/tools/SurveyModelBreaking'
import { fetchUrl } from '@/core/tools/fetchUrl'

import { thunks } from './thunks'

vi.mock('@/core/tools/fetchUrl', () => ({
  fetchUrl: vi.fn(),
}))

vi.mock('@/core/tools/SurveyModelBreaking', () => ({
  isSurveyCompatibleWithQueen: vi.fn(),
}))

vi.mock('@/i18n', () => ({
  getTranslation: () => ({
    t: (keyMessage: string, params?: Record<string, any>) => {
      if (!params) return keyMessage

      // Create a string by joining the values of params with space
      const paramsString = Object.values(params).join(' ')

      // Return the concatenated string: key + params string
      return `${keyMessage} ${paramsString}`
    },
  }),
}))

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

    vi.mocked(fetchUrl).mockImplementation(async ({ url }) => {
      // since fetchUrl is called for both questionnaire and interrogation, needs to mock both results
      if (url.includes('interrogation')) return interrogation
      return questionnaire
    })
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({
      requestUrl: requestUrl,
    })()
    expect(result?.interrogation).toEqual(interrogation)
  })

  it('should handle a wrapped questionnaire', async () => {
    const requestUrl = 'http://example.com?questionnaire=my-questionnaire'
    const wrappedQuestionnaire = { value: { id: 'Q001' } }
    vi.mocked(fetchUrl).mockResolvedValue(wrappedQuestionnaire)
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({
      requestUrl: requestUrl,
    })()
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

    vi.mocked(fetchUrl).mockImplementation(async ({ url }) => {
      // needs to mock result for interrogation & questionnaire to avoid the early fetch errors
      if (url.includes('interrogation')) return interrogation
      if (url.includes('questionnaire')) return questionnaire
      return url
    })

    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(true)

    const result = await thunks.loader({
      requestUrl: requestUrl,
    })()

    await result?.getReferentiel!('countries')
    expect(fetchUrl).toHaveBeenCalledWith({
      url: nomenclatureParam.countries,
    })

    await result?.getReferentiel!('cities')
    expect(fetchUrl).toHaveBeenCalledWith({
      url: nomenclatureParam.cities,
    })
  })

  it('should return null if questionnaire is missing', async () => {
    const result = await thunks.loader({ requestUrl: 'https://example.com' })()
    expect(result).toBeNull()
  })

  it('should throw an error if fetchUrl fails with an AxiosError', async () => {
    const requestUrl = 'http://example.com?questionnaire=my-questionnaire'

    const axiosError = new AxiosError('Request failed')
    axiosError.response = { status: 404 } as any

    vi.mocked(fetchUrl).mockRejectedValue(axiosError)

    await expect(thunks.loader({ requestUrl: requestUrl })()).rejects.toThrow(
      'questionnaireNotFound',
    )
  })

  it('should throw an error if the questionnaire is not compatible', async () => {
    const requestUrl = 'http://example.com?questionnaire=my-questionnaire'
    vi.mocked(fetchUrl).mockResolvedValue({ id: 'Q001' })
    vi.mocked(isSurveyCompatibleWithQueen).mockReturnValue(false)

    await expect(thunks.loader({ requestUrl: requestUrl })()).rejects.toThrow(
      'questionnaireNotCompatible',
    )
  })
})
