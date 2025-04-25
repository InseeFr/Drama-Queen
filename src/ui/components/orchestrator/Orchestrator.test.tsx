import { fireEvent, render } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'

import { Orchestrator } from './Orchestrator'

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2024, 9, 28, 17, 7, 33, 11))
})

afterAll(() => {
  vi.useRealTimers()
})

describe('Orchestrator', () => {
  it('triggers function on page change', () => {
    const onChangePageMock = vi.fn()

    const { getByText } = render(
      <TestWrapper>
        <Orchestrator
          readonly={false}
          source={{ components: [], variables: [] }}
          getReferentiel={vi.fn()}
          onChangePage={onChangePageMock}
        />
      </TestWrapper>,
    )

    fireEvent.click(getByText('Validate and quit'))

    expect(onChangePageMock).toHaveBeenCalledOnce()
    expect(onChangePageMock).toHaveBeenCalledWith({
      comment: undefined,
      data: {
        EXTERNAL: { GLOBAL_QUESTIONNAIRE_ID: '', GLOBAL_SURVEY_UNIT_ID: '' },
      },
      id: '',
      personalization: undefined,
      questionnaireId: '',
      stateData: {
        currentPage: '1',
        date: 1730131653011,
        state: null,
      },
    })
  })
})
