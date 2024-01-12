import { useParams } from 'react-router-dom'
import { READ_ONLY } from 'ui/constants'

type Params = {
  readonly?: typeof READ_ONLY
  id: string
}

export function SurveyUnitMapping() {
  // When this component is displayed this means that there is an Error 
  /**
   * I proposed to delete this component in order to make a generic error route, and that loader pass messageError directly
   */  

  const { id } = useParams<Params>()

  return <div>Survey Unit Mapping id : {id}</div>
}
