import { makeApiUrl } from "%core/network/makeApiUrl";

export type ComponentWithComponentsRequest = {
  gmo_ids?: string;
};
export type ComponentsWithComponentsResponse = {
  gmo_id: string;
  name: string;
  japanese_name: string;
}[];
export const componentsWithComponentsURL = makeApiUrl("gmdb_components_with_components");
