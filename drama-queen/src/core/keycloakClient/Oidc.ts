export declare type Oidc = Oidc.LoggedIn | Oidc.NotLoggedIn;

export declare namespace Oidc {
  export type NotLoggedIn = {
    isUserLoggedIn: false;
    login: () => Promise<never>;
  };

  export type LoggedIn = {
    isUserLoggedIn: true;
    renewToken(): Promise<void>;
    getAccessToken: () => string;
  };
}

export type KeycloakParams = {
  url: string;
  realm: string;
  origin?: string;
  clientId: string;
  log?: typeof console.log;
};
