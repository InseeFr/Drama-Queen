import { createFileRoute } from '@tanstack/react-router'

import { protectedRouteLoader } from '@/routes/routing/loader'

import { SynchronizeInterrogation } from './index'

export const Route = createFileRoute(
  '/_layout/interrogations/$interrogationId/synchronize',
)({
  component: SynchronizeInterrogation,
  loader: protectedRouteLoader,
})
