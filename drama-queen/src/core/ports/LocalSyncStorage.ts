export type LocalStorageObject = {
  error: boolean;
  surveyUnitsSuccess: string[];
  surveyUnitsInTempZone: string[];
};

export type LocalSyncStorage = {
  saveObject: (object: LocalStorageObject) => void;
  getObject: () => LocalStorageObject | null;
  addIdToSurveyUnitsSuccess: (id: string) => void;
  addIdToSurveyUnitsInTempZone: (id: string) => void;
  addError: (error: boolean) => void;
};
