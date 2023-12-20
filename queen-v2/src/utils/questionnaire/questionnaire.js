import { MIN_ENO_CORE_VERSION, MIN_LUNATIC_MODEL_VERSION } from 'utils/constants';

const checkVersion = (actualVersion, expectedVersion) => {
  try {
    // split by "-" to prevent versions like "x.y.z-rc" or "x.y.z-feature"
    const [major, minor, patch] = expectedVersion
      .split('.')
      .map(v => parseInt(v.split('-')[0], 10));
    const [majorA, minorA, patchA] = actualVersion
      .split('.')
      .map(v => parseInt(v.split('-')[0], 10));

    if (majorA > major) return { valid: true };
    if (majorA === major && ((minorA === minor && patchA >= patch) || minorA > minor))
      return { valid: true };
    return { valid: false };
  } catch (e) {
    return { valid: false };
  }
};

// eslint-disable-next-line no-unused-vars
const checkVersions = ({ enoCoreVersion, lunaticModelVersion }) => {
  const { valid: enoValid } = checkVersion(enoCoreVersion, MIN_ENO_CORE_VERSION);
  const { valid: lunaticValid } = checkVersion(lunaticModelVersion, MIN_LUNATIC_MODEL_VERSION);
  if (!enoValid || !lunaticValid) {
    const enoMessage = !enoValid
      ? `The Eno version of questionnaire is not compatible (actual : ${enoCoreVersion}, min expected : ${MIN_ENO_CORE_VERSION}).`
      : '';
    const lunaticMessage = !lunaticValid
      ? `The Lunatic-Model version of questionnaire is not compatible (actual : ${lunaticModelVersion}, min expected : ${MIN_LUNATIC_MODEL_VERSION}).`
      : '';
    return {
      valid: enoValid && lunaticValid,
      error: `${enoMessage} ${lunaticMessage}`,
    };
  }
  return { valid: true };
};

export const checkQuestionnaire = ({
  enoCoreVersion,
  lunaticModelVersion,
  pagination,
  missingResponse,
}) => {
  const paginationValid = pagination === 'question';
  const missingResponseValid = missingResponse || true; //remove "|| true" when Eno is ready (2.2.10)
  const paginationError = paginationValid ? '' : `Pagination must be "question".`;
  const missingResponseError = missingResponseValid ? '' : `Missing response must be true`;
  if (!(paginationValid && missingResponseValid)) {
    return {
      valid: false,
      error: `Questionnaire is invalid : ${paginationError} ${missingResponseError}`,
    };
  }
  return { valid: true };
};

/**
 *
 * @param {*} source questionnaire source
 * @param {*} variables object of key, value
 */
export const addGlobalVariablesToQuestionnaire = (source = {}, globalVariables = {}) => {
  const { variables } = source;
  const newVariables = Object.entries(globalVariables).reduce((result, [name, value]) => {
    return [...result, { variableType: 'EXTERNAL', name: name, value: null }];
  }, variables);
  return { ...source, variables: newVariables };
};

export const addGlobalVariablesToData = (lunaticData = {}, globalVariables = {}) => {
  const { EXTERNAL } = lunaticData;
  const newEXTERNAL = Object.entries(globalVariables).reduce((result, [name, value]) => {
    return { ...result, [name]: value };
  }, EXTERNAL || {});

  return { ...lunaticData, EXTERNAL: newEXTERNAL };
};

export const countMissingResponseInComponent = component => {
  let factor = 1;
  // When we are Loop (not paginated), we have to compute the total of component repetition
  if ('iterations' in component && !component.paginatedLoop) factor = component.iterations;
  if ('components' in component && Array.isArray(component.components)) {
    return (
      factor *
      component.components.reduce((total, subComponent) => {
        return total + countMissingResponseInComponent(subComponent);
      }, 0)
    );
  }
  return component?.missingResponse?.name ? 1 : 0;
};

export const countMissingResponseInPage = (components = []) => {
  return components.reduce((total, component) => {
    return total + countMissingResponseInComponent(component);
  }, 0);
};
