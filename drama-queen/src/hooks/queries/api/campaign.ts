import { useQuery } from "@tanstack/react-query";
import { useQueenApi } from "ui/queenApi";

export const useGetCampaigns = () => {
  const { getCampaigns } = useQueenApi();
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
  });
};