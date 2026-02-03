import { createFileRoute } from '@tanstack/react-router'

import { protectedRouteLoader } from '@/core/loader'

import { SynchronizeData } from './index'

export const Route = createFileRoute('/_layout/synchronize')({
  component: SynchronizeData,
  loader: protectedRouteLoader,
})
