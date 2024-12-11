export declare type Oidc = Oidc.LoggedIn | Oidc.NotLoggedIn

export declare namespace Oidc {
  export type NotLoggedIn = {
    isUserLoggedIn: false
    login: () => Promise<never>
  }

  export type LoggedIn = {
    isUserLoggedIn: true
    logout: () => Promise<never>
    getTokens: () => Tokens
  }

  export type Tokens = {
    accessToken: string
    idToken: string
    refreshToken: string
    refreshTokenExpirationTime: number
  }
}
