import { db } from 'indexedDb'
import { useParams, Navigate } from 'react-router-dom'
import { useLiveQuery } from "dexie-react-hooks";
import { READ_ONLY } from "utils/constants";

type Params = {
  readonly?: typeof READ_ONLY;
  id: string;
}

export function SurveyUnitMapping() {
  const { readonly, id } = useParams<Params>();

  const surveyUnit = useLiveQuery(
    () => db.surveyUnit.get({ id: id }), [id]
  )

  if (!surveyUnit) return <div>In Progress</div>

  return <Navigate to={(`/queen/${readonly ? `${readonly}/` : ''}questionnaire/${surveyUnit?.questionnaireId}/survey-unit/${id}`)} />
}
