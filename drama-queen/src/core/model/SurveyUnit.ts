import type { SurveyUnitData } from './SurveyUnitData'

export type SurveyUnit = {
  id: string
  questionnaireId: string
  personalization?: {}[] | {}
  data: SurveyUnitData
  comment?: {} | undefined
  stateData?: {
    state: 'INIT' | 'COMPLETED' | 'VALIDATED' | 'EXTRACTED' | null
    date: number
    currentPage: string
  }
}
