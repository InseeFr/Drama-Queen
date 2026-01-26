import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CenteredSpinner } from '@/components/ui/CenteredSpinner'
import { ErrorComponent } from '@/components/ui/ErrorComponent'

import { ExternalRessources } from './External'
import useScript from './useScript'

vi.mock('@/i18n', () => ({
  getTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))
vi.mock('@/components/ui/ErrorComponent', () => ({
  ErrorComponent: vi.fn(),
}))
vi.mock('@/components/ui/CenteredSpinner', () => ({
  CenteredSpinner: vi.fn(),
}))
vi.mock('./useScript', () => ({
  default: vi.fn(),
}))

describe('ExternalRessources', () => {
  it('renders CenteredSpinner when status is "loading"', () => {
    vi.mocked(useScript).mockReturnValue('loading')

    render(<ExternalRessources />)

    expect(CenteredSpinner).toHaveBeenCalled()
  })

  it('renders <capmi-app /> when status is "ready"', () => {
    vi.mocked(useScript).mockReturnValue('ready')

    const { container } = render(<ExternalRessources />)

    // Check that <capmi-app /> is rendered in the container
    const capmiAppElement = container.querySelector('capmi-app')
    expect(capmiAppElement).toBeInTheDocument()
  })

  it('renders ErrorComponent with correct message when status is "error"', () => {
    vi.mocked(useScript).mockReturnValue('error')

    render(<ExternalRessources />)

    expect(ErrorComponent).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'externalResourcesLoadedError' }),
      undefined,
    )
  })
})
