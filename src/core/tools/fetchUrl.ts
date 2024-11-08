import axios from 'axios'

/**
 *
 * @param params: { url : string}
 * @returns {Promise<T>} fetched data of type T.
 */
export async function fetchUrl<T>(params: { url: string }): Promise<T> {
  const { url } = params
  return axios.get<T>(decodeURIComponent(url)).then(({ data }) => data)
}
