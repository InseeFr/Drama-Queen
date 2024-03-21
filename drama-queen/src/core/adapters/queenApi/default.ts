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

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!(error instanceof AxiosError)) {
          return Promise.reject(error)
        }
        if (!error.response) {
          throw new AxiosError(
            "Une erreur s'est produite lors du traitement de la requête. Veuillez réessayer plus tard."
          )
        }
        const status = error.response.status
        switch (status) {
          case 400:
            throw new AxiosError('Requête invalide.')
          case 401:
            throw new AxiosError(
              "Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource."
            )
          case 403:
            throw new AxiosError(
              "Vous n'êtes pas autorisé à accéder aux données demandées"
            )
          case 404:
            throw new AxiosError('Ressource(s) non trouvée(s).')
            break
          case 500:
            throw new AxiosError('Erreur interne du serveur.')
          case 502:
            throw new AxiosError('Passerelle incorrecte.')
          case 503:
            throw new AxiosError('Service indisponible.')
          case 504:
            throw new AxiosError("Délai d'attente de la passerelle expiré.")
          default:
            throw new AxiosError(
              "Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard."
            )
        }
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
