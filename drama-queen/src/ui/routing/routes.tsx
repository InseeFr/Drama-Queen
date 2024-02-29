import { DisplayEnvValues } from 'ui/pages/env'
import { READ_ONLY } from 'ui/constants'
import type { RouteObject } from 'react-router-dom'
import { Collect } from 'ui/pages/collect'
import { SynchronizeData } from 'ui/pages/synchronize'
import { Layout } from './Layout'
import { Visualize } from 'ui/pages/visualize/Visualize'
import { Orchestrator } from 'ui/components/orchestrator/Orchestrator'
import {
  protectedRouteLoader,
  surveyUnitLoader,
  visualizeLoader,
  collectLoader,
  reviewLoader,
} from './loader'
import { SurveyUnitMapping } from 'ui/pages/surveyUnit'
import { Review } from 'ui/pages/review/Review'

//ReadOnly path is a bad pattern must be change (affects pearl,moog,queen)
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
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
        Component: SurveyUnitMapping,
        loader: surveyUnitLoader,
      },
      {
        path: `/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
        Component: Collect,
        loader: collectLoader,
      },
      {
        path: `/${READ_ONLY}/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
        Component: Review,
        loader: reviewLoader,
      },
    ],
  },
]
