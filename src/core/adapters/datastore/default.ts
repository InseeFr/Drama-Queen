import Dexie, { type Table } from 'dexie'

import { mockPrefixIdInterrogation } from '@/core/adapters/queenApi/mock'
import type { Interrogation, Paradata } from '@/core/model'
import type { DataStore } from '@/core/ports/DataStore'

type Tables = {
  interrogation: Table<Interrogation, string>
  paradata: Table<Paradata>
}

export function createDataStore(): DataStore & { db: Dexie & Tables } {
  const db = new Dexie('Queen') as InstanceType<typeof Dexie> & Tables

  dbVersion2(db)
  dbVersion3(db)
  dbVersion4(db)
  dbVersion5(db)

  return {
    db, // only used for tests
    updateInterrogation: (interrogation) => db.interrogation.put(interrogation),
    deleteInterrogation: (id) => db.interrogation.delete(id),
    getAllInterrogations: () =>
      db.interrogation
        .filter(({ id }) => !id.startsWith(mockPrefixIdInterrogation))
        .toArray(),
    getInterrogation: (id) => db.interrogation.get(id),
    getAllParadata: () => db.paradata.toArray(),
    deleteParadata: (interrogationId) => db.paradata.delete(interrogationId),
    getParadata: (interrogationId) => db.paradata.get(interrogationId),
    updateParadata: async (interrogationId, newEvents) => {
      // check if a paradata already exists in datastore for this interrogation
      const existing = await db.paradata.get(interrogationId)
      // if paradata already exists, we merge the new events into the existing events table
      const events = existing ? [...existing.events, ...newEvents] : newEvents
      await db.paradata.put({
        idInterrogation: interrogationId,
        events: events,
      })
    },
  }
}

export function dbVersion2(db: Dexie) {
  db.version(2).stores({
    paradata: '++id,idSU,events',
    surveyUnit: 'id,data,stateData,personalization,comment,questionnaireId',
  })
}

/**
 * Replaces surveyUnit by interrogation in datastore.
 */
export function dbVersion3(db: Dexie) {
  db.version(3)
    .stores({
      interrogation:
        'id,data,stateData,personalization,comment,questionnaireId',
    })
    .upgrade(async (tx) => {
      // migration from version 2 to version 3 : from table 'surveyUnit' to 'interrogation' with same content
      try {
        const oldTable = tx.table<Interrogation, string>('surveyUnit')
        const newTable = tx.table<Interrogation, string>('interrogation')

        const items = await oldTable.toArray()
        if (items.length > 0) await newTable.bulkPut(items)
      } catch (err) {
        console.error(
          'surveyUnit table does not exist, skipping migration',
          err,
        )
      }
    })
}

/**
 * Removes old paradata and surveyUnit tables in datastore.
 */
export function dbVersion4(db: Dexie) {
  db.version(4).stores({
    paradata: null,
    surveyUnit: null,
  })
}

/**
 * Creates paradata table with new schema in datastore.
 */
export function dbVersion5(db: Dexie) {
  db.version(5).stores({
    paradata: '++idInterrogation',
  })
}
