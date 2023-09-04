import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { type RoutingStrategy, createRouter } from "./ui/routing/createRouter";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injectLegacyEntryQueens } from "core/injectLegacyQueens";
import { createAuthProvider } from "ui/auth";
import { ApiClientProvider } from "ui/api/context";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
});

const { AuthProvider } = createAuthProvider({
  authType: import.meta.env.VITE_AUTH_TYPE,
  keycloakUrl: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  origin: undefined
});

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}) => {

  console.log("Mount Drama Queen")
  //injectLegacyEntryQueens();

  const router = createRouter({ strategy: routingStrategy, initialPathname });
  const root = createRoot(mountPoint);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ApiClientProvider apiUrl={import.meta.env.VITE_QUEEN_API_URL}>
          <RouterProvider router={router} />
        </ApiClientProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );

  return () => queueMicrotask(() => root.unmount());
};

export { mount };