import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PrevNext } from '../buttons/PrevNext/PrevNext'
import { NavBar } from './NavBar'

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('../buttons/PrevNext/PrevNext', () => ({
  PrevNext: vi.fn(),
}))

describe('NavBar Component', () => {
  const defaultProps = {
    page: 2,
    maxPage: 5,
    subPage: 1,
    nbSubPages: 3,
    isPreviousEnabled: true,
    isNextEnabled: true,
    onPrevious: vi.fn(),
    onNext: vi.fn(),
  }

  it('displays correctly the page and subPage count', () => {
    const { getAllByText, getByText } = render(<NavBar {...defaultProps} />)

    // pageNumber is displayed twice : for page and for subPage
    expect(getAllByText('pageNumber')).toHaveLength(2)

    // page count : `${page}/${maxPage}`
    expect(getByText('2/5')).toBeInTheDocument()

    // subPage count : subPage is an index starting at 0, we display ${subPage}+1
    expect(getByText('2/3')).toBeInTheDocument()
  })

  it('only displays page information if subPage is undefined', () => {
    const props = { ...defaultProps, subPage: undefined, nbSubPages: undefined }

    const { getAllByText, getByText } = render(<NavBar {...props} />)

    expect(getAllByText('pageNumber')).toHaveLength(1)
    expect(getByText('2/5')).toBeInTheDocument()
  })

  it('renders PrevNext component with the correct props', () => {
    render(<NavBar {...defaultProps} />)

    expect(PrevNext).toHaveBeenCalledWith(
      {
        isPreviousEnabled: defaultProps.isPreviousEnabled,
        isNextEnabled: defaultProps.isNextEnabled,
        onPrevious: defaultProps.onPrevious,
        onNext: defaultProps.onNext,
      },
      {},
    )
  })
})
