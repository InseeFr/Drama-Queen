import type { Paradata } from "core/model/paradata";
import type { Table } from "dexie";

export type ParadataTable = {
  paradata: Table<Paradata>;
};

export const paradataSchema = { paradata: "++id,idSU,events" };

const newParadataSchema = { paradata: "idSu" }; //We just should need to index idSu only
