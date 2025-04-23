import type { Variable } from '@inseefr/lunatic/type.source'

import { EXTERNAL_RESOURCES_URL } from '@/core/constants'
import type {
  PageTag,
  Questionnaire,
  SurveyUnit,
  SurveyUnitData,
} from '@/core/model'

import type { Component, Components } from '../lunaticType'

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

// check if the first subPage of an iteration is before lastReachedPage
export function isIterationReachable(
  currentPage: number,
  lastReachedPage: PageTag,
  iteration: number,
) {
  const maxPage = parseInt(lastReachedPage.split('.')[0])
  const maxIteration = parseInt(lastReachedPage.split('#')[1]) - 1
  if (currentPage < maxPage) {
    // no need to check iteration or subPage because we already reached the next page (out of the loop)
    return true
  }
  // currentPage = maxPage , so we check if we already reached the iteration
  if (iteration <= maxIteration) {
    // no need to check subPage beacause we just want to reach the first subPage of the iteration
    return true
  }
  return false
}

function getInitialData(
  surveyUnitId: string,
  questionnaireId: string,
  data?: SurveyUnitData,
): SurveyUnitData {
  if (!EXTERNAL_RESOURCES_URL) return data ?? {}
  return {
    ...data,
    EXTERNAL: {
      ...data?.EXTERNAL,
      GLOBAL_QUESTIONNAIRE_ID: questionnaireId,
      GLOBAL_SURVEY_UNIT_ID: surveyUnitId,
    },
  }
}

export function getSource(source: Questionnaire): Questionnaire {
  if (!EXTERNAL_RESOURCES_URL) return source
  const globalExternalVariables = [
    {
      name: 'GLOBAL_QUESTIONNAIRE_ID',
      value: null,
      variableType: 'EXTERNAL',
    },
    {
      name: 'GLOBAL_SURVEY_UNIT_ID',
      value: null,
      variableType: 'EXTERNAL',
    },
  ] as Variable[]
  return {
    ...source,
    variables: [...source.variables, ...globalExternalVariables],
  }
}

export function getinitialSurveyUnit(
  partial?: Partial<SurveyUnit>,
): SurveyUnit {
  const surveyUnitId = partial?.id ?? ''
  const questionnaireId = partial?.questionnaireId ?? ''

  return {
    id: surveyUnitId,
    questionnaireId: questionnaireId,
    personalization: partial?.personalization,
    data: getInitialData(surveyUnitId, questionnaireId, partial?.data),
    comment: partial?.comment,
    stateData: partial?.stateData ?? {
      state: null,
      date: new Date().getTime(),
      currentPage: '1',
    },
  }
}
