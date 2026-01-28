import { ThemeProvider } from '@mui/material/styles'

import { globalStyles } from '@/routes/style/globalStyles'

import { theme } from '../style/theme'
import { NavigationManager } from './NavigationManager'
import { Outlet } from '@tanstack/react-router'

export function Layout() {
  return (
    <NavigationManager>
      {globalStyles}
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </NavigationManager>
  )
}
