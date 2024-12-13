import type {
  LocalStorageObject,
  LocalSyncStorage,
} from '@/core/ports/LocalSyncStorage'

import { localStorageObjectSchema } from './parser/localSyncObjectSchema'

export function createLocalSyncStorage(params: {
  localStorageKey: string
}): LocalSyncStorage {
  const { localStorageKey } = params

  const saveDataToLocalStorage = (object: LocalStorageObject) => {
    try {
      const serializedData = JSON.stringify(object)
      localStorage.setItem(localStorageKey, serializedData)
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
    }
  }

  const getDataFromLocalStorage = () => {
    try {
      const serializedData = localStorage.getItem(localStorageKey)
      if (serializedData === null) {
        return null
      }
      return localStorageObjectSchema.parse(JSON.parse(serializedData))
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error)
      return null
    }
  }

  return {
    saveObject: (object) => saveDataToLocalStorage(object),
    getObject: getDataFromLocalStorage,
    addIdToSurveyUnitsSuccess: (id) => {
      const existingData = getDataFromLocalStorage()
      if (existingData === null) {
        return saveDataToLocalStorage({
          error: false,
          surveyUnitsInTempZone: [],
          surveyUnitsSuccess: [id],
        })
      }
      existingData.surveyUnitsSuccess.push(id)
      saveDataToLocalStorage(existingData)
    },
    addIdToSurveyUnitsInTempZone: (id) => {
      const existingData = getDataFromLocalStorage()

      if (existingData === null) {
        return saveDataToLocalStorage({
          error: false,
          surveyUnitsInTempZone: [id],
          surveyUnitsSuccess: [],
        })
      }

      existingData.surveyUnitsInTempZone.push(id)
      saveDataToLocalStorage(existingData)
    },
    addError: (error) => {
      const existingData = getDataFromLocalStorage()

      if (existingData === null) {
        return saveDataToLocalStorage({
          error: error,
          surveyUnitsInTempZone: [],
          surveyUnitsSuccess: [],
        })
      }
      saveDataToLocalStorage({ ...existingData, error: error })
    },
  } satisfies LocalSyncStorage
}
