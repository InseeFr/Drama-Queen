import { useCallback, useRef } from 'react'
import { useLunatic } from '@inseefr/lunatic'
import {
  countMissingResponseInComponent,
  countMissingResponseInPage,
} from './functions'

type PartialLunatic = Pick<
  ReturnType<typeof useLunatic>,
  'getComponents' | 'goNextPage' | 'getData'
>

/**
 * Creates a callback to go to the next page automatically when changing the value of a checkbox / radio
 *
 * This behaviour assumes we only have one component per page
 */
export function useAutoNext() {
  const ref = useRef<PartialLunatic | null>(null)

  const onChange = useCallback((valueChange: { name: string }) => {
    if (ref.current === null) return
    const { getComponents, goNextPage, getData } = ref.current

    const variableChanged = valueChange?.name
    const components = getComponents()
    const firstComponent = components[0]
    if (
      // There is only one "don't know / refusal" variable on the page
      countMissingResponseInPage(components) === 1 &&
      // The value changed is a "don't know / refusal" response, or the current component is a radio or checkbox
      (variableChanged.includes('_MISSING') ||
        ['Radio', 'CheckboxBoolean', 'CheckboxOne'].includes(
          firstComponent.componentType
        ))
    ) {
      goNextPage()
    }
  }, [])

  return {
    onChange,
    ref,
  }
}
