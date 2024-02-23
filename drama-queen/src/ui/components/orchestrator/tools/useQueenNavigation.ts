import type { LunaticData } from '@inseefr/lunatic'
import type { SurveyUnit, SurveyUnitData } from 'core/model'
import { getStateData, getUpdatedSurveyUnit } from './functions'

type UseQueenNavigationProps = {
  initialSurveyUnit: SurveyUnit
  stateData: SurveyUnit['stateData']
  newData: SurveyUnitData
  changedData: LunaticData
  lastReachedPage: string | undefined
  pageTag: string
  quit: (surveyUnit: SurveyUnit) => void
  definitiveQuit: (surveyUnit: SurveyUnit) => void
}

export function useQueenNavigation({
  initialSurveyUnit,
  stateData,
  newData,
  changedData,
  lastReachedPage,
  pageTag,
  quit,
  definitiveQuit,
}: UseQueenNavigationProps) {
  const getIsLastReachedPage = () => {
    if (lastReachedPage === undefined) {
      return true
    }
    return pageTag === lastReachedPage
  }

  const orchestratorQuit = () => {
    stateData = getStateData(stateData, changedData, lastReachedPage)
    const updatedSurveyUnit = getUpdatedSurveyUnit(
      initialSurveyUnit,
      newData,
      stateData
    )
    return quit(updatedSurveyUnit)
  }

  const orchestratorDefinitiveQuit = () => {
    stateData = getStateData(
      stateData,
      changedData,
      lastReachedPage,
      'VALIDATED'
    )
    const updatedSurveyUnit = getUpdatedSurveyUnit(
      initialSurveyUnit,
      newData,
      stateData
    )
    return definitiveQuit(updatedSurveyUnit)
  }

  const isLastReachedPage = getIsLastReachedPage()

  return { isLastReachedPage, orchestratorQuit, orchestratorDefinitiveQuit }
}
