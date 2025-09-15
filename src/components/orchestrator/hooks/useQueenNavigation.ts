import type { Interrogation, InterrogationData, PageTag } from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import type { GetChangedData, GetData } from '@/models/lunaticType'

type UseQueenNavigationProps = {
  getChangedData: GetChangedData
  getData: GetData
  includeCalculatedVariables?: boolean
  onDefinitiveQuit: (interrogation: Interrogation) => void
  onQuit: (interrogation: Interrogation) => void
  updateInterrogation: (
    changedData: InterrogationData,
    options?: { currentPage?: PageTag; forcedState?: QuestionnaireState },
  ) => Interrogation
}

/** Override navigation function to send updates to back-end. */
export function useQueenNavigation({
  getChangedData,
  getData,
  includeCalculatedVariables = false,
  onDefinitiveQuit,
  onQuit,
  updateInterrogation,
}: UseQueenNavigationProps) {
  const computeAndUpdateInterrogation = (
    currentPage: PageTag,
  ): Interrogation => {
    let interrogation
    if (includeCalculatedVariables) {
      interrogation = updateInterrogation(getData(true) as InterrogationData, {
        currentPage,
      })
    } else {
      interrogation = updateInterrogation(
        getChangedData(true) as InterrogationData,
        {
          currentPage,
        },
      )
    }
    return interrogation
  }

  const orchestratorOnQuit = (currentPage: PageTag) => {
    const interrogation = computeAndUpdateInterrogation(currentPage)
    return onQuit(interrogation)
  }

  const orchestratorOnDefinitiveQuit = (currentPage: PageTag) => {
    let interrogation = computeAndUpdateInterrogation(currentPage)

    // Force the state to COMPLETED only for sending the event.
    // Completed state should be defined by an algorithm.
    interrogation = updateInterrogation(interrogation.data, {
      currentPage,
      forcedState: 'COMPLETED',
    })

    // Force the state to VALIDATED.
    interrogation = updateInterrogation(interrogation.data, {
      currentPage,
      forcedState: 'VALIDATED',
    })

    return onDefinitiveQuit(interrogation)
  }

  return {
    orchestratorOnQuit,
    orchestratorOnDefinitiveQuit,
  }
}
