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
    addIdToInterrogationsSuccess: (id) => {
      const existingData = getDataFromLocalStorage()
      if (existingData === null) {
        return saveDataToLocalStorage({
          error: false,
          interrogationsInTempZone: [],
          interrogationsSuccess: [id],
        })
      }
      existingData.interrogationsSuccess.push(id)
      saveDataToLocalStorage(existingData)
    },
    addIdToInterrogationsInTempZone: (id) => {
      const existingData = getDataFromLocalStorage()

      if (existingData === null) {
        return saveDataToLocalStorage({
          error: false,
          interrogationsInTempZone: [id],
          interrogationsSuccess: [],
        })
      }

      existingData.interrogationsInTempZone.push(id)
      saveDataToLocalStorage(existingData)
    },
    addError: (error) => {
      const existingData = getDataFromLocalStorage()

      if (existingData === null) {
        return saveDataToLocalStorage({
          error: error,
          interrogationsInTempZone: [],
          interrogationsSuccess: [],
        })
      }
      saveDataToLocalStorage({ ...existingData, error: error })
    },
  } satisfies LocalSyncStorage
}
