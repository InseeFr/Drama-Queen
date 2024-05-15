import type { LunaticState, LunaticOptions } from '@inseefr/lunatic'

type ItemOf<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Overview = LunaticState['overview']
export type OverviewItem = ItemOf<Overview>

export type GoToPage = LunaticState['goToPage']
export type GoPreviousPage = LunaticState['goPreviousPage']
export type GoNextPage = LunaticState['goNextPage']

export type GetChangedData = LunaticState['getChangedData']

export type GetReferentiel = LunaticOptions['getReferentiel']

// TEMP: Nomenclature should be type used by Lunatic, but it needed to be changed because awaiting too much variables
// export type Nomenclature = Awaited<ReturnType<NonNullable<GetReferentiel>>>
export type Nomenclature = ({
  id: string
  label?: string
} & {
  [key: string]: string
})[]

export type Components = ReturnType<LunaticState['getComponents']>
export type Component = Components[number]
