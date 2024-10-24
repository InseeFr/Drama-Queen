import axios, { AxiosError } from 'axios'
import type {
  Campaign,
  IdAndQuestionnaireId,
  Nomenclature,
  Questionnaire,
  RequiredNomenclatures,
  SurveyUnit,
} from 'core/model'
import type { QueenApi } from 'core/ports/QueenApi'
import { handleAxiosError } from 'core/tools/axiosError'
import {
  campaignSchema,
  idAndQuestionnaireIdSchema,
  nomenclatureSchema,
  requiredNomenclaturesSchema,
  surveyUnitSchema,
} from './parserSchema'

export function createApiClient(params: {
  apiUrl: string
  getAccessToken: () => Promise<string | undefined>
}): QueenApi {
  const { apiUrl, getAccessToken } = params

  const { axiosInstance } = (() => {
    const axiosInstance = axios.create({ baseURL: apiUrl })

    // Type issue https://github.com/axios/axios/issues/5494
    const onRequest = async (config: any) => {
      const accessToken = await getAccessToken()

      return {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json;charset=utf-8',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      }
    }

    axiosInstance.interceptors.request.use(onRequest)

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!(error instanceof AxiosError)) {
          return Promise.reject(error)
        }
        return Promise.reject(handleAxiosError(error))
      }
    )
    return { axiosInstance }
  })()

  return {
    getSurveyUnitsIdsAndQuestionnaireIdsByCampaign: (idCampaign) =>
      axiosInstance
        .get<IdAndQuestionnaireId>(`/api/campaign/${idCampaign}/survey-units`)
        .then(({ data }) => idAndQuestionnaireIdSchema.array().parse(data)),

    getSurveyUnits: () =>
      axiosInstance
        .get<SurveyUnit[]>(`/api/survey-units/interviewer`)
        .then(({ data }) =>
          data.map((surveyUnit) => surveyUnitSchema.parse(surveyUnit))
        ),

    getSurveyUnit: (idSurveyUnit) =>
      axiosInstance
        .get<Omit<SurveyUnit, 'id'>>(`/api/survey-unit/${idSurveyUnit}`)
        .then(({ data }) =>
          surveyUnitSchema.parse({ id: idSurveyUnit, ...data })
        ),
    putSurveyUnit: (surveyUnit) =>
      axiosInstance
        .put<typeof surveyUnit>(`api/survey-unit/${surveyUnit.id}`, surveyUnit)
        .then(() => undefined),
    putSurveyUnitsData: (surveyUnitsData) =>
      axiosInstance
        .put(`/api/survey-units/data`, surveyUnitsData)
        .then(() => undefined),

    postSurveyUnitInTemp: (surveyUnit) =>
      axiosInstance
        .post(`api/survey-unit/${surveyUnit.id}/temp-zone`, surveyUnit)
        .then(() => undefined),

    getCampaigns: () =>
      axiosInstance
        .get<Campaign>(`api/campaigns`)
        .then(({ data }) => campaignSchema.array().parse(data)),

    getQuestionnaire: (idSurvey) =>
      axiosInstance
        .get<{ value: Questionnaire }>(`/api/questionnaire/${idSurvey}`)
        .then(({ data }) => data.value),
    getRequiredNomenclaturesByCampaign: (idNomenclature) =>
      axiosInstance
        .get<RequiredNomenclatures>(
          `/api/questionnaire/${idNomenclature}/required-nomenclatures`
        )
        .then(({ data }) => requiredNomenclaturesSchema.parse(data)),

    getNomenclature: (idNomenclature) =>
      axiosInstance
        .get<Nomenclature>(`/api/nomenclature/${idNomenclature}`)
        .then(({ data }) => nomenclatureSchema.parse(data)),

    postParadata: (paradata) =>
      axiosInstance
        .post<typeof paradata>(`/api/paradata`, paradata)
        .then(() => undefined),
  }
}
