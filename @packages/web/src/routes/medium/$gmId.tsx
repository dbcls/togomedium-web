import { PATH_MEDIUM_DETAIL } from "%api/mediumDetail/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { createFileRoute } from "@tanstack/react-router";
import { MediumDetailPage } from "@/pages/MediumDetailPage.tsx";
import { fetchData } from "@/utils/fetch.ts";

type APIResponse = {
  meta: {
    name: string;
  };
};
export const Route = createFileRoute("/medium/$gmId")({
  loader: async ({ params: { gmId } }) => {
    const api = makeApiUrl(PATH_MEDIUM_DETAIL);
    const apiBody = `gm_id=${gmId}`;
    const result = await fetchData<APIResponse>(api, apiBody);
    // console.log(result);
    return result;
  },
  component: () => <MediumDetailPage />,
});
