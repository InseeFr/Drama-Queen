import type { Thunks } from 'core/bootstrap'
import axios from 'axios'
import type { Questionnaire } from 'core/model'
import { makeSearchParamsObjSchema } from './utils/makeSearchParamsObjectSchema'
import { z } from 'zod'

export const name = 'visualizeSurvey'

export const reducer = null

export const thunks = {
  visualizeLoader:
    (params: { requestUrl: string }) =>
    async (...args) => {
      const { requestUrl } = params
      const url = new URL(requestUrl)
      const result = makeSearchParamsObjSchema(searchParamsSchema).safeParse(
        url.searchParams
      )

      if (!result.success) {
        console.error(result.error)
        return null
      }

      const { questionnaire } = result.data

      if (!questionnaire) {
        return null
      }

      const isQueenV2 = await isQueenV2Survey({
        questionnaireUrl: decodeURIComponent(questionnaire),
      })
      return { isQueenV2 }
    },
} satisfies Thunks

const searchParamsSchema = z.object({
  questionnaire: z.string().optional(),
  // We just need questionnaire, not needed to parse other fields
  // data: z.string().optional(),
  // nomenclature: z.record(z.string()).optional(),
  // readonly: z.boolean().optional(),
})

const lunaticModelVersionBreaking = '2.2.10'

const semverCompare = new Intl.Collator('en', { numeric: true }).compare

const isQueenV2Survey = async (params: { questionnaireUrl: string }) => {
  const { questionnaireUrl } = params
  try {
    const { lunaticModelVersion } = await axios
      .get<Questionnaire>(questionnaireUrl)
      .then(({ data }) => data)

    if (lunaticModelVersion === undefined) {
      console.info(
        'The survey has no lunaticModelVersion field, so by default we redirect to queen v2'
      )
      return true
    }

    return semverCompare(lunaticModelVersion, lunaticModelVersionBreaking) === 1
  } catch (error) {
    console.error(
      'An error occured, we could not retrieve the survey, we fallback to queen v2',
      error
    )
    return true
  }
}
