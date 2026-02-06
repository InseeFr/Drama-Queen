import { Outlet } from '@tanstack/react-router'

import { NavigationManager } from './NavigationManager'

export function Layout() {
  return (
    <NavigationManager>
      <Outlet />
    </NavigationManager>
  )
}
