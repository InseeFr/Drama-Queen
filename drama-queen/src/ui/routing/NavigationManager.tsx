import { useEffect, type PropsWithChildren } from 'react'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { routes } from '../routing/routes'

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
  }, [location])

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('[Drama Queen] navigated', { detail: location.pathname })
    )
  }, [location])

  return children
}
