import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { createCoreProvider } from 'core'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { createRouter, type RoutingStrategy } from 'ui/routing/createRouter'
import { unsubscribeOldSW } from 'unsubscribe_old_sw'

const { CoreProvider, prCore } = createCoreProvider({
  apiUrl: import.meta.env.VITE_QUEEN_API_URL,
  publicUrl: import.meta.env.BASE_URL,
  oidcParams: {
    issuerUri: import.meta.env.VITE_OIDC_ISSUER,
    clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  },
})

const CenteredSpinner = () => (
  <Stack alignItems="center" justifyContent="center" height="100vh">
    <CircularProgress size={'5em'} />
  </Stack>
)

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

	// unsubscribe to old SW
	unsubscribeOldSW()

  const router = createRouter({ strategy: routingStrategy, initialPathname })
  const root = createRoot(mountPoint)
  root.render(
    <CoreProvider fallback={<CenteredSpinner />}>
      <RouterProvider router={router} />
    </CoreProvider>
  )

  return () => queueMicrotask(() => root.unmount())
}

export { mount, prCore }
