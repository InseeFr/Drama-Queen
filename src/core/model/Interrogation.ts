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
