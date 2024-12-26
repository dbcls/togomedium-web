import { createFileRoute } from "@tanstack/react-router";
import { StrainDetailPage } from "@/components/pages/StrainDetailPage.tsx";
import { URL_API_STRAIN_DETAIL } from "@/consts.ts";
import { getData } from "@/utils/fetch.ts";

type APIResponse = {
  strain: {
    strain_name: string;
  };
};
export const Route = createFileRoute("/strain/$strainId")({
  loader: async ({ params: { strainId } }) => {
    const api = URL_API_STRAIN_DETAIL;
    const apiBody = `strain_id=${strainId}`;
    const result = await getData<APIResponse>(api, apiBody);
    // console.log(result);
    return result;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <StrainDetailPage />;
}
