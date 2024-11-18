import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { unsubscribeOldSW } from 'unsubscribe_old_sw'
import { CoreProvider } from 'createCore'
import { createRouter, type RoutingStrategy } from 'ui/routing/createRouter'
import { CenteredSpinner } from 'ui/components/CenteredSpinner'

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

export { mount }
