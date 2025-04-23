import type { SurveyUnit, SurveyUnitData } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'

import type { GetChangedData } from '../../lunaticType'

type UseQueenNavigationProps = {
  onQuit: (surveyUnit: SurveyUnit) => void
  onDefinitiveQuit: (surveyUnit: SurveyUnit) => void
  getUpdatedSurveyUnit: (
    changedData: SurveyUnitData,
    forcedState?: QuestionnaireState,
  ) => SurveyUnit
  getChangedData: GetChangedData
}

/**
 * Handle synchronization of the surveyUnit with the backend
 */
export function useQueenNavigation({
  onQuit,
  onDefinitiveQuit,
  getUpdatedSurveyUnit,
  getChangedData,
}: UseQueenNavigationProps) {
  function orchestratorOnQuit() {
    const surveyUnit = getUpdatedSurveyUnit(
      getChangedData(true) as SurveyUnitData,
    )
    return onQuit(surveyUnit)
  }

  function orchestratorOnDefinitiveQuit() {
    let surveyUnit = getUpdatedSurveyUnit(
      getChangedData(true) as SurveyUnitData,
    )
    // forces the state to COMPLETED only for sending the event. Completed state should be defined by an algorithm.
    surveyUnit = getUpdatedSurveyUnit({}, 'COMPLETED')
    // forces the state to VALIDATED
    surveyUnit = getUpdatedSurveyUnit({}, 'VALIDATED')
    return onDefinitiveQuit(surveyUnit)
  }

  return {
    orchestratorOnQuit,
    orchestratorOnDefinitiveQuit,
  }
}
