import type { GenericTranslations } from 'i18nifty'

import type {
  envValuesMessage,
  errorMessage,
  modalMessage,
  navigationMessage,
  synchronizeMessage,
  visualizeMessage,
} from './componentKeys'
import type { Language, fallbackLanguage } from './i18n'

export type ErrorMessage =
  | 'error'
  | 'errorOccured'
  | '400'
  | '401'
  | '403'
  | '404'
  | '500'
  | '502'
  | '503'
  | '504'
  | 'shortUnknownError'
  | 'longUnknownError'
  | 'surveyUnitNotRetrievable'
  | { K: 'surveyUnitNotFound'; P: { surveyUnitId: string } }
  | 'lunaticModelVersionNotFound'
  | 'questionnaireNotCompatible'
  | { K: 'surveyUnitQuestionnaireNotFound'; P: { surveyUnitId: string } }
  | { K: 'questionnaireNotFound'; P: { questionnaireId: string } }
  | {
      K: 'wrongQuestionnaire'
      P: { surveyUnitId: string; questionnaireId: string }
    }
  | 'surveyUnitUnauthorized'
  | 'externalResourcesLoadedError'

export type ModalMessage =
  | 'reviewQuitTitle'
  | 'reviewQuitContent'
  | 'temporaryQuitTitle'
  | 'temporaryQuitContent'
  | 'temporaryQuitValidate'
  | 'definitiveQuitTitle'
  | 'definitiveQuitContent'
  | 'definitiveQuitValidate'
  | 'welcomeModalTitle'
  | 'welcomeModalContent'
  | 'welcomeModalFirstPage'
  | 'welcomeModalGoBack'
  | 'cancel'

export type NavigationMessage =
  | 'goToSequence'
  | 'goToSubSequence'
  | 'goTo'
  | 'continueHelper'
  | 'previousHelper'
  | 'nextHelper'
  | 'backToQuestionnaireStart'
  | 'temporaryQuestionnaireStop'
  | 'definitiveQuestionnaireStop'
  | 'questionnaireStopNature'
  | 'back'
  | 'surveyButton'
  | 'stopButton'
  | 'pageNumber'
  | 'validateAndQuit'
  | 'quit'
  | 'fastForward'
  | 'continue'
  | 'dontKnowButtonLabel'
  | 'shortCutNextLabel'

export type SynchronizeMessage =
  | 'synchronizationInProgress'
  | 'downloadingData'
  | 'surveyUnitsProgress'
  | 'questionnairesProgress'
  | 'nomenclaturesProgress'
  | 'externalResourcesProgress'
  | 'uploadingData'

export type VisualizeMessage =
  | 'visualizePage'
  | 'inputSurveyLabel'
  | 'inputSurveyHelper'
  | 'inputDataLabel'
  | 'inputDataHelper'
  | 'inputNomenclatureLabel'
  | 'inputNomenclatureHelper'
  | 'visualizeButtonLabel'
  | 'readonlyLabel'

export type EnvValuesMessage = 'envVariables'

export type ComponentKey =
  | typeof errorMessage
  | typeof modalMessage
  | typeof navigationMessage
  | typeof synchronizeMessage
  | typeof visualizeMessage
  | typeof envValuesMessage

export type Translations<L extends Language> = GenericTranslations<
  ComponentKey,
  Language,
  typeof fallbackLanguage,
  L
>
