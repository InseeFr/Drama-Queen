import type { Thunks } from 'core/bootstrap'
import type {
  Nomenclature,
  Questionnaire,
  SurveyUnit,
  WrappedQuestionnaire,
} from 'core/model'
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

      // TEMP : for PE, we fetch source from Queen-api which provides wrapped object : {value: source}
      // We must accept it and unwrap it
      const fetchedSource = await fetchUrl<
        Questionnaire | WrappedQuestionnaire
      >({
        url: questionnaire,
      })

      if (fetchedSource === undefined) {
        return null
      }

      const isWrappedQuestionnaire = (
        source: Questionnaire | WrappedQuestionnaire
      ): source is WrappedQuestionnaire => {
        return (
          typeof source === 'object' &&
          Object.keys(source).length === 1 &&
          'value' in source
        )
      }

      const source = isWrappedQuestionnaire(fetchedSource)
        ? fetchedSource.value
        : fetchedSource

      const isQueenV2 = isSurveyCompatibleWithQueenV2({
        questionnaire: source,
      })

      if (!isQueenV2) {
        return { isQueenV2 }
      }

      const surveyUnit = data
        ? await fetchUrl<SurveyUnit>({
            url: data,
          })
        : undefined

      const getReferentiel = nomenclature
        ? (name: string) => fetchUrl<Nomenclature>({ url: nomenclature[name] })
        : undefined

      return { isQueenV2, source, surveyUnit, readonly, getReferentiel }
    },
} satisfies Thunks
