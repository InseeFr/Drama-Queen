import axios from 'axios'

import type { VisualizeClient } from '@/core/ports/VisualizeClient'

export function createVisualizeClient(): VisualizeClient {
  return {
    get: <T>(url: string) =>
      axios.get<T>(decodeURIComponent(url)).then(({ data }) => data),
  }
}
