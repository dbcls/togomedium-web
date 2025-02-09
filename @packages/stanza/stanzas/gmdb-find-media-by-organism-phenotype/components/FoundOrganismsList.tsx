import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import {
  OrganismsByPhenotypeParams,
  OrganismsByPhenotypesResponse,
} from "%stanza/api/organisms_by_phenotypes/types";
import { API_ORGANISMS_BY_PHENOTYPES } from "%stanza/api/paths";
import { Pagination } from "%stanza/components/media-finder/Pagination";
import { OrganismListItem } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismListItem";
import {
  useOrganismPaginationMutators,
  useOrganismPaginationState,
} from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/organismPagination";
import { usePhenotypeQueryState } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/phenotypeQuery";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/selectedOrganisms";
import { THEME } from "%stanza/styles/theme";
import { getData } from "%stanza/utils/getData";
import { hasIdOfLabel } from "%stanza/utils/labelInfo";
import { MediaFinderListApiBody } from "%stanza/utils/types";

type Props = {};
type OrganismListInfo = Omit<ComponentProps<typeof OrganismListItem>, "onClick">;
type FoundOrganisms = MediaFinderListApiBody<"tax_id" | "name">;

export const FoundOrganismsList: FC<Props> = () => {
  const { data, isLoading, isPlaceholderData } = useOrganismQuery();
  const { next, prev } = useOrganismPaginationMutators();
  const { list, toggleOrganismSelection } = useOrganismList(data);

  return (
    <Wrapper>
      <div>
        {(isLoading || isPlaceholderData) && (
          <LoadingIndicator>
            <CircularProgress
              color="inherit"
              size={40}
            />
          </LoadingIndicator>
        )}
        <InfoText>{getInfoText(data?.total, isLoading)}</InfoText>
        <Inner>
          {(list ?? []).map((item) => (
            <OrganismListItem
              key={item.id}
              {...item}
              onClick={toggleOrganismSelection}
            />
          ))}
        </Inner>
        {!!data?.total && !isLoading && (
          <Pagination
            total={data.total}
            current={data.offset}
            displayLength={data.limit}
            onClickNext={next}
            onClickPrev={prev}
          />
        )}
      </div>
    </Wrapper>
  );
};

const SHOW_COUNT = 10;
const useOrganismQuery = () => {
  const page = useOrganismPaginationState();
  const phenotypeQueryParams = usePhenotypeQueryState();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  return useQuery({
    queryKey: [phenotypeQueryParams, { page }],
    queryFn: async () => {
      if (Object.entries(phenotypeQueryParams).length === 0) return nullResponse;
      //
      const response = await getData<OrganismsByPhenotypesResponse, OrganismsByPhenotypeParams>(
        API_ORGANISMS_BY_PHENOTYPES,
        { ...phenotypeQueryParams, limit: SHOW_COUNT, offset: (page - 1) * SHOW_COUNT }
      );
      if (!response.body) throw new Error("No data");
      return response.body;
    },
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
  });
};

const useOrganismList = (response?: FoundOrganisms) => {
  const [list, setList] = useState<OrganismListInfo[]>([]);
  const selectedOrganisms = useSelectedOrganismsState();
  const { toggleOrganismSelection } = useSelectedOrganismsMutators();
  useEffect(() => {
    const result: OrganismListInfo[] = (response?.contents ?? []).map((organism) => {
      return {
        id: organism.tax_id,
        label: organism.name,
        isChecked: hasIdOfLabel(selectedOrganisms, organism.tax_id),
      };
    });
    setList(result);
  }, [response, selectedOrganisms]);
  return { list, toggleOrganismSelection };
};

const getInfoText = (organismLength: number | undefined, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (!organismLength) {
    return "No organisms found";
  } else if (organismLength === 1) {
    return "1 organism found";
  } else {
    return `${organismLength} organisms found`;
  }
};

const Wrapper = styled("div")({
  position: "relative",
});

const InfoText = styled("p")({
  fontSize: "18px",
  fontWeight: THEME.FONT_WEIGHT.BOLD,
  marginBottom: THEME.SIZE.S1,
});

const Inner = styled("div")({
  maxHeight: "100%",
  overflowY: "auto",
});

const LoadingIndicator = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: THEME.COLOR.GRAY700,
});
