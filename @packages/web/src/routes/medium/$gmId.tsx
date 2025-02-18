import { createFileRoute } from "@tanstack/react-router";
import { mediumDetailURL } from "%api/mediumDetail/definitions.ts";
import { MediumDetailPage } from "@/pages/MediumDetailPage.tsx";
import { fetchData } from "@/utils/fetch.ts";

type APIResponse = {
  meta: {
    name: string;
  };
};
export const Route = createFileRoute("/medium/$gmId")({
  loader: async ({ params: { gmId } }) => {
    const api = mediumDetailURL;
    const apiBody = `gm_id=${gmId}`;
    const result = await fetchData<APIResponse>(api, apiBody);
    // console.log(result);
    return result;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <MediumDetailPage />;
}
