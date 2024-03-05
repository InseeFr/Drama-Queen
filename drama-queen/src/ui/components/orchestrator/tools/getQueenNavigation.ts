import type { LunaticData } from '@inseefr/lunatic'
import type { SurveyUnit, SurveyUnitData } from 'core/model'
import type { QuestionnaireState } from 'core/model/QuestionnaireState'
import { useEffect, useState } from 'react'

type UseQueenNavigationProps = {
  initialSurveyUnit: SurveyUnit
  data: SurveyUnitData
  changedData: LunaticData
  lastReachedPage: string | undefined
  pageTag: string
  quit: (surveyUnit: SurveyUnit) => void
  definitiveQuit: (surveyUnit: SurveyUnit) => void
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
  changedData,
  lastReachedPage,
  pageTag,
  quit,
  definitiveQuit,
  onChangePage,
  onChangeSurveyUnitState,
}: UseQueenNavigationProps) {
  // handle state to check when it changes
  const [surveyUnitState, setSurveyUnitState] = useState<QuestionnaireState>(
    initialSurveyUnit.stateData?.state ?? null
  )
  const hasDataChanged = Object.keys(changedData.COLLECTED).length > 0

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

  const handleState = (forcedState?: QuestionnaireState) => {
    // forcedState is used for definitiveQuit which forces the validation
    if (forcedState) {
      updateState(forcedState)
      return forcedState
    }
    // calculates the new state : currently the only (calculable) possible change is into INIT if data changed
    const newState = hasDataChanged ? 'INIT' : surveyUnitState
    // updates state only if necessary : prevents for sending too many events
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
    const state = handleState()
    const surveyUnit = getUpdatedSurveyUnit(state)
    return onChangePage(surveyUnit)
  }, [pageTag, lastReachedPage])

  const orchestratorQuit = () => {
    const state = handleState()
    const surveyUnit = getUpdatedSurveyUnit(state)
    return quit(surveyUnit)
  }

  const orchestratorDefinitiveQuit = () => {
    // set the state to COMPLETED only for sending the event. Completed state should be on algorithm.
    handleState('COMPLETED')
    // forces the state to VALIDATED
    const state = handleState('VALIDATED')
    const surveyUnit = getUpdatedSurveyUnit(state)
    return definitiveQuit(surveyUnit)
  }

  return {
    isLastReachedPage,
    orchestratorQuit,
    orchestratorDefinitiveQuit,
  }
}
