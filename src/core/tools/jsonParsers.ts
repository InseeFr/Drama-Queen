export function parseJSON<T = unknown>(value: string, fallback: T): T {
  if (!value) {
    return fallback
  }
  try {
    return JSON.parse(value) as T
  } catch {
    try {
      return JSON.parse(decodeURIComponent(value)) as T
    } catch {
      return fallback
    }
  }
}

export function parseNomenclatureInput(
  value: string,
): Record<string, string> | null {
  if (!value) {
    return null
  }

  const parsed = parseJSON<
    Record<string, string> | Array<Record<string, string> | string> | null
  >(value, null)

  if (parsed) {
    if (Array.isArray(parsed)) {
      return parsed.reduce<Record<string, string>>((acc, item) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(acc, item)
        } else if (typeof item === 'string') {
          const colonIndex = item.indexOf(':')

          if (colonIndex !== -1) {
            acc[item.slice(0, colonIndex).trim()] = item
              .slice(colonIndex + 1)
              .trim()
          } else {
            acc[item] = item
          }
        }

        return acc
      }, {})
    }

    return parsed
  }

  const normalized = value
    .trim()
    .replace(/^\[/, '{')
    .replace(/\]$/, '}')
    .replace(/'/g, '"')

  try {
    return JSON.parse(normalized) as Record<string, string>
  } catch {
    return null
  }
}
