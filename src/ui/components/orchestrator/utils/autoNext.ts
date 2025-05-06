import type { InterpretedOption } from '@inseefr/lunatic/use-lunatic/props/propOptions'

import type { Component, Components, ValueChange } from '../lunaticType'

/**
 * Whether or not we should go on next page when a value has changed.
 *
 * It can only be true if we have only one component in the page and one of:
 * - the response if a "don't know" / "refusal"
 * - the component is a simple checkbox
 * - the component is a radio / checkbox and the selected option does not ask
 *   for clarification
 */
export function shouldAutoNext(
  components: Components,
  valueChange: ValueChange,
): boolean {
  const firstComponent = components[0]

  // a Question component is a wrapper, we have to check its children
  if (firstComponent.componentType === 'Question') {
    return shouldAutoNext(firstComponent.components, valueChange)
  }

  // there is multiple "don't know" / "refusal" variables in the page
  if (countMissingResponseInPage(components) !== 1) return false

  // the respondent answered "don't know" / "refusal"
  if (isResponseMissing(valueChange)) return true

  // the component is a simple checkbox
  if (firstComponent.componentType === 'CheckboxBoolean') return true

  // the component is a radio or checkbox but these components can ask for
  // clarification so we must check if the selected option does not ask for
  // clarification
  if (
    firstComponent.componentType === 'Radio' ||
    firstComponent.componentType === 'CheckboxOne'
  ) {
    // Respondent is answering the clarification part
    if (valueChange[0].name !== firstComponent.response.name) return false

    // Do not skip if there is a clarification label since the respondent
    // should be able to fill it
    return !optionHasClarification(firstComponent.options, valueChange[0].value)
  }

  return false
}

/**
 * temporary : should be handled by Lunatic
 */
function countMissingResponseInComponent(component: Component): number {
  let factor = 1
  // When we are Loop (not paginated), we have to compute the total of component repetition
  if (
    'iterations' in component &&
    ('paginatedLoop' in component ||
      ('paginatedLoop' in component && !component.paginatedLoop))
  ) {
    factor = component.iterations
  }
  if ('components' in component && Array.isArray(component.components)) {
    const components = component.components
    return (
      factor *
      components.reduce((total, subComponent: any) => {
        return total + countMissingResponseInComponent(subComponent)
      }, 0)
    )
  }
  return 'missingResponse' in component && component?.missingResponse?.name
    ? 1
    : 0
}

/**
 * temporary : should be handled by Lunatic
 */
function countMissingResponseInPage(components: Components) {
  return components.reduce((total, component) => {
    return total + countMissingResponseInComponent(component)
  }, 0)
}

/**
 * We can guess that the provided response value is a "don't know", "refusal"
 * if its variable name includes a `'_MISSING'`.
 */
function isResponseMissing(valueChange: ValueChange): boolean {
  const hasMissingValue = valueChange.some(
    (variable) =>
      variable.name.includes('_MISSING') &&
      ['DK', 'RF'].includes(variable.value),
  )
  return hasMissingValue
}

/** Whether or not the selected option has a clarification. */
function optionHasClarification(
  options: InterpretedOption[],
  selectedValue: any,
): boolean {
  for (const option of options) {
    if (option.value === selectedValue) {
      return !!option.detailLabel
    }
  }

  return false
}
