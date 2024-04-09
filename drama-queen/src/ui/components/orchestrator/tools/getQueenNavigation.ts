import type { LunaticData } from '@inseefr/lunatic'
import type { SurveyUnit, SurveyUnitData } from 'core/model'
import type { QuestionnaireState } from 'core/model/QuestionnaireState'
import { useEffect, useState } from 'react'
import type { GetChangedData } from '../lunaticType'

type UseQueenNavigationProps = {
  initialSurveyUnit: SurveyUnit
  data: SurveyUnitData
  lastReachedPage: string | undefined
  pageTag: string
  getChangedData: GetChangedData
  onQuit: (surveyUnit: SurveyUnit) => void
  onDefinitiveQuit: (surveyUnit: SurveyUnit) => void
  onChangePage: (surveyUnit: SurveyUnit) => void
  onChangeSurveyUnitState: (params: {
    surveyUnitId: string
    newState: QuestionnaireState
  }) => void
}

/**
 * Handle synchronization of the surveyUnit with the backend
 */
export function getQueenNavigation({
  initialSurveyUnit,
  data,
  lastReachedPage,
  pageTag,
  getChangedData,
  onQuit,
  onDefinitiveQuit,
  onChangePage,
  onChangeSurveyUnitState,
}: UseQueenNavigationProps) {
  // handle state to check when it changes
  const [surveyUnitState, setSurveyUnitState] = useState<QuestionnaireState>(
    initialSurveyUnit.stateData?.state ?? null
  )

  const isLastReachedPage =
    lastReachedPage === undefined || pageTag === lastReachedPage

  // updates the surveyUnitState
  const updateState = (newState: QuestionnaireState) => {
    onChangeSurveyUnitState({
      surveyUnitId: initialSurveyUnit.id,
      newState: newState,
    })
    setSurveyUnitState(newState)
  }

  const getHasDataChanged = (changedData: LunaticData) => {
    return Object.keys(changedData.COLLECTED).length > 0
  }

  const handleState = (
    hasDataChanged: boolean,
    forcedState?: QuestionnaireState
  ) => {
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

  // get the updated SurveyUnit
  const getUpdatedSurveyUnit = (state: QuestionnaireState) => {
    const surveyUnit = {
      ...initialSurveyUnit,
      data,
      stateData: {
        state: state,
        date: new Date().getTime(),
        currentPage: lastReachedPage ?? '1',
      },
    }
    return surveyUnit
  }

  // handle updated surveyUnit when page changes
  useEffect(() => {
    if (pageTag === undefined || lastReachedPage === undefined) {
      return
    }
    // get the updated data since last page change
    const changedData = getChangedData(true)
    const hasDataChanged = getHasDataChanged(changedData)

    const state = handleState(hasDataChanged)
    const surveyUnit = getUpdatedSurveyUnit(state)
    return onChangePage(surveyUnit)
  }, [pageTag, lastReachedPage])

  const orchestratorQuit = () => {
    // get the updated data since last page change
    const changedData = getChangedData(true)
    const hasDataChanged = getHasDataChanged(changedData)
    const state = handleState(hasDataChanged)
    const surveyUnit = getUpdatedSurveyUnit(state)
    return onQuit(surveyUnit)
  }

  const orchestratorDefinitiveQuit = () => {
    // get the updated data since last page change
    const changedData = getChangedData(true)
    const hasDataChanged = getHasDataChanged(changedData)
    // calculates the new state
    handleState(hasDataChanged)
    // forces the state to COMPLETED only for sending the event. Completed state should be defined by an algorithm.
    handleState(false, 'COMPLETED')
    // forces the state to VALIDATED
    const state = handleState(false, 'VALIDATED')
    const surveyUnit = getUpdatedSurveyUnit(state)
    return onDefinitiveQuit(surveyUnit)
  }

  return {
    isLastReachedPage,
    orchestratorQuit,
    orchestratorDefinitiveQuit,
  }
}
