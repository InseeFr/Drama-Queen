import type { Oidc } from 'oidc-spa'
import { describe, expect, it, vi } from 'vitest'

import { thunks } from './userAuthentication'

describe('userAuthentication thunks', () => {
  describe('loginIfNotLoggedIn', () => {
    it('should do nothing if the user is already logged in', async () => {
      const mockGetOidc = vi.fn(() =>
        Promise.resolve({
          isUserLoggedIn: true,
          login: vi.fn(),
        } as unknown as Oidc),
      )

      await thunks.loginIfNotLoggedIn()(
        null as any,
        null as any,
        {
          getOidc: mockGetOidc,
        } as any,
      )

      expect(mockGetOidc).toHaveBeenCalled()
      expect(
        (await mockGetOidc.mock.results[0].value).login,
      ).not.toHaveBeenCalled()
    })

    it('should call login if the user is not logged in', async () => {
      const mockLogin = vi.fn()

      const mockGetOidc = vi.fn(() =>
        Promise.resolve({
          isUserLoggedIn: false,
          login: mockLogin,
        } as unknown as Oidc),
      )

      await thunks.loginIfNotLoggedIn()(
        null as any,
        null as any,
        {
          getOidc: mockGetOidc,
        } as any,
      )

      expect(mockGetOidc).toHaveBeenCalled()
      expect(mockLogin).toHaveBeenCalled()
    })
  })
})
