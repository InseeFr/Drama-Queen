import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'
import { SHORTCUT_MENU, SHORTCUT_QUIT } from '@/ui/constants'

import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { Menu } from '../Menu/Menu'
import { ShortCut } from '../buttons/ShortCut/ShortCut'
import type { Overview } from '../lunaticType'
import { Header } from './Header'

vi.mock('../Menu/Menu', () => ({
  Menu: vi.fn(),
}))

vi.mock('../Breadcrumb/Breadcrumb', () => ({
  Breadcrumb: vi.fn(),
}))

vi.mock('../buttons/ShortCut/ShortCut', () => ({
  ShortCut: vi.fn(),
}))

vi.mock('@/i18n', () => ({
  useTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
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
    const { getByText, getByTitle } = render(
      <TestWrapper>
        <Header {...defaultProps} />
      </TestWrapper>,
    )

    expect(getByText('Test Questionnaire')).toBeInTheDocument()
    expect(getByTitle('backToQuestionnaireStart')).toBeInTheDocument()
    expect(getByTitle('quit')).toBeInTheDocument()
  })

  it('renders the logo and triggers goToFirstPage on click', () => {
    const { getByTitle } = render(
      <TestWrapper>
        <Header {...defaultProps} />
      </TestWrapper>,
    )
    const logo = getByTitle('backToQuestionnaireStart')

    fireEvent.click(logo)
    expect(mockGoToPage).toHaveBeenCalledWith({ page: '1' })
  })

  it('toggles the drawer when the menu button is clicked', () => {
    const { getByRole, queryByRole } = render(
      <TestWrapper>
        <Header {...defaultProps} />
      </TestWrapper>,
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
    const { getByTitle } = render(
      <TestWrapper>
        <Header {...defaultProps} />
      </TestWrapper>,
    )
    const quitButton = getByTitle('quit')

    fireEvent.click(quitButton)
    expect(mockQuit).toHaveBeenCalledTimes(1)
  })

  it('renders Menu component with the correct props', () => {
    const { getByRole } = render(
      <TestWrapper>
        <Header {...defaultProps} />
      </TestWrapper>,
    )

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
      {},
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

    render(
      <TestWrapper>
        <Header {...props} />
      </TestWrapper>,
    )

    expect(Breadcrumb).toHaveBeenCalledWith(
      expect.objectContaining({
        sequence: props.overview[1],
        subSequence: props.overview[1].children[0],
      }),
      {},
    )
  })

  it('renders ShortCut components for menu and quit buttons', () => {
    render(
      <TestWrapper>
        <Header {...defaultProps} />
      </TestWrapper>,
    )

    // renders ShortCut for quit button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_QUIT,
        onClickMethod: defaultProps.quit,
      }),
      {},
    )

    // renders ShortCut for menu button
    expect(ShortCut).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCutKey: SHORTCUT_MENU,
        onClickMethod: expect.any(Function),
      }),
      {},
    )
  })
})
