import { Oidc } from "core/keycloakClient/Oidc";
import { QueenApi } from "core/queenApi/QueenApi";
import { createApiClient } from "core/queenApi/createApiClient";
import { createMockApiClient } from "core/queenApi/createMockApiClient";
import { ReactNode, createContext, useContext, useMemo, useRef } from "react";
import { useOidc } from "ui/auth";
import { useGuaranteedMemo } from "ui/tools/useGuaranteedMemo";

const context = createContext<QueenApi | undefined>(undefined);

export function useQueenApi() {
  const queenApi = useContext(context);
  if (queenApi === undefined) throw new Error("This hook can not be used outside ApiProvider children")
  return queenApi;
}


export function createQueenApiProvider(
  params: {
    apiUrl?: string;
  }
) {

  const { apiUrl } = params;

  function QueenApiProvider(props: {
    children: ReactNode;
  }) {
    const { children } = props;

    const oidc = useOidc()

    const apiClient = useGuaranteedMemo(() =>
      apiUrl
        ? createApiClient({
          apiUrl: apiUrl,
          getAccessToken: () => oidc.isUserLoggedIn ? oidc.getAccessToken() : null
        })
        : createMockApiClient(),
      []
    );

    return <context.Provider value={apiClient}>{children}</context.Provider>;
  }

  return { QueenApiProvider };

}

