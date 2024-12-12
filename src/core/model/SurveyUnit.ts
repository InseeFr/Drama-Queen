import type { QuestionnaireState } from './QuestionnaireState'
import type { SurveyUnitData } from './SurveyUnitData'

export type PageTag = `${number}.${number}#${number}` | `${number}`

export type SurveyUnit = {
  id: string
  questionnaireId: string
  personalization?: { name: string; value: string }[]
  data: SurveyUnitData
  comment?: {} | undefined
  stateData?:
    | {
        state: QuestionnaireState
        date: number
        currentPage: PageTag
      }
    | undefined
}
