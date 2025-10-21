import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { computeNavigationButtonsProps } from './navigation'

vi.mock('@/constants/shortcuts', () => ({
  SHORTCUT_NEXT: 'Alt+Enter',
}))

vi.mock('@/i18n', () => ({
  getTranslation: () => ({ t: (keyMessage: string) => keyMessage }),
}))

vi.mock('@mui/icons-material/ArrowRightAlt', () => ({
  default: () => <svg data-testid="ArrowRightAltIcon" />,
}))

describe('computeNavigationButtonsProps', () => {
  const mockGoNextPage = vi.fn()
  const mockQuit = vi.fn()
  const mockDefinitiveQuit = vi.fn()

  const defaultProps = {
    readonly: false,
    isFirstPage: false,
    isLastPage: false,
    isLastReachedPage: false,
    isBlocking: false,
    hasPageResponse: vi.fn(),
    goPreviousPage: vi.fn(),
    goNextPage: mockGoNextPage,
    quit: mockQuit,
    definitiveQuit: mockDefinitiveQuit,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('continue button', () => {
    it('should return "continue" action when page has response', async () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        hasPageResponse: () => true,
      })

      expect(props.continueProps.label).toBe('continue')
      expect(props.continueProps.isEnabled).toBe(true)
      expect(props.continueProps.isVisible).toBe(true)

      const { getByTestId } = render(<>{props.continueProps.endIcon}</>)
      expect(getByTestId('ArrowRightAltIcon')).toBeInTheDocument()

      await props.continueProps.onContinue()
      // do not ignore non mandatory error
      expect(mockGoNextPage).toHaveBeenCalledWith()
    })

    it('should return "saveAndQuit" action when last page and not readonly', async () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        isLastPage: true,
        hasPageResponse: () => true,
      })

      expect(props.continueProps.label).toBe('validateAndQuit')
      expect(props.continueProps.isEnabled).toBe(true)
      expect(props.continueProps.isVisible).toBe(true)

      await props.continueProps.onContinue()
      expect(mockDefinitiveQuit).toHaveBeenCalledTimes(1)
    })

    it('should return "quit" when readonly and last page', async () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        readonly: true,
        isLastPage: true,
      })

      expect(props.continueProps.label).toBe('quit')
      expect(props.continueProps.isEnabled).toBe(true)
      expect(props.continueProps.isVisible).toBe(true)

      await props.continueProps.onContinue()
      expect(mockQuit).toHaveBeenCalledTimes(1)
    })

    it('should hide continue button when readonly and not last page', () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        readonly: true,
        hasPageResponse: () => false,
      })

      expect(props.continueProps.isVisible).toBe(false)
    })
  })

  describe('next button', () => {
    it('should go next page when calling onNext', () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        hasPageResponse: () => true,
      })

      props.nextProps.onNext()
      // do not ignore non mandatory error
      expect(mockGoNextPage).toHaveBeenCalledWith()
    })

    it('should enable next if controls are not blocking, not last page, not last reached page, and page has a response', () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        hasPageResponse: () => true,
      })

      expect(props.nextProps.isNextEnabled).toBe(true)
    })

    it('should enable next if controls are not blocking, not last page, not last reached page, and page has a response', () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        hasPageResponse: () => true,
      })

      expect(props.nextProps.isNextEnabled).toBe(true)
    })

    it('should disable next when controls are blocking', () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        isBlocking: true,
        hasPageResponse: () => true,
      })

      expect(props.nextProps.isNextEnabled).toBe(false)
    })
  })

  describe('previous button', () => {
    it('should enable previous when not first page', () => {
      const props = computeNavigationButtonsProps(defaultProps)
      expect(props.previousProps.isPreviousEnabled).toBe(true)
    })

    it('should disable previous when first page', () => {
      const props = computeNavigationButtonsProps({
        ...defaultProps,
        isFirstPage: true,
      })
      expect(props.previousProps.isPreviousEnabled).toBe(false)
    })
  })
})
