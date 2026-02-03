import { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import { getTranslation } from '@/i18n'

import { ErrorPage } from '../pages/error/Error'

const { t } = getTranslation('errorMessage')

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: () => <ErrorPage error={new Error(t('404'))} />,
})
