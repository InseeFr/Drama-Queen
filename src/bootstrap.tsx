import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'

import { CenteredSpinner } from '@/components/ui/CenteredSpinner'
import { CoreProvider } from '@/createCore'
import {
  type RoutingStrategy,
  createRouter,
} from '@/routes/routing/createRouter'
import { unsubscribeOldSW } from '@/unsubscribe_old_sw'
import { setParentGetAccessToken, type GetAccessToken } from './core/sharedAuth'

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
  getAccessToken
}: {
  mountPoint: HTMLElement
  initialPathname?: string
  routingStrategy?: RoutingStrategy
  getAccessToken?: GetAccessToken
}) => {
  console.log('Mount Drama Queen')

  console.log("parent acess token", getAccessToken)

  setParentGetAccessToken(getAccessToken)

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
