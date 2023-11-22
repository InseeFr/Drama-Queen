import { Paradata, SurveyUnit } from "core/model";
import { DataStore } from "core/ports/DataStore";
import Dexie, { Table } from "dexie";

type Tables = {
  surveyUnit: Table<SurveyUnit, string>;
  paradata: Table<Paradata>;
};

export function createDataStore(params: {
  name: string;
  schema: Record<keyof Tables, string>;
  version: number;
}): DataStore {
  const { name, schema, version } = params;

  const db = new Dexie(name) as InstanceType<typeof Dexie> & Tables;
  db.version(version).stores(schema);

  return {
    updateSurveyUnit: (surveyUnit) => db.surveyUnit.put(surveyUnit),
    deleteSurveyUnit: (id) => db.surveyUnit.delete(id),
    getAllSurveyUnit: () => db.surveyUnit.toArray(),
    getSurveyUnit: (id) => db.surveyUnit.get(id),
    getAllParadata: () => db.paradata.toArray(),
    deleteParadata: (id) => db.paradata.delete(id),
    getParadata: (id) => db.paradata.get(id),
  };
}
