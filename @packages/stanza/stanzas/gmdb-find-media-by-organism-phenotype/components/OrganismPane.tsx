import { styled } from "@mui/material/styles";
import React, { FC, useEffect } from "react";
import { THEME } from "%core/theme";
import { FoundOrganismsList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/FoundOrganismsList";
import { OrganismTab } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismTab";
import { SelectedOrganismsList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/SelectedOrganismsList";
import { useOrganismPaginationMutators } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/organismPagination";
import {
  useOrganismTabFocusMutators,
  useOrganismTabFocusState,
} from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/organismTabFocus";
import { usePhenotypeQueryState } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/phenotypeQuery";

type Props = {};

export const OrganismPane: FC<Props> = () => {
  const tabFocus = useOrganismTabFocusState();
  const { reset } = useOrganismPaginationMutators();
  const { setOrganismTabFocus } = useOrganismTabFocusMutators();
  const phenotypeQueryParams = usePhenotypeQueryState();
  useEffect(() => {
    reset();
    setOrganismTabFocus("Found organisms");
  }, [phenotypeQueryParams]);
  return (
    <Wrapper>
      <OrganismTab />
      <Contents>
        {tabFocus === "Found organisms" && <FoundOrganismsList />}
        {tabFocus === "Selected organisms" && <SelectedOrganismsList />}
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: THEME.SIZE.S1,
  backgroundColor: THEME.COLOR.WHITE,
  borderRadius: THEME.ROUND.BASE,
});

const Contents = styled("div")({
  paddingBlock: THEME.SIZE.S2,
  paddingInline: THEME.SIZE.S1,
  flexGrow: 1,
  overflowY: "auto",
});
