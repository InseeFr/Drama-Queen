import { DisplayEnvValues } from 'ui/pages/env'
import { Collect } from 'ui/pages/collect'
import { SynchronizeData } from 'ui/pages/synchronize'
import { Layout } from './Layout'
import { Visualize } from 'ui/pages/visualize/Visualize'
import {
  protectedRouteLoader,
  surveyUnitLoader,
  visualizeLoader,
  collectLoader,
  reviewLoader,
} from './loader'
import { Review } from 'ui/pages/review/Review'
import { ErrorPage } from 'ui/pages/Error/Error'
import { ExternalRessources } from 'ui/pages/External/External'

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
      path: '/survey-unit/:surveyUnitId',
      Component: ErrorPage, // This route do not contains UI components, all things are done in loader, if not there is an error
      loader: surveyUnitLoader,
    },
    {
      path: `/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
      Component: Collect,
      loader: collectLoader,
    },
    {
      path: `/readonly/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
      Component: Review,
      loader: reviewLoader,
    },
  ]

  if (!import.meta.env.VITE_EXTERNAL_RESOURCES_URL) return baseRoutes

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
