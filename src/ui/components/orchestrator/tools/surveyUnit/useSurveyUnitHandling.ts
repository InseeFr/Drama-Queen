import { useState } from 'react'

import type { PageTag, SurveyUnit, SurveyUnitData } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'

import { getHasDataChanged, getNewData } from './data'

export function useSurveyUnitHandling(
  initialSurveyUnit: SurveyUnit,
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

  function updateData(newData: SurveyUnitData) {
    setSurveyUnitData(newData)
  }

  function getUpdatedData(newData: SurveyUnitData): SurveyUnitData {
    updateData(newData)
    return getNewData(surveyUnitData, newData)
  }

  function updateState(newState: QuestionnaireState) {
    onChangeSurveyUnitState({
      surveyUnitId: initialSurveyUnit.id,
      newState: newState,
    })
    setSurveyUnitState(newState)
  }

  function getUpdatedState(
    hasDataChanged: boolean,
    forcedState?: QuestionnaireState,
  ): QuestionnaireState {
    // forcedState is used for definitiveQuit which forces the validation
    if (forcedState) {
      updateState(forcedState)
      return forcedState
    }

    // calculates the new state : currently the only (calculable) possible change is into INIT if data changed
    const newState = hasDataChanged ? 'INIT' : surveyUnitState

    // updates state only if necessary : prevents for calling onChangeSurveyUnitState
    if (newState !== surveyUnitState) {
      updateState(newState)
    }
    return newState
  }

  function getUpdatedSurveyUnit(
    changedData: SurveyUnitData,
    forcedState?: QuestionnaireState,
  ): SurveyUnit {
    const hasDataChanged = getHasDataChanged(changedData)

    const newData = getNewData(surveyUnitData, changedData)
    const updatedData = getUpdatedData(newData)

    const updatedState = getUpdatedState(hasDataChanged, forcedState)

    return {
      ...initialSurveyUnit,
      data: updatedData,
      stateData: {
        state: updatedState,
        date: new Date().getTime(),
        currentPage: pageTag ?? '1',
      },
    }
  }

  return {
    surveyUnitData,
    surveyUnitState,
    getUpdatedData,
    getUpdatedState,
    getUpdatedSurveyUnit,
  }
}
