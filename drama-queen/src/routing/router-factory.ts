import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { createRoutes } from "./createRoutes";
import { RoutingStrategy } from "./types";

interface CreateRouterProps {
  strategy?: RoutingStrategy;
  initialPathname?: string;
}

export function createRouter({ strategy, initialPathname }: CreateRouterProps) {
  const isQueenV2 = window.location.href.toLowerCase().includes("_queenv2");
  const appRoutes = createRoutes(isQueenV2 ? 2 : 1);
  if (strategy === "browser") {
    return createBrowserRouter(appRoutes);
  }

  const initialEntries = [initialPathname || "/"];
  return createMemoryRouter(appRoutes, {
    initialEntries: initialEntries,
  });
}
