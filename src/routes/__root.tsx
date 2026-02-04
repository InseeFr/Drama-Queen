import { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import i18n from '@/libs/i18n'

import { ErrorPage } from '../pages/error/Error'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <ErrorPage error={new Error(i18n.t('error.errorCode.404'))} />
  ),
})
