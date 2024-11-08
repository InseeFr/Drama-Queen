import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { unsubscribeOldSW } from 'unsubscribe_old_sw'
import { CoreProvider } from 'createCore'
import { createRouter, type RoutingStrategy } from 'ui/routing/createRouter'
import { EXTERNAL_RESOURCES_URL } from 'core/constants'

const CenteredSpinner = () => (
  <Stack alignItems="center" justifyContent="center" height="100vh">
    <CircularProgress size={'5em'} />
  </Stack>
)

const mountExternalResources = (externalResourcesUrl: string) => {
  console.log('Mount External resources')
  const script = document.createElement('script')
  script.src = `${externalResourcesUrl}/entry.js`
  document.body.appendChild(script)
}

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

  if (EXTERNAL_RESOURCES_URL) mountExternalResources(EXTERNAL_RESOURCES_URL)

  const router = createRouter({ strategy: routingStrategy, initialPathname })
  const root = createRoot(mountPoint)
  root.render(
    <CoreProvider fallback={<CenteredSpinner />}>
      <RouterProvider router={router} />
    </CoreProvider>
  )

  return () => queueMicrotask(() => root.unmount())
}

export { mount }
