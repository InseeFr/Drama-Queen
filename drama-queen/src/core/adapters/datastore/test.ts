//import { DataStore } from "core/ports/DataStore";
import { Evt } from 'evt'
import { Deferred } from 'evt/tools/Deferred'

export type DataStore<T extends { id: string }> = {
  write: (entries: T[]) => Promise<void>
  read: (ids: string[]) => Promise<T[]>
  subscribe: (callback: () => void) => void
}

export async function createDataStore<T extends { id: string }>(params: {
  name: string
}): Promise<DataStore<T>> {
  const { name } = params
  const { db } = await (async () => {
    const dDb = new Deferred<IDBDatabase>()

    const DBOpenRequest = window.indexedDB.open(name)
    DBOpenRequest.onsuccess = function () {
      dDb.resolve(DBOpenRequest.result)
    }

    const db = await dDb.pr

    return { db }
  })()

  const eventName = `datastore-${name}`

  return {
    read: async (ids) => {
      const transaction = db.transaction(name, 'readonly')
      const objectStore = transaction.objectStore(name)
      const promises = ids.map((id) => objectStore.get(id))
      const results = await Promise.all(promises)
      return results.filter((result) => result !== undefined) as unknown as T[]
    },
    write: async (entries) => {
      //TODO GPT help!

      document.dispatchEvent(new Event(eventName))
    },
    subscribe: (callback) => {
      document.addEventListener(eventName, () => callback())
    },
  }
}
