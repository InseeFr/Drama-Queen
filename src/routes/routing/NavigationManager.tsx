import { type PropsWithChildren, useEffect } from 'react'

import { useLocation, useNavigate } from '@tanstack/react-router'

export function NavigationManager({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail
      if (location.pathname === pathname) {
        return
      }
      navigate({ to: pathname })
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
