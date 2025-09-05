import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import { Collect } from '@/routes/pages/collect/Collect'
import { DisplayEnvValues } from '@/routes/pages/env/DisplayEnvValues'
import { ErrorPage } from '@/routes/pages/error/Error'
import { ExternalRessources } from '@/routes/pages/external/External'
import { Review } from '@/routes/pages/review/Review'
import { SynchronizeData } from '@/routes/pages/synchronize/SynchronizeData'
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
      path: '/synchronize',
      Component: SynchronizeData,
      loader: protectedRouteLoader,
    },
    {
      path: '/interrogations/:surveyUnitId',
      Component: Collect, // This route do not contains UI components, all things are done in loader, if not there is an error
      loader: collectLoader,
    },
    {
      path: `/review/interrogations/:surveyUnitId`,
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
