import { useCallback, useRef } from 'react'
import { useLunatic } from '@inseefr/lunatic'
import { countMissingResponseInPage } from './functions'

type PartialLunatic = Pick<
  ReturnType<typeof useLunatic>,
  'getComponents' | 'goNextPage'
>

/**
 * Creates a callback to go to the next page automatically when changing the value of a checkbox / radio / missing
 */
export function useAutoNext() {
  const ref = useRef<PartialLunatic | null>(null)

  const onChange = useCallback(
    (
      valueChange: {
        name: string
        value: any
        iteration?: number[]
      }[]
    ) => {
      if (ref.current === null) return
      const { getComponents, goNextPage } = ref.current
      const components = getComponents()
      const firstComponent = components[0]
      // at least one missing value has been selected
      const hasMissingValue = valueChange.some(
        (variable) =>
          variable.name.includes('_MISSING') &&
          ['DK', 'RF'].includes(variable.value)
      )
      if (
        // There is only one "don't know / refusal" variable on the page
        countMissingResponseInPage(components) === 1 &&
        // One of the values changed is a "don't know / refusal" response, or the current component is a radio or checkbox
        (hasMissingValue ||
          (firstComponent.componentType &&
            ['Radio', 'CheckboxBoolean', 'CheckboxOne'].includes(
              firstComponent.componentType
            )))
      ) {
        goNextPage()
      }
    },
    []
  )

  return {
    onChange,
    ref,
  }
}
