import { AxiosError } from 'axios'
import { describe, expect, it } from 'vitest'

import { handleAxiosError } from './axiosError'

describe('handleAxiosError', () => {
  it('should return a custom message for no response', () => {
    const error: AxiosError = {
      message: '',
      name: '',
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
      response: undefined,
    } as AxiosError

    const result = handleAxiosError(error)
    expect(result.message).toBe(
      "Une erreur s'est produite lors du traitement de la requête. Veuillez réessayer plus tard.",
    )
  })

  it('should return the correct message for status 400', () => {
    const error: AxiosError = {
      response: { status: 400 } as any,
      message: '',
      name: '',
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
    } as AxiosError

    const result = handleAxiosError(error)
    expect(result.message).toBe('Invalid request.')
  })

  it('should return the correct message for status 401', () => {
    const error: AxiosError = {
      response: { status: 401 } as any,
      message: '',
      name: '',
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
    } as AxiosError

    const result = handleAxiosError(error)
    expect(result.message).toBe(
      'You are not logged in. Please log in to access this resource.',
    )
  })

  it('should return the correct message for unknown status', () => {
    const error: AxiosError = {
      response: { status: 999 } as any,
      message: '',
      name: '',
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
    } as AxiosError

    const result = handleAxiosError(error)
    expect(result.message).toBe(
      'An unknown error has occurred, please contact support or try again later.',
    )
  })
})
