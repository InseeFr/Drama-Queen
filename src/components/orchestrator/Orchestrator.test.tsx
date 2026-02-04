import type { LunaticSource } from '@inseefr/lunatic'
import { fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'
import { TelemetryContext } from '@/contexts/TelemetryContext'
import type { Interrogation } from '@/core/model'
import { renderWithTheme } from '@/tests/render'

import { Orchestrator } from './Orchestrator'

describe('Orchestrator', () => {
  const source = {
    componentType: 'Questionnaire',
    components: [
      {
        componentType: 'Sequence',
        page: '1',
        id: 's1',
        label: [{ type: 'VTL', value: '"Ma séquence"' }],
      },
      {
        componentType: 'Question',
        page: '2',
        id: 'q1',
        components: [
          {
            componentType: 'Input',
            page: '2',
            label: { value: 'my-question', type: 'TXT' },
            id: 'i1',
            response: { name: 'my-question-input' },
          },
        ],
      },
    ],
    variables: [],
    maxPage: '2',
  } as any as LunaticSource

  it('triggers function on page change', () => {
    const onChangePageMock = vi.fn()

    const { getByText } = renderWithTheme(
      <Orchestrator
        readonly={false}
        source={source}
        getReferentiel={vi.fn()}
        onChangePage={onChangePageMock}
      />,
    )

    // initializes with first page
    expect(onChangePageMock).toHaveBeenCalledOnce()

    fireEvent.click(getByText('Continue'))

    expect(onChangePageMock).toHaveBeenCalledTimes(2)

    expect(onChangePageMock).toHaveBeenLastCalledWith({
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
    const defaultInterrogation: Interrogation = {
      id: 'interro1',
      data: {},
      questionnaireId: 'q1',
    }

    it('should open WelcomeBackModal at start if not readonly and currentPage is not "1"', () => {
      const interrogation: Interrogation = {
        ...defaultInterrogation,
        stateData: {
          state: 'INIT',
          date: 17000000,
          currentPage: '3', // not "1", so modal should be open
        },
      }

      const { getByRole } = renderWithTheme(
        <Orchestrator
          readonly={false}
          source={source}
          getReferentiel={vi.fn()}
          interrogation={interrogation}
        />,
      )

      expect(getByRole('dialog')).toBeInTheDocument()
    })

    it('should not open WelcomeBackModal if readonly is true', () => {
      const interrogation: Interrogation = {
        ...defaultInterrogation,
        stateData: {
          state: 'INIT',
          date: 17000000,
          currentPage: '3', // not "1"
        },
      }

      const { queryByRole } = renderWithTheme(
        <Orchestrator
          readonly={true} // readonly
          source={source}
          getReferentiel={vi.fn()}
          interrogation={interrogation}
        />,
      )

      expect(queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should not open WelcomeBackModal if currentPage is "1"', () => {
      const interrogation: Interrogation = {
        ...defaultInterrogation,
        stateData: {
          state: 'INIT',
          date: 17000000,
          currentPage: '1', // "1", so modal should not be open
        },
      }

      const { queryByRole } = renderWithTheme(
        <Orchestrator
          readonly={false}
          source={source}
          getReferentiel={vi.fn()}
          interrogation={interrogation}
        />,
      )

      expect(queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Telemetry', () => {
    it('triggers telemetry init event if used in telemetry provider', async () => {
      const pushEvent = vi.fn()

      renderWithTheme(
        <TelemetryContext.Provider
          value={{
            isTelemetryEnabled: true,
            pushEvent,
            setDefaultValues: () => {},
          }}
        >
          <Orchestrator
            readonly={false}
            source={source}
            getReferentiel={vi.fn()}
          />
        </TelemetryContext.Provider>,
      )

      await waitFor(() => expect(pushEvent).toHaveBeenCalledOnce())
      await waitFor(() =>
        expect(pushEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            type: TELEMETRY_EVENT_TYPE.INIT,
          }),
        ),
      )
    })

    it('does not trigger telemetry events if telemetry is disabled', async () => {
      const pushEvent = vi.fn()

      const { getByText } = renderWithTheme(
        <TelemetryContext.Provider
          value={{
            isTelemetryEnabled: false,
            pushEvent,
            setDefaultValues: () => {},
          }}
        >
          <Orchestrator
            readonly={false}
            source={source}
            getReferentiel={vi.fn()}
          />
        </TelemetryContext.Provider>,
      )

      // init event is not triggered
      await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())

      // go next page
      fireEvent.click(getByText('Continue'))
      await waitFor(() => expect(pushEvent).not.toHaveBeenCalled())
    })

    it('triggers telemetry new page event', async () => {
      const pushEvent = vi.fn()

      const { getByText, getByLabelText } = renderWithTheme(
        <TelemetryContext.Provider
          value={{
            isTelemetryEnabled: true,
            pushEvent,
            setDefaultValues: () => {},
          }}
        >
          <Orchestrator
            readonly={false}
            source={source}
            getReferentiel={vi.fn()}
          />
        </TelemetryContext.Provider>,
      )

      // init event
      await waitFor(() => expect(pushEvent).toHaveBeenCalledOnce())

      // go next page
      fireEvent.click(getByText('Continue'))
      await waitFor(() => expect(pushEvent).toHaveBeenCalledTimes(2))

      expect(pushEvent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
          page: 'lunaticPage',
          pageTag: '2',
        }),
      )

      // go previous page
      fireEvent.click(getByLabelText('previous'))
      await waitFor(() => expect(pushEvent).toHaveBeenCalledTimes(3))

      expect(pushEvent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
          page: 'lunaticPage',
          pageTag: '1',
        }),
      )
    })

    it('triggers telemetry exit event and telemetry batch when quiting with header button', async () => {
      const pushEvent = vi.fn()
      const triggerBatchTelemetryCallback = vi.fn(() => Promise.resolve())

      const { getByRole } = renderWithTheme(
        <TelemetryContext.Provider
          value={{
            isTelemetryEnabled: true,
            pushEvent,
            setDefaultValues: () => {},
            triggerBatchTelemetryCallback,
          }}
        >
          <Orchestrator
            readonly={false}
            source={source}
            getReferentiel={vi.fn()}
          />
        </TelemetryContext.Provider>,
      )

      // init event
      await waitFor(() => expect(pushEvent).toHaveBeenCalledOnce())

      // quit with 'Quit' button
      fireEvent.click(getByRole('button', { name: 'Quit' }))
      await waitFor(() => expect(pushEvent).toHaveBeenCalledTimes(2))

      expect(pushEvent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: TELEMETRY_EVENT_TYPE.EXIT,
          source: TELEMETRY_EVENT_EXIT_SOURCE.QUIT,
        }),
      )

      expect(triggerBatchTelemetryCallback).toHaveBeenCalledOnce()
    })

    it('triggers telemetry exit event and telemetry batch when validating the questionnaire', async () => {
      const pushEvent = vi.fn()
      const triggerBatchTelemetryCallback = vi.fn(() => Promise.resolve())

      const { getByText } = renderWithTheme(
        <TelemetryContext.Provider
          value={{
            isTelemetryEnabled: true,
            pushEvent,
            setDefaultValues: () => {},
            triggerBatchTelemetryCallback,
          }}
        >
          <Orchestrator
            readonly={false}
            source={{ components: [], variables: [] }} // only 1 page in orchestrator
            getReferentiel={vi.fn()}
          />
        </TelemetryContext.Provider>,
      )

      // init event
      await waitFor(() => expect(pushEvent).toHaveBeenCalledOnce())

      // validate questionnaire, it quits the questionnaire
      fireEvent.click(getByText('Validate and quit'))
      await waitFor(() => expect(pushEvent).toHaveBeenCalledTimes(2))

      expect(pushEvent).toHaveBeenLastCalledWith(
        expect.objectContaining({
          type: TELEMETRY_EVENT_TYPE.EXIT,
          source: TELEMETRY_EVENT_EXIT_SOURCE.DEFINITIVE_QUIT,
        }),
      )

      expect(triggerBatchTelemetryCallback).toHaveBeenCalledOnce()
    })
  })
})
