import { createFileRoute } from '@tanstack/react-router'

import { protectedRouteLoader } from '@/routes/routing/loader'

import { DisplayEnvValues } from './index'

export const Route = createFileRoute('/_layout/env')({
    component: DisplayEnvValues,
    loader: protectedRouteLoader,
})