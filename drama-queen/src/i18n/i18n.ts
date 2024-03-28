import { createI18nApi, declareComponentKeys } from 'i18nifty'
import type { ComponentKey, Language } from './types'
export { declareComponentKeys }

export const languages: Language[] = ['fr', 'en']

export const fallbackLanguage: Language = 'fr'

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
  }
)
