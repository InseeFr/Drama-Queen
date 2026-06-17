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
