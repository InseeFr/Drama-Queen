export type QuestionnaireState =
  | 'INIT'
  | 'COMPLETED'
  | 'VALIDATED'
  | 'EXTRACTED'
  | null

// warning : "INIT" corresponds to "STARTED". No event for 'EXTRACTED' and null
export type EventQuestionnaireState = 'STARTED' | 'COMPLETED' | 'VALIDATED'
