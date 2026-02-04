import { createFileRoute } from '@tanstack/react-router'

import { protectedRouteLoader } from '@/core/loader'

import { DisplayEnvValues } from './index'

export const Route = createFileRoute('/_layout/env')({
  component: DisplayEnvValues,
  loader: protectedRouteLoader,
})
