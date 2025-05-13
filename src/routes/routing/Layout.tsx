import { ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'

import { globalStyles } from '@/routes/style/globalStyles'

import { theme } from '../style/theme'
import { NavigationManager } from './NavigationManager'

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
