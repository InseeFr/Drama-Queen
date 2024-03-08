import type { SurveyUnit } from 'core/model'

export const errorMessage = {
  error: {
    fr: 'erreur',
    en: 'error',
  },
  errorOccured: {
    fr: 'Une erreur est survenue',
    en: 'An error has occured',
  },
  shortUnknownError: {
    fr: 'Erreur inconnue',
    en: 'Unknown error',
  },
  longUnknownError: {
    fr: "Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard.",
    en: 'An unknown error has occurred, please contact support or try again later.',
  },
  surveyUnitNotRetrievable: {
    fr: "Une erreur est survenue lors de la récupération de l'unité enquêtée.",
    en: 'An error occurred while retrieving the survey unit.',
  },
  surveyUnitNotFound: {
    fr: (surveyUnitId: string) =>
      `L'unité enquêtée ${surveyUnitId} est introuvable`,
    en: (surveyUnitId: string) => `Survey unit ${surveyUnitId} not found`,
  },
  lunaticModelVersionNotFound: {
    fr: 'Le questionnaire ne comporte pas de champ lunaticModelVersion. Redirection par défaut vers Queen v2',
    en: 'The questionnaire has no lunaticModelVersion field. By default we redirect to queen v2',
  },
  questionnaireNotFound: {
    fr: (questionnaireId: string) =>
      `Impossible de récupérer le questionnaire ${questionnaireId}.`,
    en: (questionnaireId: string) =>
      `Unable to retrieve questionnaire ${questionnaireId}.`,
  },
  wrongQuestionnaire: {
    fr: (params: { surveyUnit: SurveyUnit; questionnaireId: string }) =>
      `L'unité enquêtée ${params.surveyUnit} n'est pas associée au questionnaire ${params.questionnaireId}.`,
    en: (params: { surveyUnit: SurveyUnit; questionnaireId: string }) =>
      `The survey unit ${params.surveyUnit} is not associated with the questionnaire ${params.questionnaireId}.`,
  },
  surveyUnitUnauthorized: {
    fr: "Vous n'êtes pas autorisé à accéder aux données de cette unité enquêtée.",
    en: 'You are not authorized to access data from this survey unit.',
  },
} as const
