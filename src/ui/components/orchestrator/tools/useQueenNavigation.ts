import { useCallback, useEffect, useState } from 'react'

import type {
  CollectedValues,
  PageTag,
  SurveyUnit,
  SurveyUnitData,
} from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'

import type { GetChangedData } from '../lunaticType'

type UseQueenNavigationProps = {
  initialSurveyUnit: SurveyUnit
  lastReachedPage: PageTag | undefined
  pageTag: PageTag
  isWelcomeModalOpen: boolean
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
export function useQueenNavigation({
  initialSurveyUnit,
  lastReachedPage,
  pageTag,
  isWelcomeModalOpen,
  getChangedData,
  onQuit,
  onDefinitiveQuit,
  onChangePage,
  onChangeSurveyUnitState,
}: UseQueenNavigationProps) {
  // handle state to check when it changes
  const [surveyUnitState, setSurveyUnitState] = useState<QuestionnaireState>(
    initialSurveyUnit.stateData?.state ?? null,
  )
  const [surveyUnitData, setSurveyUnitData] = useState<SurveyUnitData>(
    initialSurveyUnit.data,
  )

  const isLastReachedPage =
    lastReachedPage === undefined || pageTag === lastReachedPage

  const getHasDataChanged = (changedData: SurveyUnitData) => {
    if (changedData.COLLECTED) {
      return Object.keys(changedData.COLLECTED).length > 0
    }
    return false
  }

  // get full data using changedData
  const getFullData = (
    currentData: SurveyUnitData,
    changedData: SurveyUnitData,
  ): SurveyUnitData => {
    return {
      CALCULATED: { ...currentData.CALCULATED, ...changedData.CALCULATED },
      EXTERNAL: { ...currentData.EXTERNAL, ...changedData.EXTERNAL },
      COLLECTED: { ...currentData.COLLECTED, ...changedData.COLLECTED },
    }
  }

  // remove null data from COLLECTED data
  const removeNullCollectedData = (
    data: SurveyUnitData = {},
  ): SurveyUnitData => {
    const { COLLECTED } = data || {}

    if (!COLLECTED) {
      return data
    }

    const newCollected: typeof COLLECTED = Object.entries(COLLECTED).reduce(
      (acc: typeof COLLECTED, [variableName, content]) => {
        // Reduce each content object to remove null values
        const cleanedContent: CollectedValues = Object.entries(content).reduce(
          (accContent, [type, value]) => {
            // If the value is not null, we keep it
            if (value !== null) {
              accContent[type as keyof CollectedValues] = value
            }
            return accContent
          },
          {} as CollectedValues,
        )
        acc[variableName] = cleanedContent

        return acc
      },
      {},
    )

    return {
      ...data,
      COLLECTED: newCollected,
    }
  }

  const handleData = useCallback(() => {
    const changedData = getChangedData(true) as SurveyUnitData
    const hasDataChanged = getHasDataChanged(changedData)

    // get updated data
    const newData = hasDataChanged
      ? getFullData(surveyUnitData, removeNullCollectedData(changedData))
      : surveyUnitData
    setSurveyUnitData(newData)

    return {
      hasDataChanged: hasDataChanged,
      data: newData,
    }
  }, [getChangedData, surveyUnitData])

  // updates the surveyUnitState
  const updateState = useCallback(
    (newState: QuestionnaireState) => {
      onChangeSurveyUnitState({
        surveyUnitId: initialSurveyUnit.id,
        newState: newState,
      })
      setSurveyUnitState(newState)
    },
    [initialSurveyUnit.id, onChangeSurveyUnitState],
  )

  const handleState = useCallback(
    (hasDataChanged: boolean, forcedState?: QuestionnaireState) => {
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
    },
    [surveyUnitState, updateState],
  )

  // get the updated SurveyUnit
  const getUpdatedSurveyUnit = useCallback(
    (state: QuestionnaireState, data: SurveyUnitData): SurveyUnit => {
      const surveyUnit = {
        ...initialSurveyUnit,
        data,
        stateData: {
          state: state,
          date: new Date().getTime(),
          currentPage: pageTag ?? '1',
        },
      }
      return surveyUnit
    },
    [initialSurveyUnit, pageTag],
  )

  // handle updated surveyUnit when page changes
  useEffect(() => {
    if (
      pageTag === undefined ||
      lastReachedPage === undefined ||
      isWelcomeModalOpen
    ) {
      return
    }
    // get updated data
    const { hasDataChanged, data } = handleData()

    // get updated state
    const state = handleState(hasDataChanged)

    const surveyUnit = getUpdatedSurveyUnit(state, data)
    return onChangePage(surveyUnit)
  }, [
    pageTag,
    lastReachedPage,
    isWelcomeModalOpen,
    handleData,
    handleState,
    getUpdatedSurveyUnit,
    onChangePage,
  ])

  const orchestratorQuit = () => {
    // get updated data
    const { hasDataChanged, data } = handleData()

    // get updated state
    const state = handleState(hasDataChanged)

    const surveyUnit = getUpdatedSurveyUnit(state, data)
    return onQuit(surveyUnit)
  }

  const orchestratorDefinitiveQuit = () => {
    // get updated data
    const { hasDataChanged, data } = handleData()

    // get updated state
    handleState(hasDataChanged)
    // forces the state to COMPLETED only for sending the event. Completed state should be defined by an algorithm.
    handleState(false, 'COMPLETED')
    // forces the state to VALIDATED
    const state = handleState(false, 'VALIDATED')

    const surveyUnit = getUpdatedSurveyUnit(state, data)
    return onDefinitiveQuit(surveyUnit)
  }

  return {
    isLastReachedPage,
    surveyUnitData,
    orchestratorQuit,
    orchestratorDefinitiveQuit,
  }
}
