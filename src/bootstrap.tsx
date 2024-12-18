import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { CoreProvider } from '@/createCore'
import { CenteredSpinner } from '@/ui/components/CenteredSpinner'
import { type RoutingStrategy, createRouter } from '@/ui/routing/createRouter'
import { unsubscribeOldSW } from '@/unsubscribe_old_sw'

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
    </CoreProvider>,
  )

  return () => queueMicrotask(() => root.unmount())
}

export { mount }
