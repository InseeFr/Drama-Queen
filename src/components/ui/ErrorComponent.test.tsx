import { renderWithTheme } from '@/tests/render'

import { ErrorComponent } from './ErrorComponent'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('ErrorComponent', () => {
  it('should render the error title and message', () => {
    const message = 'Something went wrong'

    const { getByText } = renderWithTheme(<ErrorComponent message={message} />)

    expect(getByText('An error has occured')).toBeInTheDocument()
    expect(getByText(message)).toBeInTheDocument()
  })
})
