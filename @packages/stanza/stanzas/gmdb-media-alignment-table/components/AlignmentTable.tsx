import { styled } from "@mui/material/styles";
import React, { ComponentProps, FC, useEffect, useMemo } from "react";
import { MediaAlignmentTableResponse } from "%stanza/api/media-alignment-table/types";
import { FooterRow } from "%stanza/stanzas/gmdb-media-alignment-table/components/FooterRow";
import { HeaderRow } from "%stanza/stanzas/gmdb-media-alignment-table/components/HeaderRow";
import { MediaRow } from "%stanza/stanzas/gmdb-media-alignment-table/components/MediaRow";
import { makeAlignmentData } from "%stanza/stanzas/gmdb-media-alignment-table/functions/makeAlignmentData";
import { makeComponentTree } from "%stanza/stanzas/gmdb-media-alignment-table/functions/makeComponentBranch";
import { makeFooterComponents } from "%stanza/stanzas/gmdb-media-alignment-table/functions/makeFooterComponents";
import {
  useComponentTreeMutators,
  useComponentTreeState,
} from "%stanza/stanzas/gmdb-media-alignment-table/states/componentTree";
import { THEME } from "%stanza/styles/theme";

type Props = { data: MediaAlignmentTableResponse; prioritizedOrganism: string[] };
type RowProps = ComponentProps<typeof MediaRow>[];
type FooterProps = ComponentProps<typeof FooterRow>;

export const AlignmentTable: FC<Props> = ({ data, prioritizedOrganism }) => {
  const componentTree = useComponentTreeState();
  const { setComponentTree } = useComponentTreeMutators();
  const components = useMemo(() => makeFooterComponents(componentTree), [componentTree]);
  const footerProps: FooterProps = useMemo(() => ({ components }), [components]);
  const rowProps: RowProps = useMemo(() => makeAlignmentData(data, components), [data, components]);
  useEffect(() => {
    setComponentTree(makeComponentTree(data.components));
  }, [data]);
  return (
    <Wrapper>
      <HeaderRow />
      {rowProps.map((props) => (
        <MediaRow
          {...props}
          key={props.medium.id}
          prioritizedOrganism={prioritizedOrganism}
        />
      ))}
      <FooterRow {...footerProps} />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  gap: 1,
  flexDirection: "column",
  backgroundColor: THEME.COLOR.GRAY_LINE,
  padding: 1,
});
