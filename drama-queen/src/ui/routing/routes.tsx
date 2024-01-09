import { DisplayEnvValues } from "ui/pages/env";
import { SurveyUnitMapping, VisualisationMapping } from "ui/pages/queenMapping";
import { READ_ONLY } from "ui/constants";
import type { LoaderFunctionArgs, RouteObject } from "react-router-dom";
import { SurveyMapping } from "ui/pages/queenMapping/SuryveyMapping";
import { SynchronizeData } from "ui/pages/synchronize/SynchronizeData";

import { Layout } from "./Layout";
import { prCore } from "bootstrap";
import { Visualize } from "ui/pages/visualize/Visualize";
import { Orchestrator } from "ui/components/orchestrator/Orchestrator";

//ReadOnly path is a bad pattern must be change (affects pearl,moog,queen)
export const routes: RouteObject[] = [

  {
    path: `/:${READ_ONLY}?/survey-unit/:id`,
    element: <SurveyUnitMapping />
  },
  {
    path: `/:${READ_ONLY}?/questionnaire/:questionnaireId/survey-unit/:surveyUnitId`,
    element: <SurveyMapping />
  },

  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: "/env",
        Component: DisplayEnvValues,
        loader: protectedRouteLoader,
      },
      {
        path: "/visualize",
        Component: Visualize
      },
      {
        path: "/synchronize",
        Component: SynchronizeData,
        loader: protectedRouteLoader,
      },
      {
        path: '/orchestrator',
        Component: Orchestrator
      }
    ]
  },

]


async function protectedRouteLoader({ request }: LoaderFunctionArgs) {

  const { functions: { userAuthentication } } = await prCore;

  if (!userAuthentication.getIsUserLoggedIn()) {
    // Replace the href without reloading the page.
    // This is a way to make oidc-spa know where to redirect the user
    // if the authentication process is successful.
    history.pushState({}, "", request.url);

    await userAuthentication.login();

    // Never here, the login method redirects the user to the identity provider.
  }

  return null;
}