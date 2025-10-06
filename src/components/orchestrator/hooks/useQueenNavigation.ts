import { TELEMETRY_EVENT_EXIT_SOURCE } from '@/constants/telemetry'
import type {
  Interrogation,
  InterrogationData,
  PageTag,
  TelemetryParadata,
} from '@/core/model'
import type { QuestionnaireState } from '@/core/model/QuestionnaireState'
import type { GetChangedData, GetData } from '@/models/lunaticType'
import { computeExitEvent } from '@/utils/telemetry'

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
  isTelemetryInitialized?: boolean
  pushEvent: (e: TelemetryParadata) => void | Promise<boolean>
  triggerBatchTelemetryCallback: (() => Promise<void>) | undefined
}

/** Override navigation function to send updates to back-end. */
export function useQueenNavigation({
  getChangedData,
  getData,
  includeCalculatedVariables = false,
  onDefinitiveQuit,
  onQuit,
  updateInterrogation,
  isTelemetryInitialized = false,
  pushEvent,
  triggerBatchTelemetryCallback,
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

  const handleQuitTelemetry = async (isDefinitiveQuit: boolean) => {
    if (isTelemetryInitialized) {
      await pushEvent(
        computeExitEvent({
          source: isDefinitiveQuit
            ? TELEMETRY_EVENT_EXIT_SOURCE.DEFINITIVE_QUIT
            : TELEMETRY_EVENT_EXIT_SOURCE.QUIT,
        }),
      )
      if (triggerBatchTelemetryCallback) {
        await triggerBatchTelemetryCallback()
      }
    }
  }

  const orchestratorOnQuit = async (currentPage: PageTag) => {
    await handleQuitTelemetry(false)

    const interrogation = computeAndUpdateInterrogation(currentPage)
    return onQuit(interrogation)
  }

  const orchestratorOnDefinitiveQuit = async (currentPage: PageTag) => {
    await handleQuitTelemetry(true)

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
