import type { Translations } from '../types'
import { lunaticModelVersionBreaking } from 'core/tools/SurveyModelBreaking'

export const translations: Translations<'en'> = {
  errorMessage: {
    '400': 'Invalid request.',
    '401': 'You are not logged in. Please log in to access this resource.',
    '403': 'You are not authorized to access the requested data.',
    '404': 'Resource(s) not found.',
    '500': 'Internal server error.',
    '502': 'Bad gateway.',
    '503': 'Service unavailable.',
    '504': 'Gateway timeout.',
    error: 'Error',
    errorOccured: 'An error has occured',
    shortUnknownError: 'Unknown error',
    longUnknownError:
      'An unknown error has occurred, please contact support or try again later.',
    surveyUnitNotRetrievable:
      'An error occurred while retrieving the survey unit.',
    surveyUnitNotFound: ({ surveyUnitId }) =>
      `Survey unit ${surveyUnitId} not found.`,
    lunaticModelVersionNotFound:
      'The questionnaire has no lunaticModelVersion field',
    questionnaireNotCompatible: `The questionnaire is not compatible. The 'lunaticModelVersion' must be higher than ${lunaticModelVersionBreaking}`,
    questionnaireNotFound: ({ questionnaireId }) =>
      `Unable to retrieve questionnaire ${questionnaireId}.`,
    wrongQuestionnaire: ({ surveyUnitId, questionnaireId }) =>
      `The survey unit ${surveyUnitId} is not associated with the questionnaire ${questionnaireId}.`,
    surveyUnitUnauthorized:
      'You are not authorized to access data from this survey unit.',
  },
  modalMessage: {
    reviewQuitTitle: 'Leaving the questionnaire',
    reviewQuitContent:
      'If you wish to exit the questionnaire, please close the current tab.',
    temporaryQuitTitle: 'Temporary interruption',
    temporaryQuitContent: 'You are about to leave the questionnaire',
    temporaryQuitValidate: 'Confirm',
    definitiveQuitTitle: 'Definitive stop',
    definitiveQuitContent:
      'Do you confirm the definitive stop of the questionnaire ?',
    definitiveQuitValidate: 'Confirm definitive stop',
    welcomeModalTitle: 'Welcome',
    welcomeModalContent:
      'You have already started filling out the questionnaire. Would you like to resume where you left off or return to the first page ?',
    welcomeModalFirstPage: 'Return to the first page',
    welcomeModalGoBack: 'Resume where I left off',
    cancel: 'Cancel',
  },
  navigationMessage: {
    goToSequence: 'Go to sequence',
    goToSubSequence: 'Go to subsequence',
    goTo: 'Go to ...',
    continueHelper: 'press',
    previousHelper: 'PREV.',
    nextHelper: 'NEXT',
    backToQuestionnaireStart: 'Back to questionnaire start',
    temporaryQuestionnaireStop: 'Temporary interruption of the interview',
    definitiveQuestionnaireStop:
      'Definitive end to interview (refusal, unable to continue, etc.)',
    questionnaireStopNature: 'What is the nature of the stop?',
    back: 'Back',
    surveyButton: 'Survey',
    stopButton: 'Stop',
    pageNumber: 'page n°',
    validateAndQuit: 'Validate and quit',
    quit: 'Quit',
    fastForward: 'Continuation of the interview',
    continue: 'Continue',
    dontKnowButtonLabel: "Don't know",
    shortCutNextLabel: 'alt + ENTER',
  },
  synchronizeMessage: {
    synchronizationInProgress: 'Synchronization in progress',
    downloadingData: 'Downloading data...',
    surveyUnitsProgress: 'Survey units',
    questionnairesProgress: 'Questionnaires',
    nomenclaturesProgress: 'Nomenclatures',
    uploadingData: 'Sending data...',
  },
  visualizeMessage: {
    visualizePage: 'Questionnaire viewer page',
    inputSurveyLabel: 'Questionnaire',
    inputSurveyHelper: 'The url of a Lunatic-model questionnaire json',
    inputDataLabel: 'Data',
    inputDataHelper: 'The url of a data (response) json',
    inputNomenclatureLabel: 'Dictionary of nomenclatures',
    inputNomenclatureHelper:
      'Dictionary with nomenclature name as key and url as value',
    visualizeButtonLabel: 'Visualize',
    readonlyLabel: 'Read-only',
  },
  envValuesMessage: {
    envVariables: 'Environment variables',
  },
}
