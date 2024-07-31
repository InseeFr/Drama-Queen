import { createBrowserRouter, createMemoryRouter } from 'react-router-dom'
import { routes } from './routes'

export type RoutingStrategy = 'memory' | 'browser'

type CreateRouterProps = {
  strategy?: RoutingStrategy
  initialPathname?: string
}

export function createRouter({
  strategy = 'memory',
  initialPathname = '/',
}: CreateRouterProps) {

  if (strategy === 'browser') {
    return createBrowserRouter(routes, { basename: '/queen' })
  }

  const initialEntries = [initialPathname || '/']
  return createMemoryRouter(routes, {
    initialEntries: initialEntries,
  })
}
