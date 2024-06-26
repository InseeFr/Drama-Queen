import axios, { AxiosError } from 'axios'
import { handleAxiosError } from './axiosError'

/**
 *
 * @param params: { url : string}
 * @returns {Promise<T>} fetched data of type T or undefined if the request fails.
 */
export async function fetchUrl<T>(params: { url: string }) {
  const { url } = params
  return axios
    .get<T>(decodeURIComponent(url))
    .then(({ data }) => data)
    .catch((error) => {
      console.error(`An error occured, we could not retrieve ${url}`, error)
      if (!(error instanceof AxiosError)) throw error
      throw handleAxiosError(error)
    })
}
