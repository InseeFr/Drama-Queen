import { DisplayEnvValues } from 'ui/pages/env'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
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

export const routes = [
  {
    path: '/',
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
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
    ],
  },
]
