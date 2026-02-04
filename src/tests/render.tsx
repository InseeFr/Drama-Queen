import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/libs/i18n'
import { theme } from '@/style/theme'

/** Render to be used whenever you need to test i18n translations and mui theme. */
export const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </I18nextProvider>,
  )
}
