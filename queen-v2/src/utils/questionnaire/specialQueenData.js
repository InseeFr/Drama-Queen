import * as lunatic from '@inseefr/lunatic';

export const getStateToSave = questionnaire => lunatic.getState(questionnaire);
export const getNotNullCollectedState = questionnaire =>
  lunatic.getCollectedStateByValueType(questionnaire)('COLLECTED', false);

export const getFullData = (oldData = {}, partialData = {}) => {
  const {
    CALCULATED: oldCALCULATED = {},
    EXTERNAL: oldEXTERNAL = {},
    COLLECTED: oldCOLLECTED = {},
  } = oldData;
  const {
    CALCULATED: partialCALCULATED = {},
    EXTERNAL: partialEXTERNAL = {},
    COLLECTED: partialCOLLECTED = {},
  } = partialData;

  return {
    CALCULATED: { ...oldCALCULATED, ...partialCALCULATED },
    EXTERNAL: { ...oldEXTERNAL, ...partialEXTERNAL },
    COLLECTED: { ...oldCOLLECTED, ...partialCOLLECTED },
  };
};

export const removeNullCollectedData = (data = {}) => {
  const { COLLECTED } = data;
  let newCollected = Object.keys(COLLECTED).reduce((returnedValue, variableName) => {
    const newContent = Object.keys(COLLECTED[variableName]).reduce((returnedContent, type) => {
      if (COLLECTED[variableName][type] !== null) {
        return { ...returnedContent, [type]: COLLECTED[variableName][type] };
      }
      return returnedContent;
    }, {});

    return { ...returnedValue, [variableName]: newContent };
  }, {});

  return {
    ...data,
    COLLECTED: newCollected,
  };
};
