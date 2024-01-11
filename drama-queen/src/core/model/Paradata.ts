export type Paradata = {
  idSu: string
  event: {
    type: 'click' | 'session-started' | 'orchestrator-create'
    timestamp: number
    userAgent: string
    idSurveyUnit: string
    idOrchestrator:
      | 'orchestrator-collect'
      | 'orchestrator-readonly'
      | 'orchestrator-vizualisation'
    idQuestionnaire: string
    idParadataObject: string
    typeParadataObject: 'orchestrator' | 'session'
    page: string | null
  }[]
}
