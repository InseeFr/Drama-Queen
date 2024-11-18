import { LUNATIC_MODEL_VERSION_BREAKING } from 'core/constants'
import type { Translations } from '../types'

export const translations: Translations<'fr'> = {
  errorMessage: {
    '400': 'Requête invalide.',
    '401':
      "Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à cette ressource.",
    '403': "Vous n'êtes pas autorisé à accéder aux données demandées",
    '404': 'Ressource(s) non trouvée(s).',
    '500': 'Erreur interne du serveur.',
    '502': 'Passerelle incorrecte.',
    '503': 'Service indisponible.',
    '504': "Délai d'attente de la passerelle expiré.",
    error: 'Erreur',
    errorOccured: 'Une erreur est survenue',
    shortUnknownError: 'Erreur inconnue',
    longUnknownError:
      "Une erreur inconnue s'est produite, veuillez contacter l'assistance ou réessayer plus tard.",
    surveyUnitNotRetrievable:
      "Une erreur est survenue lors de la récupération de l'unité enquêtée.",
    surveyUnitNotFound: ({ surveyUnitId }) =>
      `L'unité enquêtée ${surveyUnitId} est introuvable.`,
    lunaticModelVersionNotFound:
      'Le questionnaire ne comporte pas de champ lunaticModelVersion',
    questionnaireNotCompatible: `Le questionnaire est incompatible. La version du 'lunaticModelVersion' doit être supérieure à  ${LUNATIC_MODEL_VERSION_BREAKING}`,
    questionnaireNotFound: ({ questionnaireId }) =>
      `Impossible de récupérer le questionnaire ${questionnaireId}.`,
    wrongQuestionnaire: ({ surveyUnitId, questionnaireId }) =>
      `L'unité enquêtée ${surveyUnitId} n'est pas associée au questionnaire ${questionnaireId}.`,
    surveyUnitUnauthorized:
      "Vous n'êtes pas autorisé à accéder aux données de cette unité enquêtée.",
    externalResourcesLoadedError:
      'Impossible de charger les ressources externes.',
  },
  modalMessage: {
    reviewQuitTitle: 'Sortie du questionnaire',
    reviewQuitContent:
      "Si vous souhaitez sortir du questionnaire, veuillez fermer l'onglet actuel.",
    temporaryQuitTitle: 'Arrêt provisoire',
    temporaryQuitContent: 'Vous allez sortir du questionnaire',
    temporaryQuitValidate: 'Valider',
    definitiveQuitTitle: 'Arrêt définitif',
    definitiveQuitContent:
      'Confirmez-vous l’arrêt définitif du questionnaire ?',
    definitiveQuitValidate: "Valider l'arrêt définitif",
    welcomeModalTitle: 'Bienvenue',
    welcomeModalContent:
      'Vous avez déjà commencé à renseigner le questionnaire. Souhaitez-vous reprendre là où vous en étiez ou revenir à la première page ?',
    welcomeModalFirstPage: 'Revenir à la première page',
    welcomeModalGoBack: "Reprendre là où j'en étais",
    cancel: 'Annuler',
  },
  navigationMessage: {
    goToSequence: 'Aller vers la séquence',
    goToSubSequence: 'Aller vers la sous-séquence',
    goTo: 'Aller vers ...',
    continueHelper: 'appuyer sur',
    previousHelper: 'PREC.',
    nextHelper: 'SUIV.',
    backToQuestionnaireStart: 'Retour au début du questionnaire',
    temporaryQuestionnaireStop: "Arrêt provisoire de l'interview",
    definitiveQuestionnaireStop:
      "Arrêt définitif de l'interview (refus, impossibilité de continuer, ...)",
    questionnaireStopNature: "Quelle est la nature de l'arrêt ?",
    back: 'Retour',
    surveyButton: 'Enquête',
    stopButton: 'Arrêt',
    pageNumber: 'n° page',
    validateAndQuit: 'Valider et quitter',
    quit: 'Quitter',
    fastForward: "Suite de l'entretien",
    continue: 'Continuer',
    dontKnowButtonLabel: 'Ne sait pas',
    shortCutNextLabel: 'alt + ENTRÉE',
  },
  synchronizeMessage: {
    synchronizationInProgress: 'Synchronisation en cours',
    downloadingData: 'Téléchargement des données...',
    surveyUnitsProgress: 'Unités enquêtées',
    questionnairesProgress: 'Questionnaires',
    nomenclaturesProgress: 'Nomenclatures',
    externalResourcesProgress: 'Ressources externes',
    uploadingData: 'Envoi des données...',
  },
  visualizeMessage: {
    visualizePage: 'Page de visualisation de questionnaire',
    inputSurveyLabel: 'Questionnaire',
    inputSurveyHelper:
      "L'url d'un json de questionnaire au format Lunatic-model",
    inputDataLabel: 'Données',
    inputDataHelper: "L'url d'un json de données (de réponse)",
    inputNomenclatureLabel: 'Dictionnaire de nomenclatures',
    inputNomenclatureHelper:
      "Dictionnaire avec en clé le nom de la nomenclature et en valeur l'url",
    visualizeButtonLabel: 'Visualiser',
    readonlyLabel: 'Lecture seule',
  },
  envValuesMessage: {
    envVariables: "Les variables d'environnements",
  },
}
