import { db } from 'indexedDb'
import { useParams } from 'react-router-dom'
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

  //return <Navigate to={(`/queen/${readonly ? `${readonly}/` : ''}questionnaire/${surveyUnit?.questionnaireId}/survey-unit/${id}`)} />
  //We know that we will reload the entire app but it's due on purpose
  //Because of a faulty architecture and a queen non-modification constraint, we need to know which queen we're going to redirect to when the DramaQueen is mounted.
  window.location.href = `/queen/${readonly ? `${readonly}/` : ''}questionnaire/${surveyUnit?.questionnaireId}/survey-unit/${id}`;
  return null;
}
