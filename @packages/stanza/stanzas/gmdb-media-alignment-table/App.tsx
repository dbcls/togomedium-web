import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { MediaAlignmentTableResponse } from "%stanza/api/media-alignment-table/types";
import { API_MEDIA_ALIGNMENT } from "%stanza/api/paths";
import { ScrollableTable } from "%stanza/stanzas/gmdb-media-alignment-table/components/ScrollableTable";
import { THEME } from "%stanza/styles/theme";
import { getData } from "%stanza/utils/getData";

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
      const response = await getData<MediaAlignmentTableResponse>(API_MEDIA_ALIGNMENT, { gm_ids });
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
