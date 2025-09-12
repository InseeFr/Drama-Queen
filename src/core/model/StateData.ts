import type { LeafState } from './LeafState'
import type { QuestionnaireState } from './QuestionnaireState'

export type PageTag = `${number}.${number}#${number}` | `${number}`

export type StateData = {
  state: QuestionnaireState
  date: number
  currentPage: PageTag
  leafStates?: LeafState[]
}
