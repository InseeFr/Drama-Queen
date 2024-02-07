import type { Thunks } from 'core/bootstrap'
import { makeSearchParamsObjSchema } from './utils/makeSearchParamsObjectSchema'
import { z } from 'zod'
import {
  fetchUrl,
  isSurveyQueenV2Compatible,
} from './utils/SurveyModelBreaking'
import type { Questionnaire, SurveyUnit } from 'core/model'

export const name = 'surveyMapping'

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

      const { questionnaire, data, readonly = false } = result.data

      if (!questionnaire) {
        return null
      }

      const source = await fetchUrl<Questionnaire>({
        url: decodeURIComponent(questionnaire),
      })

      if (source === undefined) {
        return null
      }

      const isQueenV2 = isSurveyQueenV2Compatible({ questionnaire: source })

      if (!isQueenV2) {
        return { isQueenV2 }
      }

      const surveyUnit = await fetchUrl<SurveyUnit>({
        url: decodeURIComponent(data || ''),
      })

      return { isQueenV2, source, surveyUnit, readonly }
    },
  retrieveQuestionnaireId:
    (params: { surveyUnitId: string }) =>
    (...args) => {
      const [, , { dataStore }] = args
      const { surveyUnitId } = params
      //TODO -> reject if undefined and handle error higher
      return dataStore
        .getSurveyUnit(surveyUnitId)
        .then((surveyUnit) => surveyUnit?.questionnaireId ?? null)
    },
  collectLoader:
    (params: { questionnaireId: string; surveyUnitId: string }) =>
    (...args) => {
      const [, , { queenApi, dataStore }] = args
      const { questionnaireId, surveyUnitId } = params
      const surveyUnitPromise = dataStore.getSurveyUnit(surveyUnitId)
      const questionnairePromise = queenApi
        .getQuestionnaire(questionnaireId)
        .then((questionnaire) => {
          const isQueenV2 = isSurveyQueenV2Compatible({ questionnaire })
          return { questionnaire, isQueenV2 }
        })
      return Promise.all([surveyUnitPromise, questionnairePromise]).then(
        ([surveyUnit, { questionnaire, isQueenV2 }]) => {
          return { surveyUnit, questionnaire, isQueenV2 }
        }
      )
    },
} satisfies Thunks

const searchParamsSchema = z.object({
  questionnaire: z.string().optional(),
  data: z.string().optional(),
  nomenclature: z.record(z.string()).optional(),
  readonly: z.boolean().optional(),
})
