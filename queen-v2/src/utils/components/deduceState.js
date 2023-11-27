import { COMP_TYPE_SEQUENCE, COMP_TYPE_SUBSEQUENCE } from 'utils/constants';

/**
 * TODO: remove this code when this issue of Lunatic will be treated : https://github.com/InseeFr/Lunatic/issues/771
 */
export const isSequenceOrSubsequenceComponent = component => {
  if (component === undefined) return false;

  // check for missingResponse
  if (![undefined, null, {}].includes(component?.missingResponse?.value)) return true;

  const { componentType } = component;
  return [COMP_TYPE_SEQUENCE, COMP_TYPE_SUBSEQUENCE].includes(componentType);
};
