import { createRoot } from 'react-dom/client'
import { type RoutingStrategy, createRouter } from 'ui/routing/createRouter'
import { injectLegacyEntryQueens } from 'core/injectLegacyQueens'
import CircularProgress from '@mui/material/CircularProgress'
import { createCoreProvider } from 'core'
import { RouterProvider } from 'react-router-dom'

const { CoreProvider, prCore } = createCoreProvider({
  apiUrl: import.meta.env.VITE_QUEEN_API_URL,
  publicUrl: import.meta.env.BASE_URL,
  oidcParams: {
    issuerUri: import.meta.env.VITE_OIDC_ISSUER,
    clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  },
})

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement
  initialPathname?: string
  routingStrategy?: RoutingStrategy
}) => {
  console.log('Mount Drama Queen')
  //injectLegacyEntryQueens();

  const router = createRouter({ strategy: routingStrategy, initialPathname })
  const root = createRoot(mountPoint)
  root.render(
    <CoreProvider fallback={<CircularProgress />}>
      <RouterProvider router={router} />
    </CoreProvider>
  )

  return () => queueMicrotask(() => root.unmount())
}

export { mount, prCore }
