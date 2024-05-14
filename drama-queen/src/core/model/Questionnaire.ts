import type { LunaticSource } from '@inseefr/lunatic'

// LunaticSource should directly include lunaticModelVersion & label (even if optional)
export type Questionnaire = LunaticSource & {
  lunaticModelVersion: string
  label: {
    type: string
    value: string
  }
}

// TEMP
export type WrappedQuestionnaire = {
  value: Questionnaire
}
