import Dexie, { type Table } from 'dexie'

import { mockPrefixIdSu } from '@/core/adapters/queenApi/mock'
import type { Paradata, SurveyUnit } from '@/core/model'
import type { DataStore } from '@/core/ports/DataStore'

type Tables = {
  interrogation: Table<SurveyUnit, string>
  paradata: Table<Paradata>
}

export function createDataStore(): DataStore {
  const db = new Dexie('Queen') as InstanceType<typeof Dexie> & Tables

  db.version(2).stores({
    paradata: '++id,idSU,events',
    surveyUnit: 'id,data,stateData,personalization,comment,questionnaireId',
  })

  // version 3 : replace surveyUnit by interrogation
  db.version(3)
    .stores({
      paradata: '++id,idSU,events',
      interrogation:
        'id,data,stateData,personalization,comment,questionnaireId',
    })
    .upgrade(async (tx) => {
      // migration from version 2 to version 3 : from table 'surveyUnit' to 'interrogation' with same content
      if (tx.storeNames.includes('surveyUnit')) {
        const oldTable = tx.table<SurveyUnit, string>('surveyUnit')
        const newTable = tx.table<SurveyUnit, string>('interrogation')

        await oldTable.toCollection().each(async (item) => {
          await newTable.put(item)
        })
      }
    })

  return {
    updateSurveyUnit: (surveyUnit) => db.interrogation.put(surveyUnit),
    deleteSurveyUnit: (id) => db.interrogation.delete(id),
    getAllSurveyUnits: () =>
      db.interrogation
        .filter(({ id }) => !id.startsWith(mockPrefixIdSu))
        .toArray(),
    getSurveyUnit: (id) => db.interrogation.get(id),
    getAllParadatas: () => db.paradata.toArray(),
    deleteParadata: (id) => db.paradata.delete(id),
    getParadata: (id) => db.paradata.get(id),
  }
}
