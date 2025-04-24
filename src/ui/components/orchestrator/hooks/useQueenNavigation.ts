import type { SurveyUnit, SurveyUnitData } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'

import type { GetChangedData } from '../lunaticType'

type UseQueenNavigationProps = {
  getChangedData: GetChangedData
  onDefinitiveQuit: (surveyUnit: SurveyUnit) => void
  onQuit: (surveyUnit: SurveyUnit) => void
  updateSurveyUnit: (
    changedData: SurveyUnitData,
    forcedState?: QuestionnaireState,
  ) => SurveyUnit
}

/** Override navigation function to send updates to back-end. */
export function useQueenNavigation({
  getChangedData,
  onDefinitiveQuit,
  onQuit,
  updateSurveyUnit,
}: UseQueenNavigationProps) {
  const orchestratorOnQuit = () => {
    const surveyUnit = updateSurveyUnit(getChangedData(true) as SurveyUnitData)
    return onQuit(surveyUnit)
  }

  const orchestratorOnDefinitiveQuit = () => {
    let surveyUnit = updateSurveyUnit(getChangedData(true) as SurveyUnitData)

    // Force the state to COMPLETED only for sending the event. Completed state should be defined by an algorithm.
    surveyUnit = updateSurveyUnit({}, 'COMPLETED')
    // Force the state to VALIDATED.
    surveyUnit = updateSurveyUnit({}, 'VALIDATED')

    return onDefinitiveQuit(surveyUnit)
  }

  return {
    orchestratorOnQuit,
    orchestratorOnDefinitiveQuit,
  }
}
