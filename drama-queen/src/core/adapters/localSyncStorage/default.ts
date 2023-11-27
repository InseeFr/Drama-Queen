import type {
  LocalStorageObject,
  LocalSyncStorage,
} from "core/ports/LocalSyncStorage";
import { object } from "zod";

//const LOCALSTORAGE_KEY = "QUEEN_SYNC_RESULT";

export function createLocalSyncStorage(params: {
  localStorageKey: string;
}): LocalSyncStorage {
  const { localStorageKey } = params;

  const saveDataToLocalStorage = (data: LocalStorageObject): void => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(localStorageKey, serializedData);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  return {
    saveObject: (object) => undefined,
    getObject: () => ({} as LocalStorageObject),
    addIdToSurveyUnitsSuccess: (id) => undefined,
    addIdToSurveyUnitsInTempZone: (id) => undefined,
    addError: (error) => undefined,

  };
}
