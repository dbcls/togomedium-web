import { createFileRoute } from "@tanstack/react-router";
import { ComponentDetailPage } from "@/components/pages/ComponentDetailPage.tsx";
import { API_COMPONENT_DETAIL } from "@/consts/api.ts";
import { fetchData } from "@/utils/fetch.ts";

type APIResponse = {
  pref_label: string;
};

export const Route = createFileRoute("/component/$gmoId")({
  loader: async ({ params: { gmoId } }) => {
    const api = API_COMPONENT_DETAIL;
    const apiBody = `gmo_id=${gmoId}`;
    const result = await fetchData<APIResponse>(api, apiBody);
    // console.log(result);
    return result;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <ComponentDetailPage />;
}
