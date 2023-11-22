import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import memoize from "memoizee";
import type { QueenApi } from "core/ports/QueenApi";
import {
  campaignSchema,
  idAndQuestionnaireIdSchema,
  nomenclatureSchema,
  requiredNomenclaturesSchema,
  surveyUnitSchema,
  surveyUnitWithIdSchema,
} from "./parserSchema";
import {
  Campaign,
  IdAndQuestionnaireId,
  Nomenclature,
  Questionnaire,
  RequiredNomenclatures,
  SurveyUnit,
} from "core/model";

export function createApiClient(params: {
  apiUrl: string;
  getAccessToken: () => string | undefined;
}): QueenApi {
  const { apiUrl, getAccessToken } = params;

  const { axiosInstance } = (() => {
    const axiosInstance = axios.create({ baseURL: apiUrl, timeout: 120_000 });

    const onRequest = (config: AxiosRequestConfig) => {
      console.info(`[request] [${JSON.stringify(config)}]`);
      return {
        ...(config as any),
        headers: {
          ...config.headers,
          ...(() => {
            const accessToken = getAccessToken();

            if (!accessToken) {
              return undefined;
            }

            return {
              Authorization: `Bearer ${accessToken}`,
            };
          })(),
        },
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json;charset=utf-8",
      };
    };

    const onRequestError = (error: AxiosError): Promise<AxiosError> => {
      console.error(`[request error] [${JSON.stringify(error)}]`);
      return Promise.reject(error);
    };

    const onResponse = (response: AxiosResponse): AxiosResponse => {
      console.info(`[response] [${JSON.stringify(response)}]`);
      return response;
    };

    const onResponseError = (error: AxiosError): Promise<AxiosError> => {
      console.error(`[response error] [${JSON.stringify(error)}]`);
      return Promise.reject(error);
    };

    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return { axiosInstance };
  })();

  return {
    getSurveyUnitsIdsAndQuestionnaireIdsByCampaign: memoize(
      (idCampaign) =>
        axiosInstance
          .get<IdAndQuestionnaireId>(`/api/campaign/${idCampaign}/survey-units`)
          .then(({ data }) => idAndQuestionnaireIdSchema.array().parse(data)),
      { promise: true }
    ),
    getSurveyUnits: memoize(
      () =>
        axiosInstance
          .get<SurveyUnit[]>(`/api/survey-units/interviewer`)
          .then(({ data }) =>
            data.map((surveyUnit) => surveyUnitWithIdSchema.parse(surveyUnit))
          ),
      { promise: true }
    ),
    getSurveyUnit: memoize(
      (idSurveyUnit) =>
        axiosInstance
          .get<SurveyUnit>(`/api/survey-unit/${idSurveyUnit}`)
          .then(({ data }) => ({
            id: idSurveyUnit,
            ...surveyUnitSchema.parse(data),
          })),
      { promise: true }
    ),
    putSurveyUnit: (idSurveyUnit, surveyUnit) =>
      axiosInstance.put<typeof surveyUnit>(
        `api/survey-unit/${idSurveyUnit}`,
        surveyUnit
      ),
    putSurveyUnitsData: (surveyUnitsData) =>
      axiosInstance.put<typeof surveyUnitsData>(
        `/api/survey-units/data`,
        surveyUnitsData
      ),
    postSurveyUnitInTemp: (idSurveyUnit, surveyUnit) =>
      axiosInstance.post<typeof surveyUnit>(
        `api/survey-unit/${idSurveyUnit}/temp-zone`,
        surveyUnit
      ),
    getCampaigns: memoize(
      () =>
        axiosInstance
          .get<Campaign>(`api/campaigns`)
          .then(({ data }) => campaignSchema.array().parse(data)),
      { promise: true }
    ),
    getQuestionnaire: memoize(
      (idSurvey) =>
        axiosInstance
          .get<{ value: Questionnaire }>(`/api/questionnaire/${idSurvey}`)
          .then(({ data }) => data.value),
      { promise: true }
    ),
    getRequiredNomenclaturesByCampaign: memoize(
      (idNomenclature) =>
        axiosInstance
          .get<RequiredNomenclatures>(
            `/api/questionnaire/${idNomenclature}/required-nomenclatures`
          )
          .then(({ data }) => requiredNomenclaturesSchema.parse(data)),
      { promise: true }
    ),
    getNomenclature: memoize(
      (idNomenclature) =>
        axiosInstance
          .get<Nomenclature>(`/api/nomenclature/${idNomenclature}`)
          .then(({ data }) => nomenclatureSchema.parse(data)),
      { promise: true }
    ),
    postParadata: (paradata) =>
      axiosInstance.post<typeof paradata>(`/api/paradata`, paradata),
  };
}
