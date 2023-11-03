import { useCallback, useRef } from 'react';
import { sendCompletedEvent, sendStartedEvent, sendValidatedEvent } from 'utils/communication';
import { useConstCallback } from './useConstCallback';

export const NOT_STARTED = null;
export const INIT = 'INIT';
export const COMPLETED = 'COMPLETED';
export const VALIDATED = 'VALIDATED';

export const useQuestionnaireState = (idSurveyUnit, initialState = NOT_STARTED) => {
  const stateRef = useRef(initialState);
  const getState = useCallback(() => stateRef.current, []);

  // Send an event when questionnaire's state has changed (started, completed, validated)
  const changeState = useConstCallback(newState => {
    if (newState === INIT) sendStartedEvent(idSurveyUnit);
    if (newState === COMPLETED) sendCompletedEvent(idSurveyUnit);
    if (newState === VALIDATED) sendValidatedEvent(idSurveyUnit);
    stateRef.current = newState;
  });
  const onDataChange = useConstCallback((newData = {}) => {
    const { COLLECTED = {} } = newData;
    const hasDataChanged = Object.keys(COLLECTED).length > 0;

    if (stateRef.current === NOT_STARTED) {
      changeState(INIT);
    } else if (stateRef.current === VALIDATED && hasDataChanged) {
      // state VALIDATED et données entrantes !== données initiales
      changeState(INIT);
    } else {
      // here we do nothing
      console.log({ newData, state: stateRef.current });
    }
  });

  // Analyse collected variables to update state (only to STARTED state)

  return [getState, changeState, onDataChange];
};
