import type { Component, Components } from '../../lunaticType'

/**
 * temporary : should be handle by Lunatic
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
 * temporary : should be handle by Lunatic
 */
function countMissingResponseInPage(components: Components) {
  return components.reduce((total, component) => {
    return total + countMissingResponseInComponent(component)
  }, 0)
}

/**
 * Whether or not we should go on next page on a value has changed.
 *
 * It is true if we have only one component that is a radio or checkbox,
 * or if the response is a "don't know" / "refusal".
 */
export function shouldAutoNext(
  components: Components,
  valueChange: {
    name: string
    value: any
    iteration?: number[]
  }[],
): boolean {
  const firstComponent = components[0]
  // If it's a question we need to look at its components instead
  if (firstComponent.componentType === 'Question') {
    return shouldAutoNext(firstComponent.components, valueChange)
  }
  // at least one missing value has been selected
  const hasMissingValue = valueChange.some(
    (variable) =>
      variable.name.includes('_MISSING') &&
      ['DK', 'RF'].includes(variable.value),
  )
  if (
    // There is only one "don't know / refusal" variable on the page
    countMissingResponseInPage(components) === 1 &&
    // One of the values changed is a "don't know / refusal" response, or the current component is a radio or checkbox
    (hasMissingValue ||
      (firstComponent.componentType &&
        ['Radio', 'CheckboxBoolean', 'CheckboxOne'].includes(
          firstComponent.componentType,
        )))
  ) {
    return true
  }
  return false
}
