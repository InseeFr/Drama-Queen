import axios, { Axios, AxiosError } from 'axios'
import type { QueenApi } from 'core/ports/QueenApi'
import {
  campaignSchema,
  idAndQuestionnaireIdSchema,
  nomenclatureSchema,
  requiredNomenclaturesSchema,
  surveyUnitSchema,
} from './parserSchema'
import type {
  Campaign,
  IdAndQuestionnaireId,
  Nomenclature,
  Questionnaire,
  RequiredNomenclatures,
  SurveyUnit,
} from 'core/model'

export function createApiClient(params: {
  apiUrl: string
  getAccessToken: () => string | undefined
}): QueenApi {
  const { apiUrl, getAccessToken } = params

  const { axiosInstance } = (() => {
    const axiosInstance = axios.create({ baseURL: apiUrl })

    // Type issue https://github.com/axios/axios/issues/5494
    const onRequest = (config: any) => {
      return {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json;charset=utf-8',
          ...(() => {
            const accessToken = getAccessToken()

            if (!accessToken) {
              return undefined
            }

            return {
              Authorization: `Bearer ${accessToken}`,
            }
          })(),
        },
      }
    }

    axiosInstance.interceptors.request.use(onRequest)

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
    // .catch((error: Error | AxiosError) => {
    //   if (
    //     axios.isAxiosError(error) &&
    //     error.response &&
    //     [400, 403, 404, 500].includes(error.response.status)
    //   ) {
    //     return
    //   } else {
    //     throw error;
    //   }
    // })
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
