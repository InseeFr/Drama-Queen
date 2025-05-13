import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'

import { type PropsWithChildren, useEffect } from 'react'

import { routes } from './routes'

export function NavigationManager({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail
      if (
        location.pathname === pathname ||
        !matchRoutes(routes, { pathname })
      ) {
        return
      }
      navigate(pathname)
    }

    window.addEventListener('[Pearl] navigated', shellNavigationHandler)

    return () => {
      window.removeEventListener('[Pearl] navigated', shellNavigationHandler)
    }
  }, [location, navigate])

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('[Drama Queen] navigated', { detail: location.pathname }),
    )
  }, [location])

  return children
}
