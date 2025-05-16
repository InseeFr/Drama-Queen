import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { SurveyUnit } from '@/core/model'
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

  describe('open WelcomeBackModal only if necessary', () => {
    const defaultSurveyUnit: SurveyUnit = {
      id: 'su1',
      data: {},
      questionnaireId: 'q1',
    }

    it('should open WelcomeBackModal at start if not readonly and currentPage is not "1"', () => {
      const surveyUnit: SurveyUnit = {
        ...defaultSurveyUnit,
        stateData: {
          state: 'INIT',
          date: 17000000,
          currentPage: '3', // not "1", so modal should be open
        },
      }

      const { getByRole } = render(
        <TestWrapper>
          <Orchestrator
            readonly={false}
            source={{ components: [], variables: [] }}
            getReferentiel={vi.fn()}
            surveyUnit={surveyUnit}
          />
        </TestWrapper>,
      )

      expect(getByRole('dialog')).toBeInTheDocument()
    })

    it('should not open WelcomeBackModal if readonly is true', () => {
      const surveyUnit: SurveyUnit = {
        ...defaultSurveyUnit,
        stateData: {
          state: 'INIT',
          date: 17000000,
          currentPage: '3', // not "1"
        },
      }

      const { queryByRole } = render(
        <TestWrapper>
          <Orchestrator
            readonly={true} // readonly
            source={{ components: [], variables: [] }}
            getReferentiel={vi.fn()}
            surveyUnit={surveyUnit}
          />
        </TestWrapper>,
      )

      expect(queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should not open WelcomeBackModal if currentPage is "1"', () => {
      const surveyUnit: SurveyUnit = {
        ...defaultSurveyUnit,
        stateData: {
          state: 'INIT',
          date: 17000000,
          currentPage: '1', // "1", so modal should not be open
        },
      }

      const { queryByRole } = render(
        <TestWrapper>
          <Orchestrator
            readonly={false}
            source={{ components: [], variables: [] }}
            getReferentiel={vi.fn()}
            surveyUnit={surveyUnit}
          />
        </TestWrapper>,
      )

      expect(queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
