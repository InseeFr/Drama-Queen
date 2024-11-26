import axios from 'axios'

export async function fetchUrl<T>(params: { url: string }): Promise<T> {
  const { url } = params
  return axios.get<T>(decodeURIComponent(url)).then(({ data }) => data)
}
