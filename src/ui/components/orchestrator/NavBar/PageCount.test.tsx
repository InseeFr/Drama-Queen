import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PageCount } from './PageCount'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

describe('NavBar Component', () => {
  it('displays correctly the page and subPage count', () => {
    const { getByText } = render(<PageCount currentPage={2} maxPage={5} />)

    // pageNumber is displayed twice : for page and for subPage
    expect(getByText('pageNumber')).toBeInTheDocument()

    // page count : `${page}/${maxPage}`
    expect(getByText('2/5')).toBeInTheDocument()
  })

  it('hides the page count if currentPage is undefined', () => {
    const { container } = render(
      <PageCount currentPage={undefined} maxPage={5} />,
    )

    const pageCount = container.querySelector('#page-count')
    expect(pageCount).toBeInTheDocument()
    expect(pageCount).toHaveStyle('visibility: hidden')
  })
})
