import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import { Collect } from '@/routes/pages/collect/Collect'
import { DisplayEnvValues } from '@/routes/pages/env/DisplayEnvValues'
import { ErrorPage } from '@/routes/pages/error/Error'
import { ExternalRessources } from '@/routes/pages/external/External'
import { PartialReset } from '@/routes/pages/reset/PartialReset'
import { Review } from '@/routes/pages/review/Review'
import { SynchronizeData } from '@/routes/pages/synchronize/SynchronizeData'
import { SynchronizeInterrogation } from '@/routes/pages/synchronize/SynchronizeInterrogation'
import { Visualize } from '@/routes/pages/visualize/Visualize'

import { Layout } from './Layout'
import {
  collectLoader,
  protectedRouteLoader,
  reviewLoader,
  visualizeLoader,
} from './loader'

const getChildrenRoutes = () => {
  const baseRoutes = [
    {
      path: '/env',
      Component: DisplayEnvValues,
      loader: protectedRouteLoader,
    },
    {
      path: '/visualize',
      Component: Visualize,
      loader: visualizeLoader,
    },
    {
      path: '/reset',
      Component: PartialReset,
    },
    {
      path: '/synchronize',
      Component: SynchronizeData,
      loader: protectedRouteLoader,
    },
    {
      path: '/interrogations/:interrogationId',
      Component: Collect, // This route do not contains UI components, all things are done in loader, if not there is an error
      loader: collectLoader,
    },
    {
      path: '/interrogations/:interrogationId/synchronize',
      Component: SynchronizeInterrogation,
      loader: protectedRouteLoader,
    },
    {
      path: `/review/interrogations/:interrogationId`,
      Component: Review,
      loader: reviewLoader,
    },
  ]

  if (!EXTERNAL_RESOURCES_URL) return baseRoutes

  return [
    {
      path: '/gide/*',
      Component: ExternalRessources,
    },
    ...baseRoutes,
  ]
}

export const routes = [
  {
    path: '/',
    Component: Layout,
    errorElement: <ErrorPage />,
    children: getChildrenRoutes(),
  },
]
