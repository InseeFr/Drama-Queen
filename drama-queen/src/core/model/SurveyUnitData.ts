import type { LunaticData, LunaticCollectedValue } from "@inseefr/lunatic";
import { Equals, assert } from "tsafe/assert";
import type { Extends } from "tsafe/Extends";

type VariableType =
  | string
  | number
  | boolean
  | (string | null | number | boolean)[]
  | null;

type CollectedValues = Record<
  "COLLECTED" | "EDITED" | "FORCED" | "INPUTED" | "PREVIOUS",
  VariableType
>;

//Extends because we are more specific (lunatic use unknown)
assert<Extends<CollectedValues, LunaticCollectedValue>>();

export type SurveyUnitData = {
  CALCULATED?: Record<string, VariableType>;
  EXTERNAL?: Record<string, VariableType>;
  COLLECTED?: Record<string, CollectedValues>;
};

assert<Extends<SurveyUnitData, Partial<LunaticData>>>();