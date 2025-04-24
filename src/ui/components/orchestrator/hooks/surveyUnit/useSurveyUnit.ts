import { useState } from 'react'

import type { PageTag, SurveyUnit, SurveyUnitData } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'

import { computeUpdatedData, hasDataChanged } from './utils'

export function useSurveyUnit(
  initialSurveyUnit: SurveyUnit,
  /** Function to be called when the survey unit state change, provided by orchestrator mode. */
  onChangeSurveyUnitState: (params: {
    surveyUnitId: string
    newState: QuestionnaireState
  }) => void,
  pageTag: PageTag,
) {
  const [surveyUnitData, setSurveyUnitData] = useState<SurveyUnitData>(
    initialSurveyUnit.data,
  )
  const [surveyUnitState, setSurveyUnitState] = useState<QuestionnaireState>(
    initialSurveyUnit.stateData?.state ?? null,
  )

  /** On state update we call the function provided by the orchestrator and update our React state. */
  function handleStateUpdate(newState: QuestionnaireState) {
    onChangeSurveyUnitState({
      surveyUnitId: initialSurveyUnit.id,
      newState: newState,
    })
    setSurveyUnitState(newState)
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
    const newState = hasDataChanged ? 'INIT' : surveyUnitState

    // updates state only if necessary : prevents for calling onChangeSurveyUnitState
    if (newState !== surveyUnitState) {
      handleStateUpdate(newState)
    }
    return newState
  }

  /** Compute new survey unit, and send a state update if necessary. */
  function updateSurveyUnit(
    changedData: SurveyUnitData,
    forcedState?: QuestionnaireState,
  ): SurveyUnit {
    const hasDataBeenUpdated = hasDataChanged(changedData)
    let newData
    if (hasDataBeenUpdated) {
      newData = computeUpdatedData(surveyUnitData, changedData)
      setSurveyUnitData(newData)
    }

    const newState = updateState(hasDataBeenUpdated, forcedState)

    return {
      ...initialSurveyUnit,
      data: hasDataBeenUpdated && newData ? newData : surveyUnitData,
      stateData: {
        state: newState,
        date: new Date().getTime(),
        currentPage: pageTag ?? '1',
      },
    }
  }

  return {
    surveyUnitData,
    updateSurveyUnit,
  }
}
