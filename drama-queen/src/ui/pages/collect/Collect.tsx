import { useParams } from 'react-router-dom'
import type { collectLoader } from 'ui/routing/loader';
import { useLoaderData } from 'ui/routing/utils';

export function Collect() {
  const { questionnaireId, surveyUnitId } = useParams<{
    surveyUnitId: string
    questionnaireId: string
  }>();
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof collectLoader>>

  console.log(loaderData.isQueenV2);

  return <div>Collect : {surveyUnitId} with questionnaire {questionnaireId}</div>
}
