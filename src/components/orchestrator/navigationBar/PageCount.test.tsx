import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithTheme } from '@/tests/render'

import { PageCount } from './PageCount'

describe('NavBar Component', () => {
  it('displays correctly the page and subPage count', () => {
    const { getByText } = renderWithTheme(
      <PageCount currentPage={2} maxPage={5} />,
    )

    // pageNumber is displayed twice : for page and for subPage
    expect(getByText('page n°')).toBeInTheDocument()

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
