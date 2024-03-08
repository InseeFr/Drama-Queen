import { errorMessage } from './errorMessage'
import { modalsMessage } from './modalsMessage'
import { navigationMessage } from './navigationMessage'
import { synchronizeMessage } from './synchronizeMessage'
import { visualizeMessage } from './visualizeMessage'

export const dictionary = {
  envVariables: {
    fr: "Les variables d'environnements",
    en: 'Environment variables',
  },

  ...errorMessage,
  ...modalsMessage,
  ...navigationMessage,
  ...synchronizeMessage,
  ...visualizeMessage,
} as const

export type Dictionary = typeof dictionary
export type DictionaryLang = 'fr' | 'en'
