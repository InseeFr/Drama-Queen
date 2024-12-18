import { createI18nApi, declareComponentKeys } from 'i18nifty'

import type { ComponentKey } from './types'

export { declareComponentKeys }

const languages = ['fr', 'en'] as const

export const fallbackLanguage = 'fr'

export type Language = (typeof languages)[number]

export const {
  useTranslation,
  resolveLocalizedString,
  useLang,
  $lang,
  useResolveLocalizedString,
  /** For use outside of React */
  getTranslation,
} = createI18nApi<ComponentKey>()(
  {
    languages,
    fallbackLanguage,
  },
  {
    en: () => import('./resources/en').then(({ translations }) => translations),
    fr: () => import('./resources/fr').then(({ translations }) => translations),
  },
)
