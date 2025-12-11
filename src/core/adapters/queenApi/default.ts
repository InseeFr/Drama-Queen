import axios, { AxiosError } from 'axios'

import type {
  Campaign,
  IdAndQuestionnaireId,
  Interrogation,
  Nomenclature,
  Questionnaire,
  RequiredNomenclatures,
} from '@/core/model'
import type { QueenApi } from '@/core/ports/QueenApi'
import { handleAxiosError } from '@/core/tools/axiosError'

import {
  campaignSchema,
  idAndQuestionnaireIdSchema,
  interrogationSchema,
  nomenclatureSchema,
  requiredNomenclaturesSchema,
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
      },
    )
    return { axiosInstance }
  })()

  return {
    getInterrogationsIdsAndQuestionnaireIdsByCampaign: (idCampaign) =>
      axiosInstance
        .get<IdAndQuestionnaireId>(`/api/campaign/${idCampaign}/interrogations`)
        .then(({ data }) => idAndQuestionnaireIdSchema.array().parse(data)),

    getInterrogations: () =>
      axiosInstance
        .get<Interrogation[]>(`/api/interrogations/interviewer`)
        .then(({ data }) =>
          data.map((interrogation) => interrogationSchema.parse(interrogation)),
        ),

    getInterrogation: (idInterrogation) =>
      axiosInstance
        .get<
          Omit<Interrogation, 'id'>
        >(`/api/interrogations/${idInterrogation}`)
        .then(({ data }) =>
          interrogationSchema.parse({ id: idInterrogation, ...data }),
        ),
    putInterrogation: (interrogation) =>
      axiosInstance
        .put<
          typeof interrogation
        >(`api/interrogations/${interrogation.id}`, interrogation)
        .then(() => undefined),
    putInterrogationsData: (interrogationsData) =>
      axiosInstance
        .put(`/api/interrogations/data`, interrogationsData)
        .then(() => undefined),

    postInterrogationInTemp: (interrogation) =>
      axiosInstance
        .post(`api/interrogations/${interrogation.id}/temp-zone`, interrogation)
        .then(() => undefined),

    syncInterrogation: (idInterrogation) =>
      axiosInstance
        .post(`api/interrogations/${idInterrogation}/synchronize`)
        .then(({ data }) => interrogationSchema.parse(data)),

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
          `/api/questionnaire/${idNomenclature}/required-nomenclatures`,
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
