import type { StateData } from './StateData'
import type { SurveyUnitData } from './SurveyUnitData'

export type SurveyUnit = {
  id: string
  questionnaireId: string
  personalization?: { name: string; value: string }[]
  data: SurveyUnitData
  comment?: { [key: string]: unknown }
  stateData?: StateData
}
