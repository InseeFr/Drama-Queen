import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Oidc } from "core/keycloakClient/Oidc";
import { createKeycloakClient } from "core/keycloakClient/createKeycloakClient";
import { dummyOidcClient } from "core/keycloakClient/dummyOidcClient";
import { assert, type Equals } from "tsafe/assert";


const context = createContext<Oidc | undefined>(undefined);

export function useAuthContext() {
  const value = useContext(context);
  if (value === undefined) throw new Error("You must wrap your component inside AuthProvider");
  return value;
}

export function useAccessToken() {
  const value = useContext(context);
  if (!value?.isUserLoggedIn) return null;
  return value.getAccessToken();
}

export function createAuthProvider(params: {
  authType: "OIDC" | "DUMMY";
  keycloakUrl: string;
  clientId: string;
  realm: string;
  origin: string | undefined;
}) {

  const {
    authType,
    keycloakUrl,
    clientId,
    realm,
    origin = window.location.origin + import.meta.env.BASE_URL
  } = params;

  const prOidc = (() => {
    switch (authType) {
      case "OIDC":
        return createKeycloakClient({ url: keycloakUrl, clientId, realm, origin });
      case "DUMMY":
        return Promise.resolve(dummyOidcClient);
    }
    assert<Equals<typeof authType, never>>(false);
  })();

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