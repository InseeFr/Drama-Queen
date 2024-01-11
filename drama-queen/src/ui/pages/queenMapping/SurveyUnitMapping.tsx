import { useParams } from 'react-router-dom'
import { READ_ONLY } from 'ui/constants'

type Params = {
  readonly?: typeof READ_ONLY
  id: string
}

export function SurveyUnitMapping() {
  const { readonly, id } = useParams<Params>()

  return <div>Survey Unit Mapping id : {id}</div>
}
