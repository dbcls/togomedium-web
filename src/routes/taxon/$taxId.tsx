import { createFileRoute } from "@tanstack/react-router";
import { TaxonDetailPage } from "@/components/pages/TaxonDetailPage.tsx";
import { API_TAX_DETAIL } from "@/consts.ts";
import { getData } from "@/utils/fetch.ts";

type APIResponse = {
  scientific_name: string;
  authority_name: string;
  rank: string;
};
export const Route = createFileRoute("/taxon/$taxId")({
  loader: async ({ params: { taxId } }) => {
    const api = API_TAX_DETAIL;
    const apiBody = `tax_id=${taxId}`;
    const result = await getData<APIResponse>(api, apiBody);
    return result;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <TaxonDetailPage />;
}
