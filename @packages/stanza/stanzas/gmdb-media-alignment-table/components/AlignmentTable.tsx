import { css } from "@emotion/react";
import React, { ComponentProps, FC, useEffect, useMemo } from "react";
import { FooterRow } from "./FooterRow";
import { HeaderRow } from "./HeaderRow";
import { MediaRow } from "./MediaRow";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { COLOR_GRAY_LINE } from "../../../shared/styles/variables";
import { makeAlignmentData } from "../functions/makeAlignmentData";
import { makeComponentTree } from "../functions/makeComponentBranch";
import { makeFooterComponents } from "../functions/makeFooterComponents";
import { useComponentTreeMutators, useComponentTreeState } from "../states/componentTree";

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
    <div css={wrapper}>
      <HeaderRow />
      {rowProps.map((props) => (
        <MediaRow
          {...props}
          key={props.medium.id}
          prioritizedOrganism={prioritizedOrganism}
        />
      ))}
      <FooterRow {...footerProps} />
    </div>
  );
};

const wrapper = css`
  display: flex;
  gap: 1px;
  flex-direction: column;
  background-color: ${COLOR_GRAY_LINE};
  padding: 1px;
`;
