import type { State as RootState } from "core/setup";
import { name } from "./state";
import { createSelector } from "@reduxjs/toolkit";

const state = (rootState: RootState) => rootState[name];

const runningState = createSelector(state, (state) => {
  if (state.stateDescription === "not running") {
    return undefined;
  }
  return state;
});

const uploadingState = createSelector(runningState, (state) => {
  if (state === undefined || state.type !== "upload") {
    return undefined;
  }
  return state;
});

const downloadingState = createSelector(runningState, (state) => {
  if (state === undefined || state.type !== "download") {
    return undefined;
  }
  return state;
});

const isRunning = createSelector(runningState, (state) => state !== undefined);

const isUploading = createSelector(
  uploadingState,
  (state) => state !== undefined
);

const isDownloading = createSelector(
  downloadingState,
  (state) => state !== undefined
);

const surveyUnitProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined;
  }
  if (state.surveyUnitCompleted === 0 && state.totalSurveyUnit === 0)
    return 100;
  return (state.surveyUnitCompleted * 100) / state.totalSurveyUnit;
});
const nomenclatureProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined;
  }
  if (state.nomenclatureCompleted === 0 && state.totalNomenclature === 0)
    return 100;
  return (state.nomenclatureCompleted * 100) / state.totalNomenclature;
});
const surveyProgress = createSelector(downloadingState, (state) => {
  if (state === undefined) {
    return undefined;
  }
  if (state.surveyCompleted === 0 && state.totalSurvey === 0) return 100;
  return (state.surveyCompleted * 100) / state.totalSurvey;
});

const uploadProgress = createSelector(uploadingState, (state) => {
  if (state === undefined) return undefined;
  if (state.total === 0 && state.surveyUnitCompleted === 0) return 100;
  return (state.surveyUnitCompleted * 100) / state.total;
});

export const selectors = {
  isRunning,
  isDownloading,
  isUploading,
  surveyUnitProgress,
  nomenclatureProgress,
  surveyProgress,
  uploadProgress,
};
