import type { PageTag } from '../model'

export function isPageTag(val: string): val is PageTag {
  const isNumberOnly = /^\d+$/.test(val) // matches `${number}`
  const isComplexFormat = /^\d+\.\d+#\d+$/.test(val) // matches `${number}.${number}#${number}`
  return isNumberOnly || isComplexFormat
}
