import { TELEMETRY_EVENT_TYPE } from '@/constants/telemetry'
import type {
  CommonParadata,
  ExitParadata,
  TelemetryParadata,
} from '@/core/model/telemetry'

/**
 * Compute paradata values that are common to every paradata but must be
 * recalculated for each event (e.g. date).
 */
function getCommonData(): CommonParadata {
  return {
    date: new Date().toISOString(),
  }
}

/** Create an event to be used by telemetry context when the user starts the app. */
export function computeInitEvent(): TelemetryParadata {
  return {
    ...getCommonData(),
    type: TELEMETRY_EVENT_TYPE.INIT,
  }
}

/** Create an event to be used by telemetry context when the user quits the app. */
export function computeExitEvent({
  source,
}: {
  source: ExitParadata['source']
}): TelemetryParadata {
  return {
    ...getCommonData(),
    source,
    type: TELEMETRY_EVENT_TYPE.EXIT,
  }
}

/** Create an event to be used by telemetry context when the user goes to a new page.  */
export function computeNewPageEvent({
  page,
  pageTag,
}: {
  page: string
  pageTag: string
}): TelemetryParadata {
  return {
    ...getCommonData(),
    page,
    pageTag,
    type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
  }
}

/** Create an event to be used by telemetry context when lunatic shows a control to the user. */
export function computeControlEvent({
  controlIds,
}: {
  controlIds: string[]
}): TelemetryParadata {
  return {
    ...getCommonData(),
    controlIds,
    type: TELEMETRY_EVENT_TYPE.CONTROL,
  }
}

/** Create an event to be used by telemetry context when the user ignores the control shown by lunatic. */
export function computeControlSkipEvent({
  controlIds,
}: {
  controlIds: string[]
}): TelemetryParadata {
  return {
    ...getCommonData(),
    controlIds,
    type: TELEMETRY_EVENT_TYPE.CONTROL_SKIP,
  }
}
