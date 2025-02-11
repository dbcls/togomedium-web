import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import {
  MediaComponentAlignmentTableParams,
  MediaComponentAlignmentTableResponse,
  mediaComponentAlignmentTableURL,
} from "%api/mediaComponentAlignment/definitions";
import { getData } from "%core/network/getData";
import { ScrollableTable } from "%stanza/stanzas/gmdb-media-alignment-table/components/ScrollableTable";
import { THEME } from "%stanza/styles/theme";

export type AppProps = {
  gm_ids: string[];
  prioritizedOrganism?: string[];
  stanzaElement?: ShadowRoot;
};

const useDataQuery = (
  gm_ids: string[],
  stanzaDispatch: (eventName: string, detail: any) => void
) => {
  return useQuery({
    queryKey: ["media-alignment", { gm_ids }],
    queryFn: async () => {
      stanzaDispatch("STANZA_ON_QUERY_DATA", gm_ids);
      const response = await getData<
        MediaComponentAlignmentTableResponse,
        MediaComponentAlignmentTableParams
      >(mediaComponentAlignmentTableURL, {
        gm_ids: gm_ids.join(","),
      });
      if (!response.body) throw new Error("No data");
      stanzaDispatch("STANZA_ON_LOAD_DATA", response.body);
      return response.body;
    },
    enabled: gm_ids.length > 0,
    staleTime: Infinity,
  });
};

const App = ({ gm_ids, stanzaElement, prioritizedOrganism = [] }: AppProps) => {
  const dispatchStanzaEvent = useCallback(
    (eventName: string, detail: any) => {
      if (!stanzaElement) return;
      const e = new CustomEvent(eventName, { bubbles: true, composed: true, detail });
      stanzaElement.dispatchEvent(e);
    },
    [stanzaElement]
  );
  const dataQuery = useDataQuery(gm_ids, dispatchStanzaEvent);
  if (!dataQuery.data) return <Wrapper>Loading...</Wrapper>;
  return (
    <Wrapper>
      <ScrollableTable
        data={dataQuery.data}
        prioritizedOrganism={prioritizedOrganism}
      />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  minHeight: 100,
  backgroundColor: THEME.COLOR.WHITE,
  borderRadius: 5,
  padding: THEME.SIZE.S1,
});

export default App;
