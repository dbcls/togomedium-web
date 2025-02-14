import { useQuery } from "@tanstack/react-query";
import { ListApiResponse } from "%api/ListApi.ts";
import { fetchData } from "@/utils/fetch.ts";

export const useListCount = (apiUrl: string): number => {
  const { data } = useQuery({
    queryKey: [apiUrl],
    queryFn: async () => {
      const response = await fetchData<ListApiResponse>(apiUrl);
      return response;
    },
    staleTime: Infinity,
  });
  return parseInt((data?.total ?? 0).toString());
};
