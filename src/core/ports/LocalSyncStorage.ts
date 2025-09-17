export type LocalStorageObject = {
  error: boolean
  interrogationsSuccess: string[]
  interrogationsInTempZone: string[]
}

export type LocalSyncStorage = {
  saveObject: (object: LocalStorageObject) => void
  getObject: () => LocalStorageObject | null
  addIdToInterrogationsSuccess: (id: string) => void
  addIdToInterrogationsInTempZone: (id: string) => void
  addError: (error: boolean) => void
}
