import type {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'

/** Object sent to telemetry API  */
export type Paradata = {
  idInterrogation: string
  events: TelemetryEvent[]
}

/** Telemetry event */
export type TelemetryEvent = DefaultParadataValues &
  TelemetryParadata & {
    date: string // ISO 8601
  }

/** Values that are set up once and added to every telemetry event */
export type DefaultParadataValues = {
  idInterrogation: string
  sid?: string
  userAgent?: string
}

/** Paradata values computed for every events */
export type TelemetryParadata = CommonParadata &
  (InitParadata | ExitParadata | PageParadata | ControlParadata)

/** Paradata values computed for every events */
export type CommonParadata = {
  /** date in ISO 8601 */
  date: string
}

/** Event sent when the user logs in the orchestrator */
export type InitParadata = {
  type: TELEMETRY_EVENT_TYPE.INIT
}

/** Event sent when the user logs out of the orchestrator */
export type ExitParadata = {
  source:
    | TELEMETRY_EVENT_EXIT_SOURCE.QUIT
    | TELEMETRY_EVENT_EXIT_SOURCE.DEFINITIVE_QUIT
  type: TELEMETRY_EVENT_TYPE.EXIT
}

/** Event sent when the user changes page through navigation buttons such as
 * 'next' and 'previous' within the orchestrator */
export type PageParadata = {
  page: string
  pageTag: string
  type: TELEMETRY_EVENT_TYPE.NEW_PAGE
}

/** Event sent when the user triggers a control or chooses to skip it */
export type ControlParadata = {
  controlIds: string[]
  type: TELEMETRY_EVENT_TYPE.CONTROL | TELEMETRY_EVENT_TYPE.CONTROL_SKIP
}
