import { routeTree } from '@/routeTree.gen'
import { createBrowserHistory, createMemoryHistory } from '@tanstack/history'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'

export type RoutingStrategy = 'memory' | 'browser'

type CreateRouterProps = {
  strategy?: RoutingStrategy
  initialPathname?: string
}

const queryClient = new QueryClient();

export function createRouter({
  strategy = 'memory',
  initialPathname = '/',
}: CreateRouterProps) {
  if (strategy === 'browser') {
    return createTanStackRouter({ routeTree, history: createBrowserHistory(), basepath: '/queen', context: { queryClient } })
  }

  const initialEntries = [initialPathname || '/']
  return createTanStackRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries }),
    context: { queryClient }
  })
}
