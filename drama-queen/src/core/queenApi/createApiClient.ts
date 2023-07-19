import { SurveyUnit, SurveyUnitSchema } from "../model/surveyUnit";
import axios from "axios";
import memoize from "memoizee";
import { SurveyUnitData, SurveyUnitDataSchema } from "../model/surveyUnitData";
import { QueenApi } from "./QueenApi";
import { Campaign, CampaignSchema } from "../model/campaing";
import { Survey } from "../model/survey";
import {
  Nomenclature,
  NomenclatureSchema,
  RequiredNomenclatures,
  RequiredNomenclaturesSchema,
} from "../model/nomenclature";
import { Paradata } from "../model/paradata";

export function createApiClient(params: {
  apiUrl: string;
  getAccessToken: () => string | undefined;
}) {
  const { apiUrl, getAccessToken } = params;

  const { axiosInstance } = (() => {
    const axiosInstance = axios.create({ baseURL: apiUrl, timeout: 120_000 });

    if (getAccessToken !== undefined) {
      axiosInstance.interceptors.request.use((config) => ({
        ...(config as any),
        headers: {
          ...config.headers,
          ...(() => {
            const accessToken = getAccessToken();

            if (accessToken === undefined) {
              return {};
            }

            return {
              Authorization: `Bearer ${accessToken}`,
            };
          })(),
        },
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json;charset=utf-8",
      }));
    }
    return { axiosInstance };
  })();

  return {
    getSurveyUnitsByCampaign: memoize(
      (idCampaign) =>
        axiosInstance
          .get<SurveyUnit>(`/api/campaign/${idCampaign}/survey-units`)
          .then(({ data }) => SurveyUnitSchema.array().parse(data)),
      { promise: true }
    ),
    getSurveyUnit: memoize(
      (idSurveyUnit) =>
        axiosInstance
          .get<SurveyUnitData>(`/api/survey-unit/${idSurveyUnit}`)
          .then(({ data }) => SurveyUnitSchema.parse(data)),
      { promise: true }
    ),
    putSurveyUnit: (idSurveyUnit, surveyUnit) =>
      axiosInstance.put<SurveyUnit>(
        `api/survey-unit/${idSurveyUnit}`,
        surveyUnit
      ),
    postSurveyUnitInTemp: (idSurveyUnit, surveyUnit) =>
      axiosInstance.post<SurveyUnit>(
        `api/survey-unit/${idSurveyUnit}/temp-zone`,
        surveyUnit
      ),
    getCampaigns: memoize(
      () =>
        axiosInstance
          .get<Campaign[]>(`api/campaigns`)
          .then(({ data }) => CampaignSchema.array().parse(data)),
      { promise: true }
    ),
    getSurvey: memoize(
      (idSurvey) =>
        axiosInstance
          .get<Survey>(`/api/survey-unit/${idSurvey}`)
          .then(({ data }) => data),
      { promise: true }
    ),
    getRequiredNomenclaturesByCampaign: memoize(
      (idNomenclature) =>
        axiosInstance
          .get<RequiredNomenclatures>(
            `/api/questionnaire/${idNomenclature}/required-nomenclatures`
          )
          .then(({ data }) => RequiredNomenclaturesSchema.parse(data)),
      { promise: true }
    ),
    getNomenclature: memoize(
      (idNomenclature) =>
        axiosInstance
          .get<Nomenclature>(`/api/nomenclature/${idNomenclature}`)
          .then(({ data }) => NomenclatureSchema.parse(data)),
      { promise: true }
    ),
    postParadata: (paradata) =>
      axiosInstance.post<Paradata>(`/api/paradata`, paradata),
  } satisfies QueenApi;
}
