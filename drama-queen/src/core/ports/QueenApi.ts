import type {
  Campaign,
  IdAndQuestionnaireId,
  Nomenclature,
  Paradata,
  Questionnaire,
  RequiredNomenclatures,
  SurveyUnit,
} from 'core/model'

export type QueenApi = {
  getSurveyUnitsIdsAndQuestionnaireIdsByCampaign: (
    idCampaign: string
  ) => Promise<IdAndQuestionnaireId[]>
  /**
   * Endpoint in development
   * @param
   * @returns The list of surveyUnit related to current user
   * /api/survey-units/interviewer
   */
  getSurveyUnits: () => Promise<SurveyUnit[]>
  getSurveyUnit: (idSurveyUnit: string) => Promise<SurveyUnit>
  putSurveyUnit: (surveyUnit: SurveyUnit) => Promise<void>
  /**
   * Endpoint in development
   * @param
   * @returns 200 if all SU are saved 4XX or 5XX in other cases
   * /api/survey-units/data
   */
  putSurveyUnitsData: (
    surveyUnitsData: Omit<SurveyUnit, 'questionnaireId'>[]
  ) => Promise<void>
  postSurveyUnitInTemp: (surveyUnit: SurveyUnit) => Promise<void>
  getCampaigns: () => Promise<Campaign[]>
  getQuestionnaire: (idQuestionnaire: string) => Promise<Questionnaire>
  getRequiredNomenclaturesByCampaign: (
    idCampaign: string
  ) => Promise<RequiredNomenclatures>
  getNomenclature: (idNomenclature: string) => Promise<Nomenclature>
  postParadata: (paradata: Paradata) => Promise<void>
}
