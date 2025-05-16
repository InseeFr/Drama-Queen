import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TestWrapper } from '@/tests/TestWrapper'

import { Orchestrator } from './Orchestrator'

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
    })
  })
})
