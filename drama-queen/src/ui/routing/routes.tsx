import { DisplayEnvValues } from "ui/pages/env";
import { SurveyUnitMapping, VisualisationMapping } from "ui/pages/queenMapping";
import { READ_ONLY } from "ui/constants";
import type { RouteObject } from "react-router-dom";
import { SynchronizePage } from "ui/pages/synchronize/SynchronizePage";
import { SurveyMapping } from "ui/pages/queenMapping/SuryveyMapping";
import { RequiresAuthentication } from "ui/auth";

//ReadOnly path is a bad pattern must be change (affects pearl,moog,queen)
export const routes: RouteObject[] = [
  {
    path: "/env",
    element: <RequiresAuthentication><DisplayEnvValues /></RequiresAuthentication>
  },
  {
    path: `/:${READ_ONLY}?/survey-unit/:id`,
    element: <SurveyUnitMapping />
  },
  {
    path: `/:${READ_ONLY}?/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
    element: <SurveyMapping />
  },
  {
    path: "/visualize/*",
    element: <VisualisationMapping />
  },
  {
    path: "/synchronize",
    element: <RequiresAuthentication><SynchronizePage /></RequiresAuthentication>
  }
]