import type { useLunatic } from '@inseefr/lunatic'

type ItemOf<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Overview = ReturnType<typeof useLunatic>['overview']
export type OverviewItem = ItemOf<Overview>

export type GoToPage = ReturnType<typeof useLunatic>['goToPage']
