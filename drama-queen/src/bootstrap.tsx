import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { unsubscribeOldSW } from 'unsubscribe_old_sw'
import { CoreProvider } from 'createCore'
import { createRouter, type RoutingStrategy } from 'ui/routing/createRouter'

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

const mountExternalResources = (externalResourcesUrl: string) => {
  console.log('Mount External resources')
  const script = document.createElement('script')
  script.src = `${externalResourcesUrl}/entry.js`
  document.body.appendChild(script)
}

export { mount, mountExternalResources }
