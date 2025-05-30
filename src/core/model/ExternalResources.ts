export type ExternalQuestionnaire = {
  id: string
  cacheName: string
}

export type ExternalQuestionnaires = ExternalQuestionnaire[]

export type ExternalQuestionnairesWrapper = {
  questionnaires: ExternalQuestionnaires
  version?: string
}

export type ExternalQuestionnairesFiltered = {
  neededQuestionnaires: ExternalQuestionnaires
  notNeededQuestionnaires: ExternalQuestionnaires
}

export type Manifest = {
  [key: string]: string
}
