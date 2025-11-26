export type LeafStateState = 'NOT_INIT' | 'INIT' | 'COMPLETED' | null

export type LeafState = {
  state: LeafStateState
  date: number
  cells?: { label: string; value: string }[]
}
