import { PATH_COMPONENT_DETAIL } from "%api/componentDetail/definitions.ts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { createFileRoute } from "@tanstack/react-router";
import { ComponentDetailPage } from "@/pages/ComponentDetailPage.tsx";
import { fetchData } from "@/utils/fetch.ts";

type APIResponse = {
  pref_label: string;
};

export const Route = createFileRoute("/component/$gmoId")({
  loader: async ({ params: { gmoId } }) => {
    const api = makeApiUrl(PATH_COMPONENT_DETAIL);
    const apiBody = `gmo_id=${gmoId}`;
    const result = await fetchData<APIResponse>(api, apiBody);
    // console.log(result);
    return result;
  },
  component: () => <ComponentDetailPage />,
});
