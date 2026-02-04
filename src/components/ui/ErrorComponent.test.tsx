import { renderWithTheme } from '@/tests/render'

import { ErrorComponent } from './ErrorComponent'

describe('ErrorComponent', () => {
  it('should render the error title and message', () => {
    const message = 'Something went wrong'

    const { getByText } = renderWithTheme(<ErrorComponent message={message} />)

    expect(getByText('An error has occured')).toBeInTheDocument()
    expect(getByText(message)).toBeInTheDocument()
  })
})
