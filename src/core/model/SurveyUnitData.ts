import type { LunaticCollectedValue, LunaticData } from '@inseefr/lunatic'
import type { Extends } from 'tsafe/Extends'
import { assert } from 'tsafe/assert'

type VariableType =
  | string
  | number
  | boolean
  | (string | null | number | boolean | (string | null)[])[]
  | null

export type CollectedValues = Partial<
  Record<
    'COLLECTED' | 'EDITED' | 'FORCED' | 'INPUTED' | 'PREVIOUS',
    VariableType
  >
>

//Extends because we are more specific (lunatic use unknown)
assert<Extends<CollectedValues, LunaticCollectedValue>>()

export type SurveyUnitData = {
  CALCULATED?: Record<string, VariableType>
  EXTERNAL?: Record<string, VariableType>
  COLLECTED?: Record<string, CollectedValues>
}

assert<Extends<SurveyUnitData, Partial<LunaticData>>>()
