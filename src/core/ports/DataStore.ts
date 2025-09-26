import type { Interrogation, Paradata, TelemetryEvent } from '@/core/model'

export type DataStore = {
  updateInterrogation: (interrogation: Interrogation) => Promise<string>
  deleteInterrogation: (id: string) => Promise<void>
  getAllInterrogations: () => Promise<Interrogation[] | undefined>
  getInterrogation: (id: string) => Promise<Interrogation | undefined>
  getAllParadatas: () => Promise<Paradata[] | undefined>
  deleteParadata: (id: string) => Promise<void>
  getParadata: (id: string) => Promise<Paradata | undefined>
  updateParadata: (
    interrogationId: string,
    newEvents: TelemetryEvent[],
  ) => Promise<void>
}
