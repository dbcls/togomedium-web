import { useQuery } from "@tanstack/react-query";
import { ListResponse } from "@/types/responses.ts";
import { fetchData } from "@/utils/fetch.ts";

export const useListCount = (apiUrl: string): number => {
  const { data } = useQuery({
    queryKey: [apiUrl],
    queryFn: async () => {
      const response = await fetchData<ListResponse>(apiUrl);
      return response;
    },
    staleTime: Infinity,
  });
  return parseInt((data?.total ?? 0).toString());
};
