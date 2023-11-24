import { Paradata, SurveyUnit } from "core/model";

export type DataStore = {
  updateSurveyUnit: (surveyUnit: SurveyUnit) => Promise<string>;
  deleteSurveyUnit: (id: string) => Promise<void>;
  getAllSurveyUnits: () => Promise<SurveyUnit[] | undefined>;
  getSurveyUnit: (id: string) => Promise<SurveyUnit | undefined>;
  getAllParadatas: () => Promise<Paradata[] | undefined>;
  deleteParadata: (id: string) => Promise<void>;
  getParadata: (id: string) => Promise<Paradata | undefined>;
};
