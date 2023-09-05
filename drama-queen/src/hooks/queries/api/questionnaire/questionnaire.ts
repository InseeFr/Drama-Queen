import { useQueries, useQuery } from "@tanstack/react-query";
import { useGetNomenclatures } from "./nomenclature";
import { useQueenApi } from "ui/queenApi";
import { QuestionnaireSyncError } from "hooks/queries/SyncError";

export const useGetQuestionnaire = (idQuestionnaire: string) => {
  const { getQuestionnaire } = useQueenApi();
  return useQuery({
    queryKey: ["survey", idQuestionnaire],
    queryFn: () => getQuestionnaire(idQuestionnaire),
  });
};

export const useGetQuestionnaires = (questionnaireIds: string[]) => {
  const { getQuestionnaire } = useQueenApi();
  return useQueries({
    queries: questionnaireIds.map((questionnaireId) => ({
      queryKey: ["questionnaire", questionnaireId],
      queryFn: () => getQuestionnaire(questionnaireId).catch(e => {
        throw new QuestionnaireSyncError(e, questionnaireId)
      }),
    })),
  });
};
