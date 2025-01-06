import { createFileRoute } from "@tanstack/react-router";
import { MediumDetailPage } from "@/components/pages/MediumDetailPage.tsx";
import { API_MEDIUM_DETAIL } from "@/consts/api.ts";
import { fetchData } from "@/utils/fetch.ts";

type APIResponse = {
  meta: {
    name: string;
  };
};
export const Route = createFileRoute("/medium/$gmId")({
  loader: async ({ params: { gmId } }) => {
    const api = API_MEDIUM_DETAIL;
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
