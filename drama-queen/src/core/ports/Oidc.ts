export declare type Oidc = Oidc.LoggedIn | Oidc.NotLoggedIn

export declare namespace Oidc {
  export type Common = {
    params: {
      issuerUri: string
      clientId: string
    }
  }

  export type NotLoggedIn = Common & {
    isUserLoggedIn: false
    login: () => Promise<never>
  }

  export type LoggedIn = Common & {
    isUserLoggedIn: true
    renewTokens(): Promise<void>
    getTokens: () => Tokens
    logout: () => Promise<never>
  }

  export type Tokens = {
    accessToken: string
    idToken: string
    refreshToken: string
    refreshTokenExpirationTime: number
  }
}
