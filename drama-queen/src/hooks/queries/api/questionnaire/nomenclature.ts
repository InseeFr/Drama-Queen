import { useQueries, useQuery } from "@tanstack/react-query";
import { NomenclatureSyncError } from "hooks/queries/SyncError";
import { useQueenApi } from "ui/queenApi";

export const useGetNomenclatures = (nomenclatureIds: string[]) => {
  const { getNomenclature } = useQueenApi();
  return useQueries({
    queries: nomenclatureIds.map((id) => ({
      queryKey: ["nomenclature", id],
      queryFn: () =>
        getNomenclature(id).catch((error) => {
          throw new NomenclatureSyncError(error, id);
        }),
    })),
  });
};

export const useGetNomenclature = (idNomenclature: string) => {
  const { getNomenclature } = useQueenApi();
  return useQuery({
    queryKey: ["nomenclature", idNomenclature],
    queryFn: () => getNomenclature(idNomenclature),
  });
};
