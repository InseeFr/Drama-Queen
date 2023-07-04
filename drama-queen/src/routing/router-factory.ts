import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { createRoutes } from "./createRoutes";
import { RoutingStrategy } from "./types";

interface CreateRouterProps {
  strategy?: RoutingStrategy;
  initialPathname?: string;
}

export function createRouter({ strategy, initialPathname }: CreateRouterProps) {
  const lowerHref = window.location.href.toLowerCase();
  const keywords = ["queenv2", "authentication-v2"];
  const isQueenV2 = keywords.some((keyword) => lowerHref.includes(keyword));

  const appRoutes = createRoutes(isQueenV2 ? 2 : 1);
  if (strategy === "browser") {
    return createBrowserRouter(appRoutes);
  }

  const initialEntries = [initialPathname || "/"];
  return createMemoryRouter(appRoutes, {
    initialEntries: initialEntries,
  });
}
