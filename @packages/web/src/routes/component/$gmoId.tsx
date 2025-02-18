import { createFileRoute } from "@tanstack/react-router";
import { componentDetailURL } from "%api/componentDetail/definitions.ts";
import { ComponentDetailPage } from "@/pages/ComponentDetailPage.tsx";
import { fetchData } from "@/utils/fetch.ts";

type APIResponse = {
  pref_label: string;
};

export const Route = createFileRoute("/component/$gmoId")({
  loader: async ({ params: { gmoId } }) => {
    const api = componentDetailURL;
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
