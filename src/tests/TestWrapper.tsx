import { ThemeProvider } from '@mui/material/styles'

import type { ReactNode } from 'react'

import { theme } from '@/routes/style/theme'

export const TestWrapper = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
