import { fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ShortCut } from '@/components/ui/ShortCut'
import { SHORTCUT_MENU, SHORTCUT_QUIT } from '@/constants/shortcuts'
import type { Overview } from '@/models/lunaticType'
import { renderWithTheme } from '@/tests/render'

import { Breadcrumb } from './Breadcrumb'
import { Header } from './Header'
import { Menu } from './Menu'

vi.mock('./Menu', () => ({
  Menu: vi.fn(),
}))

vi.mock('./Breadcrumb', () => ({
  Breadcrumb: vi.fn(),
}))

vi.mock('@/components/ui/ShortCut', () => ({
  ShortCut: vi.fn(),
}))

describe('Header Component', () => {
  const mockGoToPage = vi.fn()
  const mockQuit = vi.fn()
  const mockDefinitiveQuit = vi.fn()

  const defaultOverview: Overview = [
    {
      id: '1',
      type: 'sequence',
      page: '1',
      label: 'Sequence 1',
      description: '',
      reached: true,
      current: true,
      children: [],
    },
  ]

  const defaultProps = {
    questionnaireTitle: 'Test Questionnaire',
    readonly: false,
    overview: defaultOverview,
    goToPage: mockGoToPage,
    quit: mockQuit,
    definitiveQuit: mockDefinitiveQuit,
  }

  it('renders correctly the questionnaire title', () => {
    const { getByText, getByTitle } = renderWithTheme(
      <Header {...defaultProps} />,
    )

    expect(getByText('Test Questionnaire')).toBeInTheDocument()
    expect(getByTitle('Back to questionnaire start')).toBeInTheDocument()
    expect(getByTitle('Quit')).toBeInTheDocument()
  })

  it('renders the logo and triggers goToFirstPage on click', () => {
    const { getByTitle } = renderWithTheme(<Header {...defaultProps} />)
    const logo = getByTitle('Back to questionnaire start')

    fireEvent.click(logo)
    expect(mockGoToPage).toHaveBeenCalledWith({ page: '1' })
  })

  it('toggles the drawer when the menu button is clicked', () => {
    const { getByRole, queryByRole } = renderWithTheme(
      <Header {...defaultProps} />,
    )
    const menuButton = getByRole('button', { name: 'menu' })

    // Open menu
    fireEvent.click(menuButton)
    expect(getByRole('presentation')).toBeInTheDocument()

    // Close menu
    fireEvent.click(menuButton)
    expect(queryByRole('presentation')).not.toBeInTheDocument()
  })

  it('calls quit when the quit button is clicked', () => {
    const { getByTitle } = renderWithTheme(<Header {...defaultProps} />)
    const quitButton = getByTitle('Quit')

    fireEvent.click(quitButton)
    expect(mockQuit).toHaveBeenCalledTimes(1)
  })

  it('renders Menu component with the correct props', () => {
    const { getByRole } = renderWithTheme(<Header {...defaultProps} />)

    const menuButton = getByRole('button', { name: 'menu' })

    // Open menu
    fireEvent.click(menuButton)

    expect(Menu).toHaveBeenCalledWith(
      expect.objectContaining({
        readonly: defaultProps.readonly,
        questionnaireTitle: defaultProps.questionnaireTitle,
        overview: defaultProps.overview,
        goToPage: defaultProps.goToPage,
        quit: defaultProps.quit,
        definitiveQuit: defaultProps.definitiveQuit,
      }),
      undefined,
    )
  })

  it('renders Breadcrumb component with the correct props', () => {
    const overview: Overview = [
      {
        id: 'seq1',
        type: 'sequence',
        page: '1',
        label: 'Sequence 1',
        description: '',
        reached: true,
        current: false,
        children: [],
      },
      {
        id: 'seq2',
        type: 'sequence',
        page: '2',
        label: 'Sequence 2',
        description: '',
        reached: true,
        current: true,
        children: [
          {
            id: 'sub-seq1',
            type: 'subsequence',
            page: '3',
            label: 'Sub-sequence 1',
            description: '',
            reached: true,
            current: true,
            children: [],
          },
        ],
      },
    ]

    const props = {
      ...defaultProps,
      overview: overview,
    }

    renderWithTheme(<Header {...props} />)

    expect(Breadcrumb).toHaveBeenCalledWith(
      expect.objectContaining({
        sequence: props.overview[1],
        subSequence: props.overview[1].children[0],
      }),
      undefined,
    )
  })

  it('renders ShortCut components for menu and quit buttons', () => {
    renderWithTheme(<Header {...defaultProps} />)

    // renders ShortCut for quit button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_QUIT,
        onClickMethod: defaultProps.quit,
      }),
      undefined,
    )

    // renders ShortCut for menu button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_MENU,
        onClickMethod: expect.any(Function),
      }),
      undefined,
    )
  })
})
