import { render } from '@testing-library/react'

import { TestWrapper } from '@/tests/TestWrapper'

import { ErrorComponent } from './ErrorComponent'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('ErrorComponent', () => {
  it('should render the error title and message', () => {
    const message = 'Something went wrong'

    const { getByText } = render(
      <TestWrapper>
        <ErrorComponent message={message} />
      </TestWrapper>,
    )

    expect(getByText('errorOccured')).toBeInTheDocument()
    expect(getByText(message)).toBeInTheDocument()
  })
})
