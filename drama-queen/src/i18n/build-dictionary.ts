import {
  dictionary,
  type Dictionary,
  type DictionaryLang,
} from 'i18n/dictionary'

const getTranslation = (
  key: keyof Dictionary,
  lang: DictionaryLang,
  params?: any
) => {
  const translation = dictionary[key][lang] ?? dictionary[key]['fr'] ?? key
  if (typeof translation === 'function') {
    return translation(params)
  }
  return translation
}

const possibleLanguages: DictionaryLang[] = ['fr', 'en']

const language = (() => {
  const userLang = navigator.language.split('-')[0] as DictionaryLang
  return possibleLanguages.includes(userLang) ? userLang : 'fr'
})()

export const t = (key: keyof Dictionary, params?: any): string => {
  return getTranslation(key, language, params)
}
