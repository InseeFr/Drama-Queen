import { DisplayEnvValues } from 'ui/pages/env'
import { SurveyUnitMapping } from 'ui/pages/queenMapping'
import { READ_ONLY } from 'ui/constants'
import type { RouteObject } from 'react-router-dom'
import { SurveyMapping } from 'ui/pages/queenMapping/SuryveyMapping'
import { SynchronizeData } from 'ui/pages/synchronize'
import { Layout } from './Layout'
import { Visualize } from 'ui/pages/visualize/Visualize'
import { Orchestrator } from 'ui/components/orchestrator/Orchestrator'
import { protectedRouteLoader } from './loader/protectedLoader'
import { visualizeLoader } from './loader/visualizeLoader'
import { surveyUnitLoader } from './loader/surveyUnitLoader'

//ReadOnly path is a bad pattern must be change (affects pearl,moog,queen)
export const routes: RouteObject[] = [
  {
    path: '/survey-unit/:surveyUnitId',
    Component: SurveyUnitMapping,
    loader: surveyUnitLoader
  },
  {
    path: `/:${READ_ONLY}?/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
    element: <SurveyMapping />,
  },

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
        path: '/orchestrator',
        Component: Orchestrator,
      },
    ],
  },
]
