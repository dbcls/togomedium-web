import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import {
  ComponentDetailParams,
  ComponentDetailResponse,
  componentDetailURL,
} from "%api/componentDetail/definitions";
import { getData } from "%core/network/getData";
import { StanzaView, ViewProps } from "%stanza/stanzas/gmdb-component-detail/components/StanzaView";
import { parseData } from "%stanza/stanzas/gmdb-component-detail/functions/parseData";
import { fetchWikipediaData } from "%stanza/utils/fetchWikipediaData";

type Props = {
  stanzaElement?: ShadowRoot;
  gmo_id: string;
};

const useComponentDataQuery = (gmo_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [{ gmo_id }],
    queryFn: async () => {
      const result = await getData<ComponentDetailResponse, ComponentDetailParams>(
        componentDetailURL,
        {
          gmo_id,
        }
      );
      if (!result.body) {
        throw new Error("No data found");
      }
      return parseData(result.body);
    },
    staleTime: Infinity,
  });
  return { componentData: data, isLoading };
};
const useWikipediaQuery = (component: ViewProps | undefined) => {
  const wikipediaLink = component?.links.find((item) => item.label === "Wikipedia");
  const { data } = useQuery({
    queryKey: [{ wikipedia: wikipediaLink?.uri }],
    queryFn: async () => await fetchWikipediaData(wikipediaLink?.uri ?? ""),
    staleTime: Infinity,
    enabled: wikipediaLink !== undefined,
  });
  return data;
};

const App: FC<Props> = ({ gmo_id }) => {
  const { componentData, isLoading } = useComponentDataQuery(gmo_id);
  const wikipediaData = useWikipediaQuery(componentData);
  if (isLoading || !componentData) return <>Loading...</>;
  return (
    <StanzaView
      {...componentData}
      wikipediaData={wikipediaData}
    />
  );
};

export default App;
