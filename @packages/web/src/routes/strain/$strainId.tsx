import { PATH_STRAIN_DETAIL } from "%api/strainDetail/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { createFileRoute } from "@tanstack/react-router";
import { StrainDetailPage } from "@/pages/StrainDetailPage.tsx";
import { fetchData } from "@/utils/fetch.ts";

type APIResponse = {
  strain: {
    strain_name: string;
  };
};
export const Route = createFileRoute("/strain/$strainId")({
  loader: async ({ params: { strainId } }) => {
    const api = makeApiUrl(PATH_STRAIN_DETAIL);
    const apiBody = `strain_id=${strainId}`;
    const result = await fetchData<APIResponse>(api, apiBody);
    // console.log(result);
    return result;
  },
  component: () => <StrainDetailPage />,
});
