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
import { isSurveyCompatibleWithQueen } from 'core/tools/SurveyModelBreaking'
import { getTranslation } from 'i18n'
import { AxiosError } from 'axios'

const { t } = getTranslation('errorMessage')

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
      }).catch((error) => {
        if (
          error instanceof AxiosError &&
          error.response &&
          [400, 403, 404, 500].includes(error.response.status)
        ) {
          throw new Error(t('questionnaireNotFound', { questionnaireId: '' }))
        }
        throw error
      })

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

      const isQuestionnaireCompatible = isSurveyCompatibleWithQueen({
        questionnaire: source,
      })

      if (!isQuestionnaireCompatible) {
        throw new Error(t('questionnaireNotCompatible'))
      }

      const surveyUnit = data
        ? await fetchUrl<SurveyUnit>({
            url: data,
          })
        : undefined

      const getReferentiel = nomenclature
        ? (name: string) => fetchUrl<Nomenclature>({ url: nomenclature[name] })
        : undefined

      return { source, surveyUnit, readonly, getReferentiel }
    },
} satisfies Thunks