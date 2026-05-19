import axios, { AxiosError } from 'axios'

import type { VisualizeClient } from '@/core/ports/VisualizeClient'
import { handleAxiosError } from '@/core/tools/axiosError'

export function createVisualizeClient(params: {
  getAccessToken: () => Promise<string | undefined>
}): VisualizeClient {
  const { getAccessToken } = params

  const axiosInstance = axios.create()

  // Type issue https://github.com/axios/axios/issues/5494
  const onRequest = async (config: any) => {
    const accessToken = await getAccessToken()

    return {
      ...config,
      headers: {
        ...config.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  }

  const trustedDomains: string[] = (
    import.meta.env.VITE_TRUST_URI_DOMAINS ?? ''
  )
    .split(',')
    .map((d: string) => d.trim())
    .filter(Boolean)

  const isUriAuthorized = (url: string): boolean => {
    try {
      const { hostname } = new URL(url)
      return trustedDomains.some(
        (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
      )
    } catch {
      return false
    }
  }

  const onDomainCheck = (config: any) => {
    if (!isUriAuthorized(config.url ?? '')) {
      return Promise.reject(
        new Error(`Request to untrusted domain: ${config.url}`),
      )
    }
    return config
  }

  axiosInstance.interceptors.request.use(onRequest)

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!(error instanceof AxiosError)) {
        return Promise.reject(error)
      }
      return Promise.reject(handleAxiosError(error))
    },
  )
  axiosInstance.interceptors.request.use(onDomainCheck)

  return {
    get: <T>(url: string) =>
      axiosInstance.get<T>(decodeURIComponent(url)).then(({ data }) => data),
  }
}
