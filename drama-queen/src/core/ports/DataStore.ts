import { Paradata, SurveyUnit } from "core/model";

export type DataStore = {
  updateSurveyUnit: (surveyUnit: SurveyUnit) => Promise<string>;
  deleteSurveyUnit: (id: string) => Promise<void>;
  getAllSurveyUnit: () => Promise<SurveyUnit[] | undefined>;
  getSurveyUnit: (id: string) => Promise<SurveyUnit | undefined>;
  getAllParadata: () => Promise<Paradata[] | undefined>;
  deleteParadata: (id: string) => Promise<void>;
  getParadata: (id: string) => Promise<Paradata | undefined>;
};
