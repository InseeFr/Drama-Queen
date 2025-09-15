import { useState } from 'react'

import type { Interrogation, InterrogationData, PageTag } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'

import { computeUpdatedData, hasDataChanged } from './utils'

export function useInterrogation(
  initialInterrogation: Interrogation,
  /** Function to be called when the interrogation state change, provided by orchestrator mode. */
  onChangeInterrogationState: (params: {
    interrogationId: string
    newState: QuestionnaireState
  }) => void,
) {
  const [interrogationData, setInterrogationData] = useState<InterrogationData>(
    initialInterrogation.data,
  )
  const [interrogationState, setInterrogationState] =
    useState<QuestionnaireState>(initialInterrogation.stateData?.state ?? null)

  /** On state update we call the function provided by the orchestrator and update our React state. */
  function handleStateUpdate(newState: QuestionnaireState) {
    onChangeInterrogationState({
      interrogationId: initialInterrogation.id,
      newState: newState,
    })
    setInterrogationState(newState)
  }

  /** Compute new state and send an update if necessary. */
  function updateState(
    hasDataChanged: boolean,
    forcedState?: QuestionnaireState,
  ): QuestionnaireState {
    // forcedState is used for definitiveQuit which forces the validation
    if (forcedState) {
      handleStateUpdate(forcedState)
      return forcedState
    }

    // calculates the new state : currently the only (calculable) possible change is into INIT if data changed
    const newState = hasDataChanged ? 'INIT' : interrogationState

    // updates state only if necessary : prevents for calling onChangeInterrogationState
    if (newState !== interrogationState) {
      handleStateUpdate(newState)
    }
    return newState
  }

  /**
   * Compute new interrogation, and send a state update if the state (`"INIT"`,
   * `"COMPLETED"`...) has changed.
   */
  function updateInterrogation(
    changedData: InterrogationData,
    options: { currentPage?: PageTag; forcedState?: QuestionnaireState } = {},
  ): Interrogation {
    const { currentPage, forcedState } = options
    const hasDataBeenUpdated = hasDataChanged(changedData)
    let newData
    if (hasDataBeenUpdated) {
      newData = computeUpdatedData(interrogationData, changedData)
      setInterrogationData(newData)
    }

    const newState = updateState(hasDataBeenUpdated, forcedState)

    return {
      ...initialInterrogation,
      data: hasDataBeenUpdated && newData ? newData : interrogationData,
      // provide stateData only if there is state (exclude null state)
      ...(newState && {
        stateData: {
          state: newState,
          date: new Date().getTime(),
          currentPage: currentPage ?? '1',
        },
      }),
    }
  }

  return {
    interrogationData,
    updateInterrogation,
  }
}
