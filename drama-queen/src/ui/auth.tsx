import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Oidc } from "core/keycloakClient/Oidc";
import { createKeycloakClient } from "core/keycloakClient/createKeycloakClient";
import { dummyOidcClient } from "core/keycloakClient/dummyOidcClient";
import { assert } from "tsafe/assert";

const context = createContext<Oidc | undefined>(undefined);

export function useOidc() {
  const value = useContext(context);
  if (value === undefined) throw new Error("You must wrap your component inside AuthProvider");
  return value;
}

export function useLoggedInOidc(): Oidc.LoggedIn {

  const oidc = useOidc();

  assert(oidc.isUserLoggedIn, "Must wrap in <Authenticated /> provider to use this hook");

  return oidc;

}

export function RequiresAuthentication(props:
  { children: ReactNode }) {

  const { children } = props
  const oidc = useOidc();

  if (!oidc.isUserLoggedIn) {
    oidc.login();
    return null;
  }

  return <>{children}</>
}


export function createAuthProvider(params: {
  isMock: true;
} | {
  isMock: false;
  keycloakUrl: string;
  clientId: string;
  realm: string;
  origin: string;
}
) {

  const prOidc = params.isMock ?
    Promise.resolve(dummyOidcClient) :
    createKeycloakClient({
      url: params.keycloakUrl,
      clientId: params.clientId,
      realm: params.realm,
      origin: params.origin
    });

  function AuthProvider(props: { fallback?: ReactNode; children: ReactNode; }) {
    const { fallback = null, children } = props;

    const [oidc, setOidc] = useState<Oidc | undefined>(undefined);

    useEffect(
      () => {

        let isActive = true;

        prOidc.then(oidc => {

          if (!isActive) return;

          setOidc(oidc);

        });

        return () => { isActive = false; }

      },
      []
    );

    if (oidc === undefined) return fallback;
    return <context.Provider value={oidc}>{children}</context.Provider>

  }

  return { AuthProvider };

}