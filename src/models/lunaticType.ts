import type {
  LunaticChangesHandler,
  LunaticOptions,
  LunaticState,
} from '@inseefr/lunatic'

type ItemOf<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Overview = LunaticState['overview']
export type OverviewItem = ItemOf<Overview>

export type GoToPage = LunaticState['goToPage']
export type GoPreviousPage = LunaticState['goPreviousPage']
export type GoNextPage = LunaticState['goNextPage']

export type GetChangedData = LunaticState['getChangedData']
export type GetData = LunaticState['getData']

export type GetReferentiel = LunaticOptions['getReferentiel']

export type Components = ReturnType<LunaticState['getComponents']>
export type Component = Components[number]

export type CompileControls = LunaticState['compileControls']
export type ValueChange = Parameters<LunaticChangesHandler>[0]
