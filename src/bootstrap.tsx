import { RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'

import { CenteredSpinner } from '@/components/ui/CenteredSpinner'
import { CoreProvider } from '@/createCore'
import {
  type RoutingStrategy,
  createRouter,
} from '@/routes/routing/createRouter'
import { unsubscribeOldSW } from '@/unsubscribe_old_sw'

const mount = ({
  mountPoint,
  routingStrategy,
}: {
  mountPoint: HTMLElement
  routingStrategy?: RoutingStrategy
}) => {
  console.log('Mount Drama Queen')

  // unsubscribe to old SW
  unsubscribeOldSW()

  const router = createRouter({ strategy: routingStrategy })
  const root = createRoot(mountPoint)
  root.render(
    <CoreProvider fallback={<CenteredSpinner />}>
      <RouterProvider router={router} />
    </CoreProvider>,
  )

  return () => queueMicrotask(() => root.unmount())
}

export { mount }
