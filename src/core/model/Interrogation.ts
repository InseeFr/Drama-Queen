import type { InterrogationData } from './InterrogationData'
import type { StateData } from './StateData'

export type Interrogation = {
  id: string
  questionnaireId: string
  personalization?: { name: string; value: string }[]
  data: InterrogationData
  comment?: { [key: string]: unknown }
  stateData?: StateData
}

/** Interrogation stored in local storage only */
export type LocalInterrogation = Interrogation & {
  /** Whether the interrogation has been updated locally since it was last sent to the server. */
  hasBeenUpdated?: boolean
}
