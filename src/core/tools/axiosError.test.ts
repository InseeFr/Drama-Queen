import { AxiosError } from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { handleAxiosError } from './axiosError'

vi.mock('@/i18n', () => ({
  getTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

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
    expect(result.message).toBe('400')
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
    expect(result.message).toBe('401')
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
    expect(result.message).toBe('longUnknownError')
  })
})
