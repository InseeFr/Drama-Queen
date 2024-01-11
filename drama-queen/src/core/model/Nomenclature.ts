export type Nomenclature = ({
  id: string
  label?: string
} & {
  [key: string]: string
})[]

export type RequiredNomenclatures = string[]
