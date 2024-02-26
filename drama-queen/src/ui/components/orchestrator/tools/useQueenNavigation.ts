import type { LunaticData } from '@inseefr/lunatic'
import type { SurveyUnit, SurveyUnitData } from 'core/model'
import { getStateData, getUpdatedSurveyUnit } from './functions'
import { useEffect, useState } from 'react'
import type { QuestionnaireState } from 'core/model/QuestionnaireState'

type UseQueenNavigationProps = {
  initialSurveyUnit: SurveyUnit
  initialStateData: SurveyUnit['stateData']
  data: SurveyUnitData
  changedData: LunaticData
  lastReachedPage: string | undefined
  pageTag: string
  quit: (surveyUnit: SurveyUnit) => void
  definitiveQuit: (surveyUnit: SurveyUnit) => void
}

export function useQueenNavigation({
  initialSurveyUnit,
  data,
  changedData,
  lastReachedPage,
  pageTag,
  quit,
  definitiveQuit,
}: UseQueenNavigationProps) {
  const hasDataChanged = Object.keys(changedData.COLLECTED).length > 0

  const [surveyUnit, setSurveyUnit] = useState<SurveyUnit>(initialSurveyUnit)
  const [stateData, setStateData] = useState<SurveyUnit['stateData']>(
    initialSurveyUnit.stateData
  )

  const getIsLastReachedPage = () => {
    if (lastReachedPage === undefined) {
      return true
    }
    return pageTag === lastReachedPage
  }

  const getState = (forcedState?: QuestionnaireState) => {
    // we can force a new state (used for definitiveQuit forcing "VALIDATED" state)
    if (forcedState) {
      return forcedState
    }
    // whatever the previous state, changing data updates the state into "INIT"
    if (hasDataChanged) {
      return 'INIT'
    }
    return stateData?.state ?? null
  }

  const updateStateData = (forcedState?: QuestionnaireState) => {
    const newStateData: SurveyUnit['stateData'] = {
      state: getState(forcedState),
      date: new Date().getTime(),
      currentPage: lastReachedPage ?? '1',
    }
    setStateData(newStateData)
  }

  const updateSurveyUnit = () => {
    const updatedSurveyUnit = {
      ...surveyUnit,
      data: data,
      stateData: stateData,
    }
    setSurveyUnit(updatedSurveyUnit)
    return updatedSurveyUnit
  }

  useEffect(() => {
    const savingTask = () => {
      if (pageTag === undefined || lastReachedPage === undefined) {
        return
      }
      updateStateData()
      updateSurveyUnit()
    }
    savingTask()
  }, [pageTag, lastReachedPage])

  const orchestratorQuit = () => {
    const updatedStateData = updateStateData()
    const updatedSurveyUnit = updateSurveyUnit()
    return quit(updatedSurveyUnit)
  }

  const orchestratorDefinitiveQuit = () => {
    const updatedStateData = updateStateData('VALIDATED')
    const updatedSurveyUnit = updateSurveyUnit()
    return definitiveQuit(updatedSurveyUnit)
  }

  const isLastReachedPage = getIsLastReachedPage()

  return {
    isLastReachedPage,
    orchestratorQuit,
    orchestratorDefinitiveQuit,
  }
}
