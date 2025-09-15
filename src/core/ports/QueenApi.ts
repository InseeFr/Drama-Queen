import type {
  Campaign,
  IdAndQuestionnaireId,
  Interrogation,
  Nomenclature,
  Paradata,
  Questionnaire,
  RequiredNomenclatures,
} from '@/core/model'

export type QueenApi = {
  getInterrogationsIdsAndQuestionnaireIdsByCampaign: (
    idCampaign: string,
  ) => Promise<IdAndQuestionnaireId[]>
  /**
   * Endpoint in development
   * @param
   * @returns The list of interrogation related to current user
   * /api/survey-units/interviewer
   */
  getInterrogations: () => Promise<Interrogation[]>
  getInterrogation: (idInterrogation: string) => Promise<Interrogation>
  putInterrogation: (interrogation: Interrogation) => Promise<void>
  /**
   * Endpoint in development
   * @param
   * @returns 200 if all SU are saved 4XX or 5XX in other cases
   * /api/survey-units/data
   */
  putInterrogationsData: (
    interrogationsData: Omit<Interrogation, 'questionnaireId'>[],
  ) => Promise<void>
  postInterrogationInTemp: (interrogation: Interrogation) => Promise<void>
  getCampaigns: () => Promise<Campaign[]>
  getQuestionnaire: (idQuestionnaire: string) => Promise<Questionnaire>
  getRequiredNomenclaturesByCampaign: (
    idCampaign: string,
  ) => Promise<RequiredNomenclatures>
  getNomenclature: (idNomenclature: string) => Promise<Nomenclature>
  postParadata: (paradata: Paradata) => Promise<void>
}
