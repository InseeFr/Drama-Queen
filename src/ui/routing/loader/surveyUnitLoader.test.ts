import type { LoaderFunctionArgs } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prCore } from '@/createCore'

import { surveyUnitLoader } from './surveyUnitLoader'

vi.mock('react-router-dom', () => ({
  redirect: vi.fn(),
}))

vi.mock('@/createCore', () => ({
  prCore: {
    functions: {
      collectSurvey: {
        retrieveQuestionnaireId: vi.fn(),
      },
    },
  },
}))

describe('collectLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return null if questionnaireId is undefined', async () => {
    const mockLoader = vi.fn().mockResolvedValueOnce(undefined)

    ;(await prCore).functions.collectSurvey.retrieveQuestionnaireId = mockLoader

    const result = await surveyUnitLoader({
      params: { surveyUnitId: 1 },
    } as unknown as LoaderFunctionArgs)

    expect(result).toBeNull()
  })

  it('should return an url if questionnaireId is defined', async () => {
    const mockLoader = vi.fn().mockResolvedValueOnce('questionnaireId')

    ;(await prCore).functions.collectSurvey.retrieveQuestionnaireId = mockLoader

    expect(redirect).toHaveBeenCalledWith(
      '/questionnaire/questionnaireId/survey-unit/1',
    )
  })

  it('should thrown an exception if the surveyUnitId is undefined', async () => {
    const mockLoader = vi.fn().mockResolvedValueOnce(undefined)

    ;(await prCore).functions.collectSurvey.retrieveQuestionnaireId = mockLoader

    await await expect(
      surveyUnitLoader({
        params: {},
      } as unknown as LoaderFunctionArgs),
    ).rejects.toThrow('Wrong assertion encountered')
  })
})
