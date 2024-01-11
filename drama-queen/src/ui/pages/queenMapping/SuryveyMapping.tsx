import { useParams } from 'react-router-dom'

export function SurveyMapping() {
  const { questionnaireId } = useParams()

  return <div>Survey Mapping : {questionnaireId}</div>
}
