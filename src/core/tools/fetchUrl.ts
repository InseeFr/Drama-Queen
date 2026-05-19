import axios from 'axios'

export async function fetchUrl<T>(params: {
  url: string
  headers?: Record<string, string>
}): Promise<T> {
  const { url, headers } = params
  return axios
    .get<T>(decodeURIComponent(url), { headers })
    .then(({ data }) => data)
}
