import type { LocalInterrogation, Paradata, TelemetryEvent } from '@/core/model'

export type DataStore = {
  updateInterrogation: (interrogation: LocalInterrogation) => Promise<string>
  deleteInterrogation: (id: string) => Promise<void>
  getAllInterrogations: () => Promise<LocalInterrogation[]>
  getInterrogation: (id: string) => Promise<LocalInterrogation | undefined>
  getAllParadata: () => Promise<Paradata[] | undefined>
  deleteParadata: (id: string) => Promise<void>
  getParadata: (id: string) => Promise<Paradata | undefined>
  updateParadata: (
    interrogationId: string,
    newEvents: TelemetryEvent[],
  ) => Promise<void>
}
