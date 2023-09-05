import { useQueries, useQuery } from "@tanstack/react-query";
import {
  CampaignSyncError,
  SurveyUnitSyncError,
} from "hooks/queries/SyncError";
import { useQueenApi } from "ui/queenApi";

type UserAttributePairValue =
  | string
  | { code: string; value: string }
  | { id: string; ref: string[] };
type UserAttributePair = Record<`extension:${string}`, UserAttributePairValue>;

export const useGetSurveyUnit = (idSurveyUnit: string) => {
  const { getSurveyUnit } = useQueenApi();
  return useQuery({
    queryKey: ["surveyUnit", idSurveyUnit],
    queryFn: () => getSurveyUnit(idSurveyUnit),
  });
};

export const useGetSurveyUnitsGroupedByCampaign = (campaignIds: string[]) => {
  const { getSurveyUnitsIdsAndQuestionnaireIdsByCampaign, getSurveyUnit } =
    useQueenApi();
  return useQueries({
    queries: campaignIds.map((campaignId) => ({
      queryKey: ["idSurveyUnit-questionnaireId", campaignId],
      queryFn: async () => {
        const data = await getSurveyUnitsIdsAndQuestionnaireIdsByCampaign(
          campaignId
        ).catch((e) => {
          throw new CampaignSyncError(e, campaignId);
        });
        return Promise.all(
          data.map(({ id }) => {
            return getSurveyUnit(id).catch((e) => {
              throw new SurveyUnitSyncError(e, id, campaignId);
            });
          })
        );
      },
    })),
  });
};
