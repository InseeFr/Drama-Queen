import type { PageTag, SurveyUnit, SurveyUnitData } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import type { GetChangedData, GetData } from '@/models/lunaticType'

type UseQueenNavigationProps = {
  getChangedData: GetChangedData
  getData: GetData
  includeCalculatedVariables?: boolean
  onDefinitiveQuit: (surveyUnit: SurveyUnit) => void
  onQuit: (surveyUnit: SurveyUnit) => void
  updateSurveyUnit: (
    changedData: SurveyUnitData,
    options?: { currentPage?: PageTag; forcedState?: QuestionnaireState },
  ) => SurveyUnit
}

/** Override navigation function to send updates to back-end. */
export function useQueenNavigation({
  getChangedData,
  getData,
  includeCalculatedVariables = false,
  onDefinitiveQuit,
  onQuit,
  updateSurveyUnit,
}: UseQueenNavigationProps) {
  const computeAndUpdateSurveyUnit = (currentPage: PageTag): SurveyUnit => {
    let surveyUnit
    if (includeCalculatedVariables) {
      surveyUnit = updateSurveyUnit(getData(true) as SurveyUnitData, {
        currentPage,
      })
    } else {
      surveyUnit = updateSurveyUnit(getChangedData(true) as SurveyUnitData, {
        currentPage,
      })
    }
    return surveyUnit
  }

  const orchestratorOnQuit = (currentPage: PageTag) => {
    const surveyUnit = computeAndUpdateSurveyUnit(currentPage)
    return onQuit(surveyUnit)
  }

  const orchestratorOnDefinitiveQuit = (currentPage: PageTag) => {
    let surveyUnit = computeAndUpdateSurveyUnit(currentPage)

    // Force the state to COMPLETED only for sending the event.
    // Completed state should be defined by an algorithm.
    surveyUnit = updateSurveyUnit(surveyUnit.data, {
      currentPage,
      forcedState: 'COMPLETED',
    })

    // Force the state to VALIDATED.
    surveyUnit = updateSurveyUnit(surveyUnit.data, {
      currentPage,
      forcedState: 'VALIDATED',
    })

    return onDefinitiveQuit(surveyUnit)
  }

  return {
    orchestratorOnQuit,
    orchestratorOnDefinitiveQuit,
  }
}
