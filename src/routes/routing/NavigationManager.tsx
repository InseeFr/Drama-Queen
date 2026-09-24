import { useLocation, useNavigate } from '@tanstack/react-router'

import { type PropsWithChildren, useEffect } from 'react'

type NavigationEventDetail = {
  pathname: string
  search?: string
}

export function NavigationManager({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      const { pathname, search } = (event as CustomEvent<NavigationEventDetail>)
        .detail

      if (location.pathname === pathname && location.search === search) {
        return
      }

      navigate({
        to: pathname,
        search: search
          ? Object.fromEntries(new URLSearchParams(search))
          : undefined,
      })
    }

    window.addEventListener('[Pearl] navigated', shellNavigationHandler)

    return () => {
      window.removeEventListener('[Pearl] navigated', shellNavigationHandler)
    }
  }, [location, navigate])

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<NavigationEventDetail>('[Drama Queen] navigated', {
        detail: {
          pathname: location.pathname,
          search: location.search,
        },
      }),
    )
  }, [location])

  return children
}
