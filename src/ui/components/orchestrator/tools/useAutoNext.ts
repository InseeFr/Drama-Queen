import { useLunatic } from '@inseefr/lunatic'

import { useCallback, useRef } from 'react'

import { shouldAutoNext } from './functions'

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
      }[],
    ) => {
      if (ref.current === null) return
      const { getComponents, goNextPage } = ref.current
      const components = getComponents()
      if (shouldAutoNext(components, valueChange)) {
        goNextPage()
      }
    },
    [],
  )

  return {
    onChange,
    ref,
  }
}
