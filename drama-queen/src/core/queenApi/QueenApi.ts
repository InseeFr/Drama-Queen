import type { Campaign } from "core/model/campaing";
import type {
  Nomenclature,
  RequiredNomenclatures,
} from "core/model/nomenclature";
import type { Paradata } from "core/model/paradata";
import type { Questionnaire } from "core/model/survey";
import type {
  IdAndQuestionnaireId,
  SurveyUnitWithId,
} from "core/model/surveyUnit";

export type QueenApi = {
  getSurveyUnitsIdsAndQuestionnaireIdsByCampaign: (
    idCampaign: string
  ) => Promise<IdAndQuestionnaireId[]>;
  /**
   * We hope API will implement this endpoint
   * @param idCampaign
   * @return Array of SurveyUnit for campaign
   * @todo Implement this functions in the API
   */
  getSurveyUnitsByCampaign: (idCampaign: string) => Promise<SurveyUnitWithId[]>;
  getSurveyUnit: (idSurveyUnit: string) => Promise<SurveyUnitWithId>;
  putSurveyUnit: (idSurveyUnit: string, surveyUnit: SurveyUnitWithId) => void;
  postSurveyUnitInTemp: (
    idSurveyUnit: string,
    surveyUnit: SurveyUnitWithId
  ) => void;
  getCampaigns: () => Promise<Campaign[]>;
  getQuestionnaire: (idQuestionnaire: string) => Promise<Questionnaire>;
  getRequiredNomenclaturesByCampaign: (
    idCampaign: string
  ) => Promise<RequiredNomenclatures>;
  getNomenclature: (idNomenclature: string) => Promise<Nomenclature>;
  postParadata: (paradata: Paradata) => void;
};
