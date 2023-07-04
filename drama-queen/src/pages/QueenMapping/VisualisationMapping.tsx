import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isQueenV2Survey } from "utils/checkLunaticVersion/isQueenV2Survey";

export function VisualisationMapping() {
  const [searchParams,] = useSearchParams();
  const questionnaireUrl = searchParams.get("questionnaire")
  const [isQueenV2, setIsQueenV2] = useState<boolean | undefined>(undefined);
  const [isSurveyFetched, setIsSurveyFetched] = useState<boolean>(false);

  useEffect(() => {
    isQueenV2Survey(questionnaireUrl).then((r) => {
      setIsQueenV2(r);
      setIsSurveyFetched(true);
    }).catch((e) => {
      console.error("An error occured when fetching survey, by default we redirect to queen v1", e)
      setIsSurveyFetched(true)
      setIsQueenV2(false)
    })

  }, [questionnaireUrl]);

  if (!isSurveyFetched) return <div>Loading</div>

  return isQueenV2 ? <queen-v2-app /> : <queen-app />
}