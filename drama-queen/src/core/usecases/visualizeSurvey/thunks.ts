import type { Thunks } from 'core/bootstrap'
import type { Questionnaire, SurveyUnit } from 'core/model'
import { searchParamsSchema } from './parser/searchParamsSchema'
import { makeSearchParamsObjSchema } from 'core/tools/makeSearchParamsObjectSchema'
import { fetchUrl } from 'core/tools/fetchUrl'
import { isSurveyCompatibleWithQueenV2 } from 'core/tools/SurveyModelBreaking'

export const name = 'visualizeSurvey'

export const reducer = null

export const thunks = {
  loader:
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

      const {
        questionnaire,
        data,
        readonly = false,
        nomenclature,
      } = result.data

      if (!questionnaire) {
        return null
      }

      const source = await fetchUrl<Questionnaire>({
        url: questionnaire,
      })

      if (source === undefined) {
        return null
      }

      const isQueenV2 = isSurveyCompatibleWithQueenV2({ questionnaire: source })

      if (!isQueenV2) {
        return { isQueenV2 }
      }

      const surveyUnit = data
        ? await fetchUrl<SurveyUnit>({
            url: data,
          })
        : undefined

      const getReferentiel = nomenclature
        ? (name: string) => fetchUrl<unknown[]>({ url: nomenclature[name] })
        : undefined

      return { isQueenV2, source, surveyUnit, readonly, getReferentiel }
    },
} satisfies Thunks
