import { declareComponentKeys } from 'i18nifty'
import type {
  EnvValuesMessage,
  ErrorMessage,
  ModalMessage,
  NavigationMessage,
  SynchronizeMessage,
  VisualizeMessage,
} from './types'

export const { i18n: errorMessage } =
  declareComponentKeys<ErrorMessage>()('errorMessage')

export const { i18n: modalMessage } =
  declareComponentKeys<ModalMessage>()('modalMessage')

export const { i18n: navigationMessage } =
  declareComponentKeys<NavigationMessage>()('navigationMessage')

export const { i18n: synchronizeMessage } =
  declareComponentKeys<SynchronizeMessage>()('synchronizeMessage')

export const { i18n: visualizeMessage } =
  declareComponentKeys<VisualizeMessage>()('visualizeMessage')

export const { i18n: envValuesMessage } =
  declareComponentKeys<EnvValuesMessage>()('envValuesMessage')
