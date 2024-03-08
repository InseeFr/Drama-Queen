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

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type AbstractDictionary<T> = {
  [Key in keyof T]: {
    [Lang in DictionaryLang]: string
  }
}
