import Dexie from 'dexie'

import type { Interrogation, InterrogationData } from '@/core/model'

import { createDataStore, dbVersion2, dbVersion3, dbVersion4 } from './default'

describe('createDataStore', () => {
  describe('Dexie migration v2 → latest version', () => {
    beforeEach(async () => {
      await Dexie.delete('Queen')
    })

    it('migrates surveyUnit → interrogation', async () => {
      // Create DB at version 2
      const dbV2 = new Dexie('Queen')
      dbVersion2(dbV2)

      // Create 500 surveyUnits having 1000 variables, for stress test
      const nbSurveyUnits = 500
      const nbVariables = 1000
      const collected: InterrogationData['COLLECTED'] = {}
      for (let i = 0; i < nbVariables; i++) {
        collected[`VAR${i}`] = {
          COLLECTED: `collected value`,
        }
      }

      const surveyUnits: Interrogation[] = Array.from({
        length: nbSurveyUnits,
      }).map((_, i) => ({
        id: `INTERRO${i.toString().padStart(5, '0')}`,
        questionnaireId: 'Q1',
        data: { COLLECTED: collected },
        stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      }))

      // Insert all surveyUnits in surveyUnit table
      await dbV2.table('surveyUnit').bulkPut(surveyUnits)

      // Create new data store to trigger migration to latest version
      const store = createDataStore()

      // Check all surveyUnits have been migrated into interrogations in interrogation table
      const interrogations = await store.getAllInterrogations()
      expect(interrogations).toEqual(surveyUnits)
    })
  })

  describe('Dexie migration v3 → latest version', () => {
    beforeEach(async () => {
      await Dexie.delete('Queen') // start fresh each test
    })

    it('keeps existing interrogations and migrates paradata table', async () => {
      // Create DB at version 3
      const dbV3 = new Dexie('Queen')
      dbVersion2(dbV3)
      dbVersion3(dbV3)

      const interrogation: Interrogation = {
        id: 'INTERRO001',
        questionnaireId: 'Q1',
        data: { COLLECTED: { prenom: { COLLECTED: 'Paul' } } },
        stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      }

      await dbV3.table('interrogation').put(interrogation)

      // Create new data store to trigger migration
      const store = createDataStore()

      // Check that interrogations remain untouched
      expect(await store.getAllInterrogations()).toEqual([interrogation])

      // Check that surveyUnit table has been removed
      const tableNames = store.db.tables.map((t) => t.name)
      expect(tableNames).not.toContain('surveyUnit')
    })
  })

  describe('Dexie migration v4 → latest version', () => {
    beforeEach(async () => {
      await Dexie.delete('Queen')
    })

    it('creates new paradata table and preserves existing interrogations', async () => {
      // Create DB at version 4
      const dbV4 = new Dexie('Queen')
      dbVersion2(dbV4)
      dbVersion3(dbV4)
      dbVersion4(dbV4)

      const interrogation: Interrogation = {
        id: 'INTERRO001',
        questionnaireId: 'Q1',
        data: { COLLECTED: { prenom: { COLLECTED: 'Paul' } } },
        stateData: { state: 'INIT', date: 17000000, currentPage: '1' },
      }

      await dbV4.table('interrogation').put(interrogation)

      // Check paradata table does not exist in v4 db
      const tableNames = dbV4.tables.map((t) => t.name)
      expect(tableNames).not.toContain('paradata')

      // Create new data store to trigger migration
      const store = createDataStore()

      // Check that interrogations remain untouched
      expect(await store.getAllInterrogations()).toEqual([interrogation])

      // Check new paradata table exists and is empty
      const paradata = await store.getAllParadata()
      expect(paradata).toEqual([])
    })
  })
})
