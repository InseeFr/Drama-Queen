import type { LunaticData } from '@inseefr/lunatic'
import type { SurveyUnit, SurveyUnitData } from 'core/model'
import type { QuestionnaireState } from 'core/model/QuestionnaireState'
import { useEffect } from 'react'

type UseQueenNavigationProps = {
  initialSurveyUnit: SurveyUnit
  data: SurveyUnitData
  changedData: LunaticData
  lastReachedPage: string | undefined
  pageTag: string
  quit: (surveyUnit: SurveyUnit) => void
  definitiveQuit: (surveyUnit: SurveyUnit) => void
  save: (surveyUnit: SurveyUnit) => void
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
  save,
}: UseQueenNavigationProps) {
  const hasDataChanged = Object.keys(changedData.COLLECTED).length > 0

  const isLastReachedPage =
    lastReachedPage === undefined || pageTag === lastReachedPage

  const surveyUnitState = hasDataChanged
    ? 'INIT'
    : initialSurveyUnit.stateData?.state ?? null

  // get the updated SurveyUnit, with possibility to force the state (used for definitive quit which forces the validation)
  const getUpdatedSurveyUnit = (forcedState?: QuestionnaireState) => {
    const surveyUnit = {
      ...initialSurveyUnit,
      data,
      stateData: {
        state: forcedState ?? surveyUnitState,
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
    const surveyUnit = getUpdatedSurveyUnit()
    return save(surveyUnit)
  }, [pageTag, lastReachedPage])

  const orchestratorQuit = () => {
    const surveyUnit = getUpdatedSurveyUnit()
    return quit(surveyUnit)
  }

  const orchestratorDefinitiveQuit = () => {
    // get the updated SurveyUnit, and forces state to "VALIDATED"
    const surveyUnit = getUpdatedSurveyUnit('VALIDATED')
    return definitiveQuit(surveyUnit)
  }

  return {
    isLastReachedPage,
    orchestratorQuit,
    orchestratorDefinitiveQuit,
  }
}
