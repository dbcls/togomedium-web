import {
  ComponentsWithComponentsResponse,
  ComponentWithComponentsParams,
  PATH_COMPONENTS_WITH_COMPONENTS,
} from "%api/componentsWithComponents/definitions";
import { makeApiUrl } from "%core/network/makeApiUrl";

export const fetchAllComponents = async (): Promise<ComponentsWithComponentsResponse> => {
  const params: ComponentWithComponentsParams = { gmo_ids: "" };
  const url = makeApiUrl(PATH_COMPONENTS_WITH_COMPONENTS, new URLSearchParams(params));
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  } else {
    return [];
  }
};
