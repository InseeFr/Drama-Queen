import { createFileRoute } from '@tanstack/react-router'

import { protectedRouteLoader } from '@/core/loader'

import { SynchronizeInterrogation } from './index'

export const Route = createFileRoute(
  '/_layout/interrogations/synchronize/$interrogationId',
)({
  component: SynchronizeInterrogation,
  loader: protectedRouteLoader,
})
