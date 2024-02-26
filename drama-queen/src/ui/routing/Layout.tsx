import { ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { globalStyles } from 'ui/style/globalStyles'
import { theme } from '../style/theme'

export function Layout() {
  return (
    <>
      {globalStyles}
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  )
}
