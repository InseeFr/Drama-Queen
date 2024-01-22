import { Outlet } from 'react-router-dom'
import { AppVersion } from 'ui/components/appVersion'
import { globalStyles } from 'ui/style/globalStyles'

export function Layout() {
  return (
    <>
      {globalStyles}
      <Outlet />
      {/* <AppVersion /> */}
    </>
  )
}
