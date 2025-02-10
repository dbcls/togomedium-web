import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MediaStrainsAlimentResponse } from "%stanza/api/media_strains_alignment/types";
import { API_MEDIA_STRAINS_ALIGNMENT } from "%stanza/api/paths";
import { AppContainer } from "%stanza/stanzas/gmdb-media-strains-alignment-table/components/AppContainer";
import { THEME } from "%stanza/styles/theme";
import { getData } from "%stanza/utils/getData";

export type AppProps = {
  gmIds: string[];
  hideMedia?: boolean;
  prioritizedOrganism?: string[];
  stanzaElement?: ShadowRoot;
};

const useData = (gmIds: string[]) => {
  const { data, isLoading } = useQuery({
    queryKey: [...gmIds],
    queryFn: async () => {
      const result = await getData<MediaStrainsAlimentResponse>(API_MEDIA_STRAINS_ALIGNMENT, {
        gm_ids: gmIds.join(","),
      });
      if (!result.body) throw new Error("No data");
      return result.body;
    },
  });
  return { data, isLoading };
};

const App = ({ gmIds, hideMedia = false }: AppProps) => {
  const { data, isLoading } = useData(gmIds);
  if (isLoading) return <>Loading...</>;
  return <Wrapper>{data && <AppContainer {...{ data, hideMedia }} />}</Wrapper>;
};

const Wrapper = styled("div")({
  minHeight: 100,
  width: "fit-content",
  minWidth: "100%",
  backgroundColor: THEME.COLOR.WHITE,
  borderRadius: 5,
  padding: THEME.SIZE.S1,
});

export default App;
