import { createBrowserHistory, createMemoryHistory } from '@tanstack/history'
import { QueryClient } from '@tanstack/react-query'
import {
  createRouter as createTanStackRouter,
  stringifySearchWith,
} from '@tanstack/react-router'

import { routeTree } from '@/routeTree.gen'

const queenBasePath = '/queen'

export type RoutingStrategy = 'memory' | 'browser'

type CreateRouterProps = {
  strategy?: RoutingStrategy
}

const queryClient = new QueryClient()

export function createRouter({ strategy = 'memory' }: CreateRouterProps) {
  if (strategy === 'browser') {
    return createTanStackRouter({
      routeTree,
      history: createBrowserHistory(),
      basepath: queenBasePath,
      context: { queryClient },
      stringifySearch: stringifySearchWith(JSON.stringify),
    })
  }

  const currentUrl = new URL(window.location.href)
  const initialEntry = `${currentUrl.pathname.replace(queenBasePath, '')}${currentUrl.search}${currentUrl.hash}`

  const initialEntries = [initialEntry]
  return createTanStackRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries }),
    context: { queryClient },
  })
}
