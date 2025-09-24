/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import type {
  DefaultParadataValues,
  Paradata,
  TelemetryEvent,
  TelemetryParadata,
} from '@/core/model/telemetry'
import { useBatch } from '@/hooks/useBatch'

type TelemetryContextType = {
  isTelemetryDisabled: boolean
  pushEvent: (e: TelemetryParadata) => void | Promise<boolean>
  setDefaultValues: (e: DefaultParadataValues) => void
  triggerBatchTelemetryCallback?: () => Promise<void>
}

/** Mandatory values used as a context's last-resort fallback. */
const defaultValues = {
  isTelemetryDisabled: true,
  pushEvent: (_: TelemetryParadata) => {},
  setDefaultValues: (_: DefaultParadataValues) => {},
}

/**
 * Expose shared functions to handle telemetry events.
 *
 * Should be used with the useBatch hook to reduce external API load.
 */
export const TelemetryContext: React.Context<TelemetryContextType> =
  createContext(defaultValues)

/**
 * Return the current telemetry context value.
 *
 * @version 1.3.0
 * @see https://react.dev/reference/react/useContext
 */
export function useTelemetry() {
  return useContext(TelemetryContext)
}

/**
 * Initialize the telemetry context with a batch system.
 *
 * A batch mechanism will be used to avoid sending too many event to the API.
 * It can be configured through the environment variables
 * `VITE_TELEMETRY_MAX_DELAY` and `VITE_TELEMETRY_MAX_LENGTH`.
 */
export function TelemetryProvider({
  children,
  addParadata,
}: Readonly<{
  children: React.ReactElement
  addParadata: (paradata: Paradata) => Promise<void>
}>) {
  const isTelemetryDisabled = import.meta.env.VITE_TELEMETRY_DISABLED === 'true'

  const [defaultValues, setDefaultValues] = useState<DefaultParadataValues>({
    idInterrogation: '',
    userAgent: navigator.userAgent,
  })

  /** Push events to telemetry API after an arbitrary number of events or a delay. */
  const pushEvents = useCallback(
    async (events: Array<TelemetryEvent>) => {
      if (events.length > 0) {
        return addParadata({
          idInterrogation: events[0].idInterrogation,
          events,
        })
      }
    },
    [addParadata],
  )

  const { addDatum, triggerTimeoutEvent } = useBatch(pushEvents)

  /** Add the event to a batch mechanism. */
  const pushEvent = useCallback(
    (event: TelemetryParadata) => {
      addDatum({ ...defaultValues, ...event })
    },
    [addDatum, defaultValues],
  )

  /** Add values that will be appended to every telemetry event (e.g. user id) */
  const updateDefaultValues = useCallback(
    (newDefaultValues: DefaultParadataValues) => {
      setDefaultValues((oldValues: DefaultParadataValues) => ({
        ...oldValues,
        ...newDefaultValues,
      }))
    },
    [],
  )

  const telemetryContextValues = useMemo(
    () => ({
      isTelemetryDisabled,
      pushEvent,
      setDefaultValues: updateDefaultValues,
      triggerBatchTelemetryCallback: triggerTimeoutEvent,
    }),
    [isTelemetryDisabled, pushEvent, triggerTimeoutEvent, updateDefaultValues],
  )

  return (
    <TelemetryContext.Provider value={telemetryContextValues}>
      {children}
    </TelemetryContext.Provider>
  )
}
