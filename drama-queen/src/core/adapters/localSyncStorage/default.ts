import type {
  LocalStorageObject,
  LocalSyncStorage,
} from "core/ports/LocalSyncStorage";
import { localStorageObjectSchema } from "./parser/localSyncObjectSchema";

//const LOCALSTORAGE_KEY = "QUEEN_SYNC_RESULT";

export function createLocalSyncStorage(params: {
  localStorageKey: string;
}): LocalSyncStorage {
  const { localStorageKey } = params;

  const saveDataToLocalStorage = (object: LocalStorageObject) => {
    try {
      const serializedData = JSON.stringify(object);
      localStorage.setItem(localStorageKey, serializedData);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  const getDataFromLocalStorage = () => {
    try {
      const serializedData = localStorage.getItem(localStorageKey);
      if (serializedData === null) {
        return null;
      }
      return localStorageObjectSchema.parse(serializedData);
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      return null;
    }
  };

  return {
    saveObject: (object) => saveDataToLocalStorage(object),
    getObject: getDataFromLocalStorage,
    addIdToSurveyUnitsSuccess: (id) => {
      const existingData = getDataFromLocalStorage();

      if (existingData) {
        existingData.surveyUnitsSuccess.push(id);
        saveDataToLocalStorage(existingData);
      }
      saveDataToLocalStorage({
        error: false,
        surveyUnitsInTempZone: [],
        surveyUnitsSuccess: [id],
      });
    },
    addIdToSurveyUnitsInTempZone: (id) => {
      const existingData = getDataFromLocalStorage();

      if (existingData) {
        existingData.surveyUnitsInTempZone.push(id);
        saveDataToLocalStorage(existingData);
      }
      saveDataToLocalStorage({
        error: false,
        surveyUnitsInTempZone: [id],
        surveyUnitsSuccess: [],
      });
    },
    addError: (error) => {
      const existingData = getDataFromLocalStorage();
      if (existingData) {
        saveDataToLocalStorage({ ...existingData, error: error });
      }
      saveDataToLocalStorage({
        error: error,
        surveyUnitsInTempZone: [],
        surveyUnitsSuccess: [],
      });
    },
  } satisfies LocalSyncStorage;
}
