import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import {
  StatsCountCulturableSpeciesParams,
  StatsCountCulturableSpeciesResponse,
  statsCountCulturableSpeciesURL,
} from "%api/statsCountCulturableSpecies/definitions";
import { getData } from "%core/network/getData";
import { THEME } from "%core/theme";
import { AppContainer } from "%stanza/stanzas/gmdb-stats-culturable-species/components/AppContainer";

export type AppProps = {
  stanzaElement?: ShadowRoot;
  gmo_id: string;
};

const useGraphData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["speciesDistribution"],
    queryFn: async () => {
      const response = await getData<
        StatsCountCulturableSpeciesResponse,
        StatsCountCulturableSpeciesParams
      >(statsCountCulturableSpeciesURL, {});
      if (!response.body) {
        throw new Error("No data found");
      }
      return response.body;
    },
    staleTime: 0,
  });

  return { data, isLoading };
};

const App = ({ stanzaElement }: AppProps) => {
  const { data, isLoading } = useGraphData();
  if (isLoading) return <>Loading...</>;
  return <Wrapper>{data && <AppContainer data={data} />}</Wrapper>;
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
