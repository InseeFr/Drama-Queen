import { EnvPage } from "pages/env";
import { SurveyUnitMapping, VisualisationMapping } from "pages/queenMapping";
import { READ_ONLY } from "utils/constants";
import type { RouteObject } from "react-router-dom";

//ReadOnly path is a bad pattern must be change (affects pearl,moog,queen)
export const createRoutes = (queenVersion: 1 | 2 = 1): RouteObject[] => {
  const queenElement = queenVersion === 1 ? <queen-app /> : <queen-v2-app />;
  return [
    {
      path: "queen/env",
      element: <EnvPage />
    },
    {
      path: `/queen/:${READ_ONLY}?/survey-unit/:id`,
      element: <SurveyUnitMapping />
    },
    {
      path: `/queen/:${READ_ONLY}?/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
      element: queenElement
    },
    {
      path: "/queen/visualize/*",
      element: <VisualisationMapping />
    },
    {
      path: "/queen/synchronize",
      element: queenElement
    },
    {
      path: "/queen/authentication/*",
      element: queenElement
    },
    {
      path: "/queen/authentication-v2/*",
      element: queenElement
    },
  ]
}