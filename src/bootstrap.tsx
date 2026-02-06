import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'

import { CenteredSpinner } from '@/components/ui/CenteredSpinner'
import { CoreProvider } from '@/createCore'
import {
  type RoutingStrategy,
  createRouter,
} from '@/routes/routing/createRouter'
import { unsubscribeOldSW } from '@/unsubscribe_old_sw'
import '@/main.css'
import { StyledEngineProvider } from '@mui/material/styles'

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
    <StyledEngineProvider enableCssLayer>
      <CoreProvider fallback={<CenteredSpinner />}>
        <RouterProvider router={router} />
      </CoreProvider>
    </StyledEngineProvider>
  )

  return () => queueMicrotask(() => root.unmount())
}

export { mount }
